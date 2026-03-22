# HireIndex

HireIndex is an AI-powered recruitment platform that automates resume screening with a focus on fairness, transparency, and efficiency. It provides ATS compatibility scoring, detailed feedback, and improvement suggestions to help job seekers optimize their resumes.

Published at the **2025 8th International Conference on Emerging Technologies in Computer Engineering (ICETCE), IEEE**.  
DOI: [10.1109/ICETCE66848.2025.11387932](https://doi.org/10.1109/ICETCE66848.2025.11387932)

---

## Features

- **ATS Resume Scoring** — Analyzes resumes across keywords, experience, skills, education, and formatting
- **NLP-Based Feedback** — Section-by-section feedback with actionable improvement suggestions
- **Analysis History** — Authenticated users can view and download past analysis reports
- **User Authentication** — Email-based sign up/sign in with per-user data isolation
- **Dark Mode** — Full light/dark theme support
- **Export Reports** — Download analysis results as formatted text files

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS + Radix UI
- TanStack Query
- Supabase Auth

**Backend**
- Node.js + Express + TypeScript
- Multer (file uploads)
- pdf-parse + mammoth (document parsing)
- NLP-based resume analysis engine
- Supabase (PostgreSQL database)

---

## Project Structure

```
HireIndex/
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, ResumeAnalyzer, History, Login, About
│   │   ├── components/
│   │   └── lib/          # Supabase client, query client, types
├── backend/
│   ├── server/           # Express routes, analysis engine, storage
│   └── shared/           # Shared schema types
└── README.md
```

---

## Local Setup

### Prerequisites
- Node.js v18+
- A Supabase project

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hireindex.git
cd hireindex
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5001
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Database setup

Run this in your Supabase SQL Editor:

```sql
CREATE TABLE resume_analysis (
  id bigserial PRIMARY KEY,
  filename text NOT NULL,
  file_type text NOT NULL,
  overall_score integer NOT NULL,
  keywords_score integer NOT NULL,
  experience_score integer NOT NULL,
  skills_score integer NOT NULL,
  education_score integer NOT NULL,
  formatting_score integer NOT NULL,
  feedback jsonb NOT NULL,
  improvement_suggestions jsonb NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE resume_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own analyses" ON resume_analysis
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow inserts" ON resume_analysis
  FOR INSERT WITH CHECK (true);
```

### 5. Run locally

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5001

---

## Deployment

### Backend (Render)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Add all environment variables from `backend/.env`

### Frontend (Vercel)
- Root Directory: `frontend`
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Add all environment variables from `frontend/.env`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/analyze` | Upload and analyze a resume |
| GET | `/api/resume/analyses/recent` | Get recent analyses |
| GET | `/api/health` | Health check |

---

## Research

> **HireIndex: A RAG-Enhanced AI Recruitment Platform for Fair, Transparent, and Efficient Hiring**  
> Abhishek Tiwari, Adit Katiyar, Sneha Dhanuka, Dr. Neeraj Kumar Verma  
> Manipal University Jaipur  
> *2025 8th International Conference on Emerging Technologies in Computer Engineering (ICETCE), IEEE*

---

## Authors

- **Abhishek Tiwari** — AI/MLOps/Web Development — [LinkedIn](https://www.linkedin.com/in/abhishek-tiwari-03ax/)
- **Adit Katiyar** — ML/Web Development — [LinkedIn](https://www.linkedin.com/in/adit-katiyar-0863692b9/)
- **Sneha Dhanuka** — UI/UX & Frontend — [LinkedIn](https://www.linkedin.com/in/sneha-dhanuka/)

---

## License

MIT License
