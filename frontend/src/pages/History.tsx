import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Clock } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';
import { useLocation } from 'wouter';

interface AnalysisRecord {
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

function downloadReport(a: AnalysisRecord) {
  const text = `RESUME ANALYSIS REPORT
======================
File: ${a.filename}
Date: ${new Date(a.created_at).toLocaleString()}

SCORES
------
Overall Score:       ${a.overall_score}/100
Keywords & Phrases:  ${a.keywords_score}/100
Work Experience:     ${a.experience_score}/100
Skills Match:        ${a.skills_score}/100
Education:           ${a.education_score}/100
Formatting:          ${a.formatting_score}/100

FEEDBACK
--------
Keywords:    ${a.feedback.keywords}
Experience:  ${a.feedback.experience}
Skills:      ${a.feedback.skills}
Education:   ${a.feedback.education}
Formatting:  ${a.feedback.formatting}

IMPROVEMENT SUGGESTIONS
-----------------------
${a.improvement_suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}
`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `analysis-${a.filename}-${a.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const History: React.FC = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [, navigate] = useLocation();

  const { data: analyses, isLoading } = useQuery<AnalysisRecord[]>({
    queryKey: ['history', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resume_analysis')
        .select('*')
        .gt('overall_score', 0)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);

      // Deduplicate by filename — keep only the latest scan per file
      const seen = new Set<string>();
      return (data || []).filter((a) => {
        if (seen.has(a.filename)) return false;
        seen.add(a.filename);
        return true;
      });
    },
  });

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FileText className="h-14 w-14 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Sign in to view your history</h2>
        <p className="text-gray-500 mb-6">Your analyses are saved per account.</p>
        <Button onClick={() => navigate('/login')} className="bg-blue-500 hover:bg-blue-600 text-white">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Analysis History</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.email}</p>
        </div>
        <Button variant="outline" onClick={async () => { await signOut(); navigate('/login'); }}>
          Sign Out
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : !analyses || analyses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-14 w-14 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No analyses yet. Upload a resume to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {analyses.map((a) => (
            <Card key={a.id} className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">{a.filename}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{new Date(a.created_at).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3 mt-2 text-sm">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">Overall: {a.overall_score}/100</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600 dark:text-gray-300">Keywords: {a.keywords_score}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600 dark:text-gray-300">Skills: {a.skills_score}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => downloadReport(a)}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 shrink-0"
                >
                  <Download className="h-4 w-4 mr-2" /> Download Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
