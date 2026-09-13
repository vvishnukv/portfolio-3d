export const projectsData = [
  {
    title: "LMS Accessibility & Student Success Analysis",
    desc: "Processed 10,000+ student LMS records using Python and PostgreSQL inside Docker to evaluate WCAG 2.1 accessibility compliance. Uncovered critical academic performance metrics and built interactive Tableau Public dashboards.",
    tech: "PYTHON • POSTGRESQL • TABLEAU • DOCKER • PANDAS",
    github: "https://github.com/vvishnukv/lms-analysis-project",
    tableau: "https://public.tableau.com/app/profile/vishnu.kaushik.varma.vuddaraju/viz/LMSAccessibilityStudentEngagementAnalysis/Dashboard1?publish=yes"
  },
  {
    title: "Containerized Research Data Pipeline",
    desc: "Engineered an automated research workflow deployed on a GCP Ubuntu Linux virtual machine utilizing Docker for absolute environment isolation. Processed multi-subject research simulations and generated statistical aggregates via Pandas and NumPy.",
    tech: "DOCKER • GCP • PYTHON • PANDAS • NUMPY",
    github: "https://github.com/vvishnukv/research-computing-docker-pipeline"
  },
  {
    title: "AI-Powered Voice Music Assistant",
    desc: "Built a full-stack voice-activated virtual assistant leveraging Node.js, Express, and MongoDB Atlas to manage and query song directories. Processed speech-to-text voice prompts through OpenAI's API to intelligently parse requests and trigger local computer audio playback.",
    tech: "NODE.JS • EXPRESS • MONGODB • OPENAI API • SPEECH-TO-TEXT",
    github: "https://github.com/vvishnukv/Virtual-Assistant-ChatGPT"
  },
  {
    title: "LinkNews Mobile App",
    desc: "Developed a cross-platform news mobile application using Flutter and Dart. Integrated asynchronous JSON REST API data pipelines via HTTP, HTML parsing utilities, and Firebase Cloud Messaging (FCM) with local notifications for real-time user engagement.",
    tech: "FLUTTER • DART • GETX • FIREBASE FCM • REST APIS",
    github: "https://github.com/vvishnukv/LinkNews"
  },
  {
    title: "Personal Diary App",
    desc: "Built a full-featured personal diary mobile application using Flutter and Dart. Integrated Provider state management, SQLite/Shared Preferences for persistent local data storage, and dynamic light/dark theme switching.",
    tech: "FLUTTER • DART • PROVIDER • SQLITE • SHARED PREFERENCES",
    github: "https://github.com/vvishnukv/diary_app"
  },
  {
    title: "Flutter SQLite & API Integration App",
    desc: "Developed a Flutter mobile utility to fetch remote data from JSONPlaceholder APIs, cache and manage records securely using local SQLite databases (`sqflite`), and render dynamic floating lists with stylized components.",
    tech: "FLUTTER • DART • SQLITE • REST API • HTTP",
    github: "https://github.com/vvishnukv/flutter_sqlite_api_test"
  }
]


export const experienceData = [
  {
    title: "AI Literacy Specialist & LMS Quality Assurance - Digital Education",
    company: "Marist University • Apr 2025 – Present",
    color: "#0284c7",
    bullets: [
      "Redeveloped 150+ academic and departmental web pages in Liferay CMS with responsive design, SEO optimization, and WCAG 2.2 accessibility compliance.",
      "Resolved 100+ complex Jira tickets, cutting ticket resolution time by 50% and boosting response rates by 30%.",
      "Audited 5,000+ Brightspace courses for WCAG 2.2 compliance using Power Apps and Power Automate workflow, automating issue reporting to faculty.",
      "Delivered targeted AI literacy workshops and office hours for faculty, staff, and students, promoting responsible use of Microsoft Copilot, ChatGPT, and Brightspace Lumi.",
      "Manually migrated 500+ courses from Sakai to Brightspace and conducted hands-on sessions to help lecturers master the Brightspace Lumi AI integration.",
      "Co-authored AI Governance guidelines with Digital Education leadership, aligning Marist's human-centered AI strategy with ethical frameworks and data-privacy standards.",
      "Co-led Bright Foxes outreach campaign: 15+ workshops and 50+ system inquiries resolved—building AI fluency and change readiness across campus.",
      "Developed centralized AI resource hub in Brightspace with microcredential pathways, sample prompts, and usage policies for faculty adoption.",
      "Documented Minutes of Meetings (MoMs) for Digital Education projects, ensuring clear communication of action items among technical and academic stakeholders.",
      "Conducted functional, regression, and cross-browser QA testing to ensure LMS, CMS, and AI tool accessibility and quality compliance."
    ]
  },
  {
    title: "Forge Alumnus | Application Developer & Team Lead",
    company: "Hyderabad, India • Sep 2023 – Mar 2024",
    color: "#0284c7",
    bullets: [
      "Engineered and launched Realtor+, a full-scale real estate mobile platform for a USA (New Jersey) client in just 45 days, supporting 10,000+ active users, 100+ real estate agents, and 3 distinct user profiles across Android and iOS platforms.",
      "Released major feature updates for the enterprise mobile application on the Apple App Store and Google Play Store, driving a 60% increase in total application downloads while managing Apple Analytics and Google Analytics.",
      "Architected the Forge HRMS application for automated daily employee check-in and check-out tracking utilizing real-time GPS coordinates and location validation.",
      "Delivered the fully functional Forge Inspira event platform in just 30 days for a 2024 conference, executing rigorous QA testing across 3 user profiles and QR-based event registration tracking.",
      "Directed a 20-member technical development team, hosting 5+ onboarding sessions, authoring 15+ pages of Standard Operating Procedures, and serving as head of volunteers and technical hackathon instructor."
    ]
  }
]

export const educationData = [
  {
    institution: "Marist University",
    degree: "Master of Science, Information Systems",
    duration: "Jan 2025 – Dec 2026",
  },
  {
    institution: "Keshav Memorial Institute Of Technology",
    degree: "Bachelor of Technology, Computer Science & Machine Learning (CSM)",
    duration: "Aug 2020 – May 2024",
  }
]

/* =========================================================
   AI LITERACY & EDTECH CAPABILITIES
   — Marist's AI tools, frameworks, and program pillars
   ========================================================= */
export const aiLiteracyData = {
  supportedTools: [
    { name: 'Microsoft Copilot', desc: 'Enterprise AI assistant for faculty, staff, and student workflows' },
    { name: 'ChatGPT', desc: 'Generative AI for course design, research, and learning support' },
    { name: 'Brightspace Lumi', desc: 'LMS-native AI for content creation, grading, and student guidance' },
    { name: 'Zoom AI Companion', desc: 'Meeting transcription and summarization for teaching and operations' },
  ],
  frameworks: [
    { name: 'Marist AI Ethics Statement', desc: 'Human-centered, responsible AI with dignity and agency' },
    { name: 'AI Operational Guidelines', desc: 'Data privacy, human oversight, acceptable/unacceptable use' },
    { name: 'Academic Integrity Framework', desc: 'AI-assisted vs AI-generated work, citation, and transparency' },
    { name: 'Marist 100 Strategic Plan', desc: 'Academic Vibrancy, Student Centrality, Expansive Community' },
  ],
  programPillars: [
    'AI Literacy Workshops & Office Hours',
    'Faculty & Staff Training',
    'Student AI Fluency Programs',
    'Brightspace Resource Hub & Microcredentials',
    'Departmental AI Consultation',
    'Communities of Practice & Continuous Improvement',
  ],
}

export const skillsData = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'SQL', 'JavaScript', 'Dart', 'HTML']
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['Flutter', 'Node.js', 'Express', 'Pandas', 'NumPy', 'Provider', 'GetX', 'REST APIs']
  },
  {
    title: 'Databases & Cloud',
    skills: ['PostgreSQL', 'MongoDB Atlas', 'SQLite', 'Google Cloud Platform (GCP)', 'Firebase', 'Firebase FCM']
  },
  {
    title: 'Tools, AI & Platforms',
    skills: ['Docker', 'Tableau', 'OpenAI API', 'Speech-to-Text', 'Power Apps', 'Liferay CMS', 'Brightspace', 'Sakai (open-source LMS)', 'Git', 'GitHub', 'Jira']
  },
  {
    title: 'AI Literacy & EdTech',
    skills: ['AI Literacy Training', 'Faculty Development', 'Brightspace Lumi', 'Microsoft Copilot', 'AI Ethics & Governance', 'Microcredential Design', 'Instructional Design', 'Responsible AI', 'EdTech Consultation', 'Communities of Practice']
  }
]