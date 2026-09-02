import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Only permit POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Initialize using the server environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
      You are an elite career strategist. Analyze the target Job Description below and cross-reference it with the candidate's complete portfolio background.
      
      Candidate Background:
      ${portfolioContext}

      Target Job Description:
      ${jobDescription}

      Return strictly a valid JSON object matching this structure:
      {
        "targetRole": "Extracted Job Title",
        "matchScore": "Percentage match score e.g. 98.5%",
        "summary": "Tailored 2-sentence professional executive summary directly matching the role",
        "skills": ["Matched Skill 1", "Matched Skill 2", "Matched Skill 3", "Matched Skill 4"],
        "bullets": [
          "High-impact bullet point matching the JD with candidate's actual projects/experience",
          "High-impact bullet point highlighting quantifiable impact and tech stack",
          "High-impact bullet point focusing on system scale or quality assurance"
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const parsedData = JSON.parse(response.text);
    return res.status(200).json(parsedData);
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({ error: 'Failed to generate tailored resume' });
  }
}