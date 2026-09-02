import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are an elite career strategist. Cross-reference the candidate's exact background against the target Job Description.
      Tailor bullet points and select the 3-4 most relevant projects to match the job description while retaining authentic metrics.

      Candidate Background:
      - Name: Vishnu Kaushik Varma
      - Education:
        Marist College, Master of Science, Information Systems, Jan 2025 - Dec 2026, GPA: 3.845
        Keshav Memorial Institute Of Technology, Bachelor of Technology, CSM, Aug 2020 - May 2024, GPA: 3.5
      - Work Experience:
        * Marist University | IT Technical Specialist & LMS Administrator (Apr 2025 - Present)
        * Forge Alumnus | Application Developer & Team Lead | hyderabad, india (Sep 2023 - Mar 2024)
      - Projects Pool:
        1. Containerized Research Data Pipeline
        2. System Compliance Reporting Architecture
        3. AI-Powered Virtual Assistant (Copilot)
        4. LinkNews (Flutter + Firebase)
        5. Personal Diary Application | Flutter, Dart, Provider (State Management), Local Storage
        6. LMS Accessibility & Student Success Analysis | Python, PostgreSQL, Tableau, Docker

      Target Job Description:
      ${jobDescription}

      Return strictly a valid JSON object matching this schema:
      {
        "targetRole": "Extracted Job Title",
        "matchScore": "96%",
        "skills": {
          "languages": "Python, SQL, JavaScript, HTML",
          "frameworks": "Pandas, NumPy",
          "tools": "Ubuntu Linux, Docker, Containerization, Liferay, Brightspace, Sakai, Enterprise System Onboarding, Power Apps, Automated Workflows, Jira, TDX Tickets, Git, GitHub, Technical Documentation, Helpdesk/Walk-in Labs, flutter, dart",
          "cloud": "Google Cloud Platform, Firebase",
          "softSkills": "Faculty Workshops, Technical Consulting"
        },
        "experience": [
          {
            "header": "Marist University | IT Technical Specialist & LMS Administrator",
            "period": "Apr 2025 - Present",
            "bullets": [
              "Spearheaded the full institutional migration of 500+ courses from Sakai to Brightspace, managing large-scale data conversion while preserving content structure and system compliance for over 6,000 end-users.",
              "Engineered a tracking pipeline utilizing Power Apps and Excel to parse system errors, auto-log issues, and trigger scheduled email reporting to 200+ faculty members, eliminating 10+ hours of manual follow-up per week.",
              "Developed 180+ web pages and 2 primary role-based portals in Liferay, utilizing HTML and JavaScript to administer custom tool visibility and secure access by user classification.",
              "Managed and resolved 100+ complex Jira tickets, optimizing technical workflows to reduce average ticket resolution time by 50% and improve overall team response rates by 30%.",
              "Co-led the Bright Foxes outreach campaign, delivering 15+ dedicated faculty support sessions and resolving 50+ complex system inquiries.",
              "Authored 4 comprehensive approval documents per term and built 5+ prototype environments for incoming academic tools, achieving 100% QA testing pass rates before production integration."
            ]
          },
          {
            "header": "Forge Alumnus | Application Developer & Team Lead | hyderabad, india",
            "period": "Sep 2023 - Mar 2024",
            "bullets": [
              "Programmed and deployed 2 proprietary enterprise web applications featuring custom QR-based check-in integrations, accelerating digital onboarding processes and boosting operational efficiency by 50% for 100+ daily users.",
              "Directed a 20-member technical development team, facilitating 5+ onboarding sessions and authoring 15+ pages of Standard Operating Procedures to standardize coding practices and ensure reproducible workflows."
            ]
          }
        ],
        "projects": [
          {
            "title": "Project Title Matching the Candidate Pool",
            "bullets": [
              { "boldPrefix": "End-to-End Data Pipeline: ", "text": "rest of the bullet point..." },
              { "boldPrefix": "Statistical Analysis & SQL: ", "text": "rest of the bullet point..." }
            ]
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    return res.status(200).json(JSON.parse(response.text));
  } catch (error) {
    console.error('Gemini Execution Error:', error);
    return res.status(500).json({ error: 'Failed to generate tailored resume', details: error.message });
  }
}