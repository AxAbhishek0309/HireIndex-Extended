import { supabase } from './db.js';

export interface ResumeAnalysisRecord {
  id: number;
  filename: string;
  file_type: string;
  overall_score: number;
  keywords_score: number;
  experience_score: number;
  skills_score: number;
  education_score: number;
  formatting_score: number;
  feedback: Record<string, string>;
  improvement_suggestions: string[];
  created_at: string;
}

export interface InsertResumeAnalysis {
  filename: string;
  file_type: string;
  overall_score: number;
  keywords_score: number;
  experience_score: number;
  skills_score: number;
  education_score: number;
  formatting_score: number;
  feedback: Record<string, string>;
  improvement_suggestions: string[];
  user_id?: string | null;
}

export const storage = {
  async createResumeAnalysis(data: InsertResumeAnalysis): Promise<ResumeAnalysisRecord> {
    const { data: record, error } = await supabase
      .from('resume_analysis')
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return record;
  },

  async getResumeAnalysis(id: number): Promise<ResumeAnalysisRecord | null> {
    const { data, error } = await supabase
      .from('resume_analysis')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async getRecentResumeAnalyses(limit: number): Promise<ResumeAnalysisRecord[]> {
    const { data, error } = await supabase
      .from('resume_analysis')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data || [];
  },
};
