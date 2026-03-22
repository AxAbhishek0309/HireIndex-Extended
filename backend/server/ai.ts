// Define ResumeAnalysisResult interface directly here, matching the previous structure
export interface ResumeAnalysisResult {
  overallScore: number;
  keywordsScore: number;
  experienceScore: number;
  skillsScore: number;
  educationScore: number;
  formattingScore: number;
  feedback: {
    keywords: string;
    experience: string;
    skills: string;
    education: string;
    formatting: string;
  };
  improvementSuggestions: string[];
}

import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is not set. Please set it in your .env file.");
}

const groq = new Groq({ apiKey: GROQ_API_KEY });
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyzer. Score the resume realistically, not overly strict. Most good resumes should score between 60 and 85. Be encouraging and provide actionable feedback for each section.

Strictly evaluate the following resume as a real ATS would, using these criteria:
- Keyword & phrase match for the target job
- Work experience relevance and quantification
- Skills match (technical and soft)
- Education completeness
- Formatting & structure (ATS-friendly, no images, simple layout, clear sections)

For each category, give a score out of 100.
For each section, provide 1-2 sentences of feedback.
Return your response as a JSON object with these keys:
- overallScore
- keywordsScore
- experienceScore
- skillsScore
- educationScore
- formattingScore
- feedback (object with keys: keywords, experience, skills, education, formatting)
- improvementSuggestions (array of 3-5 actionable suggestions)

Return ONLY the JSON object, no markdown, no code blocks.`;

function fillSectionDefaults(result: ResumeAnalysisResult): ResumeAnalysisResult {
  return {
    ...result,
    feedback: {
      keywords: result.feedback?.keywords || "No feedback provided.",
      experience: result.feedback?.experience || "No feedback provided.",
      skills: result.feedback?.skills || "No feedback provided.",
      education: result.feedback?.education || "No feedback provided.",
      formatting: result.feedback?.formatting || "No feedback provided.",
    },
    improvementSuggestions:
      Array.isArray(result.improvementSuggestions) && result.improvementSuggestions.length > 0
        ? result.improvementSuggestions
        : ["No suggestions provided."],
  };
}

export async function isResumeDocument(text: string): Promise<boolean> {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `Is the following document a resume or CV? Reply only with 'yes' or 'no'.\n\nDocument:\n${text.slice(0, 2000)}`,
      },
    ],
    temperature: 0,
    max_tokens: 5,
  });

  const reply = completion.choices[0]?.message?.content?.trim().toLowerCase() || "";
  return reply.startsWith("yes");
}

export async function analyzeResume(text: string): Promise<ResumeAnalysisResult> {
  if (!text || !text.trim()) {
    throw new Error("Resume text is empty. Cannot analyze an empty document.");
  }

  console.log("Extracted resume text:", text.slice(0, 500));

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Resume:\n${text}` },
    ],
    temperature: 0,
    max_tokens: 1024,
  });

  let resultText = completion.choices[0]?.message?.content?.trim() || "";

  // Strip code block markers if model adds them anyway
  resultText = resultText.replace(/^```json\s*/i, "").replace(/^```/, "").replace(/```$/, "").trim();

  let result: ResumeAnalysisResult;
  try {
    result = JSON.parse(resultText);
  } catch (e) {
    throw new Error("Failed to parse Groq response as JSON: " + resultText);
  }

  return fillSectionDefaults(result);
}
