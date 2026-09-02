import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS & Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Safely handle body parsing in Vercel serverless environments
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }

    const { jobDescription } = body || {};

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // 2. Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is missing.');
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const portfolioContext = `
      Candidate Name: Vishnu Kaushik Varma Vuddaraju
      Location: Poughkeepsie, New York
      Education: M.S. Information Systems at Marist University (GPA 3.845, Exp. Dec 2026), B.Tech CSM (GPA 3.5).
      Work Experience: 
      - Web Developer & LMS QA Tester at Marist University (Apr 2025 – Present): Developed 150+ Liferay CMS pages, resolved 100+ Jira tickets, audited 5,000+ Brightspace courses for WCAG 2.2 compliance via Power Apps/Power Automate, migrated 500+ courses from Sakai to Brightspace.
      - Application Developer & Team Lead at Forge (Sep 2023 – Mar 2024): Engineered Realtor+ real estate mobile platform (10k+ users) on iOS & Android using Flutter/Dart, architected Forge HRMS with GPS tracking, led 20-member team.
      Projects:
      - LMS Accessibility & Student Success Analysis (Python, PostgreSQL, Docker, Tableau, Pandas)
      - Containerized Research Data Pipeline (Docker, GCP, Python, Pandas, NumPy)
      - AI-Powered Voice Music Assistant (Node.js, Express, MongoDB Atlas, OpenAI API, Speech-to-Text)
      - LinkNews Mobile App (Flutter, Dart, GetX, Firebase FCM, REST APIs)
      - Personal Diary App (Flutter, Dart, Provider, SQLite, Shared Preferences)
      - Flutter SQLite & API Integration App (Flutter, Dart, SQLite, REST API, HTTP)
      Tech Stack: Python, SQL, JavaScript, Dart, HTML, Flutter, Node.js, Express, Pandas, NumPy, PostgreSQL, MongoDB Atlas, SQLite, GCP, Firebase, Docker, Tableau, OpenAI API, Liferay CMS, Brightspace, Sakai, Git, Jira.
    `;

    const prompt = `
      You are an elite career strategist. Cross-reference the target job description with the candidate portfolio. Return ONLY a valid JSON object.
      
      Candidate Portfolio:
      ${portfolioContext}

      Target Job Description:
      ${jobDescription}

      Required JSON format:
      {
        "targetRole": "Extracted Job Title",
        "matchScore": "95%",
        "summary": "Tailored 2-sentence executive summary matching the role",
        "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
        "bullets": [
          "High-impact bullet point matching the JD with candidate's actual projects/experience",
          "High-impact bullet point highlighting metrics, scale, and technical stack",
          "High-impact bullet point focusing on system architecture or quality assurance"
        ]
      }
    `;

    // 3. Generate content using 2.5-flash for fast serverless turnaround (well under Vercel timeout limits)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const responseText = response.text;
    const parsedData = JSON.parse(responseText);

    return res.status(200).json(parsedData);
  } catch (error) {
    // Return the actual error message to make debugging immediate
    console.error('Gemini Execution Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate tailored resume', 
      details: error.message || error.toString() 
    });
  }
}