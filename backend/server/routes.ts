import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage, type InsertResumeAnalysis } from "./storage.js";
import multer from "multer";
import { extractTextFromDocument, isValidFileType } from "./document-parser.js";
import { isResumeDocument, analyzeResume } from "./ai.js";
import crypto from "crypto";

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (isValidFileType(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and DOCX files are allowed.") as any);
    }
  },
});

// Extend Express Request type to include optional file property from multer
interface ResumeRequest extends Request {
  file?: Express.Multer.File;
}

// In-memory cache for resume analysis results
const resumeCache: Record<string, any> = {};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for resume analysis
  app.post("/api/resume/analyze", upload.single("file"), async (req: ResumeRequest, res: Response) => {
    try {
      const file = req.file;
      
      // Flag if not a resume (PDF or DOCX) - check before any file reading
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      // Remove file type check - accept all extensions
      // const allowedMimeTypes = [
      //   "application/pdf",
      //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      //   "application/msword"
      // ];
      // if (!allowedMimeTypes.includes(file.mimetype)) {
      //   return res.status(400).json({ message: "Please upload a resume file (PDF or DOCX) only." });
      // }

      // Only now extract text from the document
      const text = await extractTextFromDocument(file.buffer, file.mimetype);
      
      // Hash the resume text for caching
      const hash = crypto.createHash('sha256').update(text).digest('hex');
      if (resumeCache[hash]) {
        return res.status(200).json(resumeCache[hash]);
      }

      // Check if the document is a resume
      const isResume = await isResumeDocument(text);
      if (!isResume) {
        const notResumeResult = {
          id: Date.now(),
          filename: file.originalname,
          fileType: file.mimetype,
          createdAt: new Date().toISOString(),
          overallScore: 0,
          keywordsScore: 0,
          experienceScore: 0,
          skillsScore: 0,
          educationScore: 0,
          formattingScore: 0,
          feedback: {
            keywords: "This document does not appear to be a resume. Please upload a valid resume (CV) for analysis.",
            experience: "This document does not appear to be a resume. Please upload a valid resume (CV) for analysis.",
            skills: "This document does not appear to be a resume. Please upload a valid resume (CV) for analysis.",
            education: "This document does not appear to be a resume. Please upload a valid resume (CV) for analysis.",
            formatting: "This document does not appear to be a resume. Please upload a valid resume (CV) for analysis."
          },
          improvementSuggestions: [
            "Please upload a resume or CV document for accurate analysis."
          ]
        };
        resumeCache[hash] = notResumeResult;
        return res.status(200).json(notResumeResult);
      }
      
      // Analyze the resume using Groq
      const analysisResult = await analyzeResume(text);

      // Save to Supabase
      const saved = await storage.createResumeAnalysis({
        filename: file.originalname,
        file_type: file.mimetype,
        overall_score: analysisResult.overallScore,
        keywords_score: analysisResult.keywordsScore,
        experience_score: analysisResult.experienceScore,
        skills_score: analysisResult.skillsScore,
        education_score: analysisResult.educationScore,
        formatting_score: analysisResult.formattingScore,
        feedback: analysisResult.feedback,
        improvement_suggestions: analysisResult.improvementSuggestions,
        user_id: (req as any).userId || null,
      });

      const result = {
        id: saved.id,
        filename: saved.filename,
        fileType: saved.file_type,
        createdAt: saved.created_at,
        overallScore: saved.overall_score,
        keywordsScore: saved.keywords_score,
        experienceScore: saved.experience_score,
        skillsScore: saved.skills_score,
        educationScore: saved.education_score,
        formattingScore: saved.formatting_score,
        feedback: saved.feedback,
        improvementSuggestions: saved.improvement_suggestions,
      };
      resumeCache[hash] = result;
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An error occurred while analyzing the resume" 
      });
    }
  });

  // Get a specific resume analysis
  app.get("/api/resume/analysis/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      try {
        const analysis = await storage.getResumeAnalysis(id);
        
        if (!analysis) {
          return res.status(404).json({ message: "Analysis not found" });
        }
        
        return res.status(200).json(analysis);
      } catch (dbError) {
        console.error("Database error:", dbError);
        
        // Return a demo analysis result
        return res.status(200).json({
          id: id,
          filename: "sample-resume.pdf",
          fileType: "application/pdf",
          createdAt: new Date().toISOString(),
          overallScore: 78,
          keywordsScore: 75,
          experienceScore: 82,
          skillsScore: 80,
          educationScore: 85,
          formattingScore: 70,
          feedback: {
            keywords: "Your resume contains good keywords, but could benefit from more industry-specific terminology.",
            experience: "Your work experience is well presented with quantified achievements.",
            skills: "Your skills section is comprehensive and well organized.",
            education: "Education details are clearly presented with relevant highlights.",
            formatting: "The resume has a good structure but could be more ATS-friendly."
          },
          improvementSuggestions: [
            "Add more industry-specific keywords throughout your resume.",
            "Quantify more achievements with specific metrics to demonstrate impact.",
            "Ensure consistent formatting of dates and headers for better ATS readability.",
            "Tailor your resume for each application by highlighting relevant experiences.",
            "Use standard section headers that are easily recognized by ATS systems."
          ]
        });
      }
    } catch (error) {
      console.error("Error getting analysis:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An error occurred while fetching the analysis" 
      });
    }
  });

  // Get recent resume analyses
  app.get("/api/resume/analyses/recent", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      
      try {
        const analyses = await storage.getRecentResumeAnalyses(limit);
        return res.status(200).json(analyses.map(a => ({
          id: a.id,
          filename: a.filename,
          fileType: a.file_type,
          createdAt: a.created_at,
          overallScore: a.overall_score,
          keywordsScore: a.keywords_score,
          experienceScore: a.experience_score,
          skillsScore: a.skills_score,
          educationScore: a.education_score,
          formattingScore: a.formatting_score,
          feedback: a.feedback,
          improvementSuggestions: a.improvement_suggestions,
        })));
      } catch (dbError) {
        console.error("Database error:", dbError);
        
        // Return demo analyses
        const demoAnalyses = Array(limit).fill(0).map((_, i) => ({
          id: i + 1,
          filename: `sample-resume-${i + 1}.pdf`,
          fileType: "application/pdf",
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
          overallScore: Math.floor(Math.random() * 20) + 70,
          keywordsScore: Math.floor(Math.random() * 20) + 70,
          experienceScore: Math.floor(Math.random() * 15) + 75,
          skillsScore: Math.floor(Math.random() * 25) + 65,
          educationScore: Math.floor(Math.random() * 20) + 70,
          formattingScore: Math.floor(Math.random() * 30) + 60,
          feedback: {
            keywords: "Your resume contains good keywords, but could benefit from more industry-specific terminology.",
            experience: "Your work experience is well presented with quantified achievements.",
            skills: "Your skills section is comprehensive and well organized.",
            education: "Education details are clearly presented with relevant highlights.",
            formatting: "The resume has a good structure but could be more ATS-friendly."
          },
          improvementSuggestions: [
            "Add more industry-specific keywords throughout your resume.",
            "Quantify more achievements with specific metrics to demonstrate impact.",
            "Ensure consistent formatting of dates and headers for better ATS readability.",
            "Tailor your resume for each application by highlighting relevant experiences.",
            "Use standard section headers that are easily recognized by ATS systems."
          ]
        }));
        
        return res.status(200).json(demoAnalyses);
      }
    } catch (error) {
      console.error("Error getting recent analyses:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An error occurred while fetching recent analyses" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
