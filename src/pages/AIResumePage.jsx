import React, { useState, useRef } from 'react'

export default function AIResumePage({ theme, isDarkMode, playClickSound, setCurrentPage }) {
  const [jobDescription, setJobDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tailoredResume, setTailoredResume] = useState(null)
  const resumePrintRef = useRef(null)

  // Pure vector text print for 100% ATS machine-readability
  const handleDownloadPDF = () => {
    playClickSound()
    
    // Set document title dynamically so browser suggests this as the PDF filename
    const sanitizedRole = (tailoredResume?.targetRole || 'Software_Engineer')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
    
    const originalTitle = document.title
    document.title = `Vishnu_Kaushik_Varma_${sanitizedRole}_Resume`
    
    window.print()
    
    document.title = originalTitle
  }

  // Calculate realistic match score based on job description overlap
  const calculateJDScore = (text) => {
    if (!text) return '85%'
    const lower = text.toLowerCase()
    const coreKeywords = [
      'python', 'sql', 'react', 'javascript', 'docker', 'postgresql',
      'lms', 'cloud', 'gcp', 'git', 'tableau', 'rest', 'api', 'flutter',
      'testing', 'qa', 'automation', 'agile', 'database', 'developer'
    ]
    let matches = 0
    coreKeywords.forEach((kw) => {
      if (lower.includes(kw)) matches++
    })
    
    // Scale dynamically between 78% and 98% based on JD density
    const score = Math.min(98, Math.max(78, Math.round(75 + (matches / coreKeywords.length) * 25)))
    return `${score}%`
  }

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return
    setIsGenerating(true)
    playClickSound()

    try {
      const response = await fetch('/api/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      })

      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()
      
      setTailoredResume(data)
    } catch (err) {
      alert('Could not connect to backend server. Ensure /api/tailor-resume is active.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '5vh 4vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Page header */}
      <div className="no-print" style={{ width: '100%', maxWidth: '840px', textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="gradient-text" style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          marginBottom: '0.7rem',
          letterSpacing: '-0.01em',
        }}>
          AI Resume Tailor
        </h1>
        <p style={{ color: theme.textMuted, fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          Paste a job description and let our AI tailor your resume to maximize ATS compatibility and recruiter match.
        </p>
      </div>

      
      {/* Native Print Styles: Hides UI controls & makes the resume pure searchable vector text */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #resume-print-area, #resume-print-area * {
            visibility: visible !important;
          }
          #resume-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0.4in 0.5in !important;
            box-shadow: none !important;
          }
          @page {
            size: letter portrait;
            margin: 0;
          }
        }
      `}</style>

      {/* Top Bar Navigation */}
      <div className="no-print" style={{ width: '100%', maxWidth: '840px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => { playClickSound(); setCurrentPage('portfolio'); }}
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            color: theme.textMain,
            padding: '0.5rem 1.2rem',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.cardBorderFocus
            e.currentTarget.style.boxShadow = `0 0 12px ${theme.accent1}30`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.cardBorder
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          ← Back to Portfolio
        </button>
        {tailoredResume && (
          <button
            onClick={handleDownloadPDF}
            style={{
              background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.8rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: `0 4px 16px ${theme.accent1}40`,
            }}
          >
            Download PDF
          </button>
        )}
      </div>

      {/* Target Job Description Input Box */}
      <div className="no-print glass-card" style={{ width: '100%', maxWidth: '840px', padding: '2.2rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
        {/* Top gradient strip */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
        }} />

        <h2 style={{
          fontSize: '1.3rem',
          fontWeight: 800,
          color: theme.textMain,
          marginBottom: '1.4rem',
          letterSpacing: '0.3px',
          fontFamily: 'var(--font-display)',
        }}>
          Target Job Description
        </h2>
        <textarea
          rows={6}
          placeholder="Paste target Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{
            width: '100%',
            minHeight: '140px',
            padding: '1.2rem',
            borderRadius: '0.8rem',
            border: `1px solid ${theme.cardBorder}`,
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.02)',
            color: theme.textMain,
            fontSize: '0.92rem',
            lineHeight: 1.5,
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'var(--font-mono)',
            marginBottom: '1.6rem',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = theme.cardBorderFocus)}
          onBlur={(e) => (e.currentTarget.style.borderColor = theme.cardBorder)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: theme.textMuted }}>Direct Live Portfolio Alignment</span>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
            style={{
              background: isGenerating ? '#64748b' : `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
              color: '#fff',
              border: 'none',
              padding: '0.7rem 1.8rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isGenerating ? 'none' : `0 4px 16px ${theme.accent1}40`,
            }}
          >
            {isGenerating ? 'Tailoring Resume...' : '⚡ Generate Resume'}
          </button>
        </div>
      </div>

      {/* Match Score Badge (Web Page UI Only) */}
      {tailoredResume && (
        <div className="no-print" style={{
          width: '100%',
          maxWidth: '816px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: '999px',
          padding: '0.85rem 1.4rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(16px)',
          flexWrap: 'wrap',
          gap: '0.8rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontWeight: 700, color: theme.textMain, fontSize: '0.95rem' }}>
              Target Role: <span style={{ color: theme.accent1 }}>{tailoredResume.targetRole || 'Software Engineer'}</span>
            </span>
          </div>
          <div style={{
            background: (tailoredResume.matchScore || tailoredResume.match_score) ? `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` : theme.accent3,
            color: '#ffffff',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: '0.88rem',
            boxShadow: `0 0 16px ${theme.accent1}40`,
          }}>
            Match Score: {(() => {
              const score = tailoredResume.matchScore || tailoredResume.match_score;
              if (!score) {
                console.error("Match Score Error: Could not retrieve matchScore from Gemini response payload.", tailoredResume);
                return "Error (Check Console)";
              }
              return score;
            })()}
          </div>
        </div>
      )}

      {/* PRINTABLE RESUME CONTAINER (True ATS-Compatible Vector Text) */}
      {tailoredResume && (
        <div
          id="resume-print-area"
          ref={resumePrintRef}
          style={{
            width: '100%',
            maxWidth: '816px',
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '36px 44px 30px 44px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            fontFamily: "'Calibri', 'Arial', sans-serif",
            fontSize: '9.2pt',
            lineHeight: 1.28,
            letterSpacing: '0.01em',
            boxSizing: 'border-box'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '4px' }}>
            <h1 style={{ fontSize: '18pt', fontWeight: 700, letterSpacing: '0.5px', margin: '0 0 4px 0', color: '#000' }}>
              Vishnu Kaushik Varma Vuddaraju
            </h1>
            <p style={{ margin: '0 0 3px 0', fontSize: '9pt', color: '#222' }}>
              Poughkeepsie, New York, United States | vishnukaushikvarma@gmail.com | (551) 297-5781 |{' '}
              <a href="https://linkedin.com/in/vishnukaushikvarma" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                linkedin.com/in/vishnukaushikvarma
              </a>
            </p>
            <p style={{ margin: 0, fontSize: '9pt' }}>
              <a href="https://vishnukaushikvarma.vercel.app/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', fontWeight: 600 }}>
                https://vishnukaushikvarma.vercel.app/
              </a>
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
              EDUCATION
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '9.5pt' }}>Marist University</strong>
                <span style={{ fontWeight: 600 }}>Jan 2025 – Dec 2026</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span>Master of Science, Information Systems</span>
                <span style={{ fontWeight: 600 }}>GPA: 3.845</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '9.5pt' }}>Keshav Memorial Institute Of Technology</strong>
                <span style={{ fontWeight: 600 }}>Aug 2020 – May 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span>Bachelor of Technology, Computer Science & Machine Learning (CSM)</span>
                <span style={{ fontWeight: 600 }}>GPA: 3.5</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
              SKILLS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div><strong>Programming Languages:</strong> {tailoredResume.skills?.languages || 'Python, SQL, JavaScript, Dart, HTML'}</div>
              <div><strong>Frameworks & Libraries:</strong> {tailoredResume.skills?.frameworks || 'Flutter, Node.js, Express, Pandas, NumPy, Provider, GetX, REST APIs'}</div>
              <div><strong>Databases & Cloud:</strong> {tailoredResume.skills?.databasesCloud || 'PostgreSQL, MongoDB Atlas, SQLite, Google Cloud Platform (GCP), Firebase, Firebase FCM'}</div>
              <div><strong>Tools, AI & Platforms:</strong> {tailoredResume.skills?.toolsPlatforms || 'Docker, Tableau, OpenAI API, Speech-to-Text, Power Apps, Liferay CMS, Brightspace, Sakai, Git, GitHub, Jira'}</div>
            </div>
          </div>

          {/* Work Experience */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
              WORK EXPERIENCE
            </div>

            {tailoredResume.experience?.map((exp, eIdx) => (
              <div key={eIdx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700 }}>
                  <span>{exp.header}</span>
                  <span>{exp.period}</span>
                </div>
                <div style={{ paddingLeft: '2px', marginTop: '4px' }}>
                  {exp.bullets?.map((bullet, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ marginRight: '6px', fontSize: '9pt' }}>•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
              PROJECTS
            </div>

            {tailoredResume.projects?.map((proj, pIdx) => (
              <div key={pIdx} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, marginBottom: '3px' }}>{proj.title}</div>
                <div style={{ paddingLeft: '2px' }}>
                  {proj.bullets?.map((b, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '3px' }}>
                      <span style={{ marginRight: '6px', fontSize: '9pt' }}>•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}