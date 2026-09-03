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

    // Sanitize the job description to prevent broken template strings or JSON syntax errors
    const sanitizedJD = jobDescription
      .replace(/["\\]/g, ' ') // Replace raw quotes and backslashes with spaces
      .replace(/[\r\n]+/g, ' '); // Normalize newlines into spaces

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const livePortfolioContext = `
      Candidate Full Name: Vishnu Kaushik Varma Vuddaraju[cite: 1]
      Title: Software Engineer & IT Technical Specialist
      Contact: Poughkeepsie, New York, United States | vishnukaushikvarma@gmail.com | (551) 297-5781 | linkedin.com/in/vishnukaushikvarma | https://vishnukaushikvarma.vercel.app/[cite: 1]

      Education:
      - Marist University | Master of Science, Information Systems | Jan 2025 – Dec 2026 | GPA: 3.845[cite: 1]
      - Keshav Memorial Institute Of Technology | Bachelor of Technology, Computer Science & Machine Learning (CSM) | Aug 2020 – May 2024 | GPA: 3.5[cite: 1]

      Work Experience:
      - Marist University | Web Developer and LMS Quality Assurance Tester - Digital Education | Apr 2025 – Present[cite: 1]
        * Developed 150+ academic and departmental web pages in Liferay CMS with responsive design, SEO optimization, and WCAG 2.2 accessibility compliance.
        * Resolved 100+ complex Jira tickets, cutting ticket resolution time by 50% and boosting response rates by 30%.
        * Audited 5,000+ course modules using automated Power Apps workflows to parse system errors, log defect reports, and verify compliance across academic departments[cite: 1].
        * Documented detailed Minutes of Meetings (MoMs) and test procedures to effectively facilitate requirement discussions between technical engineers and non-technical stakeholders[cite: 1].

      - Forge Alumnus | Application Developer & Team Lead | Hyderabad, India | Sep 2023 – Mar 2024[cite: 1]
        * Executed rigorous functional QA testing across 3 distinct user profiles for real-time mobile and web platforms to ensure zero post-launch critical defects[cite: 1].
        * Authored 15+ pages of Standard Operating Procedures (SOPs) and technical documentation to standardize bug logging, requirements tracing, and QA workflows[cite: 1].
        * Directed a 20-member technical development team in an Agile environment, conducting onboarding sessions and bug verification discussions to accelerate application releases[cite: 1].

      Featured Projects Pool:
      1. LMS Accessibility & Student Success Analysis: Queried and processed 10,000+ student LMS records using PostgreSQL and Python inside Docker to evaluate data integrity and compliance criteria. Created interactive Tableau dashboards to visually communicate functional evaluation metrics and audit findings to stakeholders. (Python, PostgreSQL, Tableau, Docker, Pandas)[cite: 1]
      2. Flutter SQLite & API Integration App: Executed functional test scenarios on REST API integrations by fetching remote JSON endpoints and validating dynamic data parsing against local SQLite records. Identified edge-case data errors and UI rendering defects across asynchronous HTTP data pipelines to improve app stability and response handling. (SQLite, REST API, Dart, HTTP)[cite: 1]
      3. LinkNews Mobile App: Tested asynchronous JSON REST API data pipelines and HTML parsing utilities to guarantee reliable real-time content display. Validated push notification triggers and payload deliveries through end-to-end manual testing using Firebase Cloud Messaging (FCM). (Flutter, REST APIs, Firebase FCM, Dart)[cite: 1]

      Master Technical Skills:
      - Programming Languages: SQL, Python, JavaScript, Dart, HTML[cite: 1]
      - Frameworks & Libraries: REST APIs, Node.js, Express, Pandas, NumPy, Flutter, GetX[cite: 1]
      - Databases & Cloud: PostgreSQL, SQLite, MongoDB Atlas, Google Cloud Platform (GCP), Firebase[cite: 1]
      - Tools, AI & Platforms: Jira, Brightspace, Sakai, Liferay CMS, Power Apps, Docker, Tableau, Git, GitHub[cite: 1]
    `;

    const prompt = `
      You are a strict, veteran technical recruiter acting as a hard gatekeeper. Your job is to evaluate the candidate's actual qualifications against the Target Job Description below with ruthless honesty.

      SCORING RUBRIC (Strict Evaluation):
      1. Seniority & Experience Penalty: If the job description explicitly requires years of experience (e.g., 5+ years, 10+ years) or niche domain knowledge (e.g., healthcare claims, Medicare, specialized government systems like Momentum) that the candidate's timeline does not meet, you MUST heavily penalize the match score (bringing it down to 30%-50% or lower). Do not rely solely on keyword matches.
      2. Unrelated Field Penalty: If the job is completely unrelated (e.g., electrician, medical doctor), score it 10% to 20%.
      3. Strong Software/QA Match: Only give scores in the 80%+ range if the role matches a junior-to-mid software engineer, web developer, or general QA tester role where their actual background and graduation year (2024/2026) align.

      Verified Candidate Portfolio:
      ${livePortfolioContext}

      Target Job Description:
      ${sanitizedJD}

      Return strictly a valid JSON object matching this schema (do not include markdown codeblock formatting like \`\`\`json):
      {
        "targetRole": "Extracted Job Title",
        "matchScore": "XX%",
        "skills": {
          "languages": "SQL, Python, JavaScript, Dart, HTML",
          "frameworks": "REST APIs, Node.js, Express, Pandas, NumPy, Flutter, GetX",
          "databasesCloud": "PostgreSQL, SQLite, MongoDB Atlas, Google Cloud Platform (GCP), Firebase",
          "toolsPlatforms": "Jira, Brightspace, Sakai, Liferay CMS, Power Apps, Docker, Tableau, Git, GitHub"
        },
        "experience": [
          {
            "header": "Marist University | Web Developer and LMS Quality Assurance Tester - Digital Education",
            "period": "Apr 2025 – Present",
            "bullets": [
              "Recruiter-optimized bullet 1...",
              "Recruiter-optimized bullet 2...",
              "Recruiter-optimized bullet 3...",
              "Recruiter-optimized bullet 4..."
            ]
          },
          {
            "header": "Forge Alumnus | Application Developer & Team Lead | Hyderabad, India",
            "period": "Sep 2023 – Mar 2024",
            "bullets": [
              "Recruiter-optimized bullet 1...",
              "Recruiter-optimized bullet 2...",
              "Recruiter-optimized bullet 3..."
            ]
          }
        ],
        "projects": [
          {
            "title": "Selected Project 1 Name | Key Stack",
            "bullets": [
              "Tailored bullet point matching requirements",
              "Tailored outcome bullet point matching requirements"
            ]
          },
          {
            "title": "Selected Project 2 Name | Key Stack",
            "bullets": [
              "Tailored bullet point matching requirements",
              "Tailored outcome bullet point matching requirements"
            ]
          },
          {
            "title": "Selected Project 3 Name | Key Stack",
            "bullets": [
              "Tailored bullet point matching requirements",
              "Tailored outcome bullet point matching requirements"
            ]
          }
        ]
      }
    `;

    // Stable failover model sequence
    const modelsToTry = [
      'gemini-3.6-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    let responseText = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
            maxOutputTokens: 2048
          }
        });
        
        responseText = response.text;
        break; 
      } catch (err) {
        console.warn(`Model ${modelName} failed. Trying next fallback...`);
        lastError = err;
        const errString = err.toString().toLowerCase();
        
        const isRetryable = 
          err.status === 404 ||
          err.status === 429 || 
          err.status === 503 || 
          errString.includes('not_found') ||
          errString.includes('quota') || 
          errString.includes('resource_exhausted') || 
          errString.includes('rate limit') ||
          errString.includes('unavailable') ||
          errString.includes('high demand');

        if (isRetryable) {
          continue; 
        } else {
          throw err; 
        }
      }
    }

    if (!responseText) {
      throw lastError || new Error('All models unavailable.');
    }

    const resultText = responseText.trim();
    const cleanJson = resultText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

    return res.status(200).json(JSON.parse(cleanJson));
  } catch (error) {
    console.error('Gemini server error:', error);

    const errString = error.toString().toLowerCase();
    const isUnavailable = error.status === 503 || errString.includes('unavailable') || errString.includes('high demand');
    const isQuotaError = error.status === 429 || errString.includes('quota') || errString.includes('resource_exhausted') || errString.includes('rate limit');

    if (isUnavailable) {
      return res.status(503).json({
        error: 'Service Temporarily Unavailable',
        details: 'This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.'
      });
    }

    if (isQuotaError) {
      return res.status(429).json({ 
        error: 'API Quota Exceeded', 
        details: 'API rate limits or quotas have been reached. Please try again later.' 
      });
    }

    return res.status(500).json({ 
      error: 'Failed to tailor resume', 
      details: error.message 
    });
  }
}