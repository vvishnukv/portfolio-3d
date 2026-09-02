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

    const livePortfolioContext = `
      Candidate Full Name: Vishnu Kaushik Varma Vuddaraju
      Title: Software Engineer & IT Technical Specialist
      Contact: Poughkeepsie, New York, United States | vishnukaushikvarma@gmail.com | (551) 297-5781 | linkedin.com/in/vishnukaushikvarma | https://vishnukaushikvarma.vercel.app/

      Education:
      - Marist University | Master of Science, Information Systems | Jan 2025 – Dec 2026 | GPA: 3.845
      - Keshav Memorial Institute Of Technology | Bachelor of Technology, Computer Science & Machine Learning (CSM) | Aug 2020 – May 2024 | GPA: 3.5

      Work Experience:
      - Marist University | Web Developer and LMS Quality Assurance Tester - Digital Education | Apr 2025 – Present
        * Developed 150+ academic and departmental web pages in Liferay CMS with responsive design, SEO optimization, and WCAG 2.2 accessibility compliance.
        * Resolved 100+ complex Jira tickets, cutting ticket resolution time by 50% and boosting response rates by 30%.
        * Audited 5,000+ Brightspace courses for WCAG 2.2 compliance using Power Apps and Power Automate workflow, automating issue reporting to faculty.
        * Assisted faculty across every department with Brightspace LMS and accessibility through hybrid/live sessions and resolved 200+ support requests through Team Dynamix.
        * Conducted workshops on integrating LTI tools and new LMS features, collaborating with the Center for Teaching and Learning to enhance faculty teaching.
        * Spearheaded full institutional migration of 500+ courses from Sakai to Brightspace for 6,000+ end-users.
        * Engineered tracking pipeline with Power Apps and Excel to parse system errors, eliminating 10+ hours of manual follow-up weekly.
        * Co-led Bright Foxes outreach campaign delivering 15+ faculty support sessions and resolving 50+ system inquiries.
        * Documented Minutes of Meetings (MoMs) for Digital Education projects, ensuring clear communication of action items among technical and academic stakeholders.
        * Conducted functional, regression, and cross-browser QA testing to ensure LMS and CMS accessibility and quality compliance.
        * Tested Sakai tools rigorously, helping out with quality assurance testing and creating detailed tickets for the Sakai team to resolve bugs.

      - Forge Alumnus | Application Developer & Team Lead | Hyderabad, India | Sep 2023 – Mar 2024
        * Engineered and launched Realtor+, a full-scale real estate mobile platform for a USA (New Jersey) client in just 45 days, supporting 10,000+ active users, 100+ real estate agents, and 3 distinct user profiles across Android and iOS platforms.
        * Released major feature updates for the enterprise mobile application on the Apple App Store and Google Play Store, driving a 60% increase in total application downloads while managing Apple Analytics and Google Analytics.
        * Architected the Forge HRMS application for automated daily employee check-in and check-out tracking utilizing real-time GPS coordinates and location validation.
        * Delivered the fully functional Forge Inspira event platform in just 30 days for a 2024 conference, executing rigorous QA testing across 3 user profiles and QR-based event registration tracking.
        * Directed a 20-member technical development team, hosting 5+ onboarding sessions, authoring 15+ pages of Standard Operating Procedures, and serving as head of volunteers and technical hackathon instructor.

      Featured Projects Pool:
      1. LMS Accessibility & Student Success Analysis: Processed 10,000+ student LMS records using Python and PostgreSQL inside Docker to evaluate WCAG 2.1 accessibility compliance. Uncovered critical academic performance metrics and built interactive Tableau Public dashboards. (Python, PostgreSQL, Tableau, Docker, Pandas)
      2. Containerized Research Data Pipeline: Engineered an automated research workflow deployed on a GCP Ubuntu Linux virtual machine utilizing Docker for absolute environment isolation. Processed multi-subject research simulations and generated statistical aggregates via Pandas and NumPy. (Docker, GCP, Python, Pandas, NumPy)
      3. AI-Powered Voice Music Assistant: Built a full-stack voice-activated virtual assistant leveraging Node.js, Express, and MongoDB Atlas to manage and query song directories. Processed speech-to-text voice prompts through OpenAI's API to intelligently parse requests and trigger local computer audio playback. (Node.js, Express, MongoDB Atlas, OpenAI API, Speech-to-Text)
      4. LinkNews Mobile App: Developed a cross-platform news mobile application using Flutter and Dart. Integrated asynchronous JSON REST API data pipelines via HTTP, HTML parsing utilities, and Firebase Cloud Messaging (FCM) with local notifications for real-time user engagement. (Flutter, Dart, GetX, Firebase FCM, REST APIs)
      5. Personal Diary App: Built a full-featured personal diary mobile application using Flutter and Dart. Integrated Provider state management, SQLite/Shared Preferences for persistent local data storage, and dynamic light/dark theme switching. (Flutter, Dart, Provider, SQLite, Shared Preferences)
      6. Flutter SQLite & API Integration App: Developed a Flutter mobile utility to fetch remote data from JSONPlaceholder APIs, cache and manage records securely using local SQLite databases (sqflite), and render dynamic floating lists with stylized components. (Flutter, Dart, SQLite, REST API, HTTP)

      Master Technical Skills:
      - Programming Languages: Python, SQL, JavaScript, Dart, HTML
      - Frameworks & Libraries: Flutter, Node.js, Express, Pandas, NumPy, Provider, GetX, REST APIs
      - Databases & Cloud: PostgreSQL, MongoDB Atlas, SQLite, Google Cloud Platform (GCP), Firebase, Firebase FCM
      - Tools, AI & Platforms: Docker, Tableau, OpenAI API, Speech-to-Text, Power Apps, Liferay CMS, Brightspace, Sakai, Git, GitHub, Jira
    `;

    const prompt = `
      You are an elite career strategist. Analyze the Target Job Description below against the candidate's verified live portfolio background.
      Curate and tailor the most impactful bullets and select the 3-4 most relevant projects for the target role. Do not invent fake facts or companies; use the verified portfolio background provided.

      Verified Candidate Portfolio:
      ${livePortfolioContext}

      Target Job Description:
      ${jobDescription}

      Return strictly a valid JSON object matching this schema:
      {
        "targetRole": "Extracted Job Title",
        "skills": {
          "languages": "Python, SQL, JavaScript, Dart, HTML",
          "frameworks": "Flutter, Node.js, Express, Pandas, NumPy, Provider, GetX, REST APIs",
          "databasesCloud": "PostgreSQL, MongoDB Atlas, SQLite, Google Cloud Platform (GCP), Firebase, Firebase FCM",
          "toolsPlatforms": "Docker, Tableau, OpenAI API, Speech-to-Text, Power Apps, Liferay CMS, Brightspace, Sakai, Git, GitHub, Jira"
        },
        "experience": [
          {
            "header": "Marist University | Web Developer and LMS Quality Assurance Tester - Digital Education",
            "period": "Apr 2025 – Present",
            "bullets": [
              "Selected high-impact tailored bullet point 1...",
              "Selected high-impact tailored bullet point 2...",
              "Selected high-impact tailored bullet point 3...",
              "Selected high-impact tailored bullet point 4..."
            ]
          },
          {
            "header": "Forge Alumnus | Application Developer & Team Lead | Hyderabad, India",
            "period": "Sep 2023 – Mar 2024",
            "bullets": [
              "Selected high-impact tailored bullet point 1...",
              "Selected high-impact tailored bullet point 2...",
              "Selected high-impact tailored bullet point 3..."
            ]
          }
        ],
        "projects": [
          {
            "title": "Selected Project 1 Name | Key Stack",
            "bullets": [
              "Detailed bullet point highlighting technical architecture and metrics",
              "Detailed bullet point highlighting tools, outcome, and engineering impact"
            ]
          },
          {
            "title": "Selected Project 2 Name | Key Stack",
            "bullets": [
              "Detailed bullet point highlighting technical architecture and metrics",
              "Detailed bullet point highlighting tools, outcome, and engineering impact"
            ]
          },
          {
            "title": "Selected Project 3 Name | Key Stack",
            "bullets": [
              "Detailed bullet point highlighting technical architecture and metrics",
              "Detailed bullet point highlighting tools, outcome, and engineering impact"
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
        temperature: 0.15
      }
    });

    return res.status(200).json(JSON.parse(response.text));
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({ error: 'Failed to tailor resume', details: error.message });
  }
}