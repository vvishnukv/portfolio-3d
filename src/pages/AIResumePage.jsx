import React, { useState, useRef } from 'react'
import html2pdf from 'html2pdf.js'

export default function AIResumePage({ theme, isDarkMode, playClickSound, setCurrentPage }) {
  const [jobDescription, setJobDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tailoredResume, setTailoredResume] = useState(null)
  const resumePrintRef = useRef(null)

  const handleDownloadPDF = () => {
    playClickSound()
    const element = resumePrintRef.current
    if (!element) return

    const sanitizedRole = (tailoredResume?.targetRole || 'Tailored')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')

    const opt = {
      margin: [0.35, 0.45, 0.35, 0.45],
      filename: `Vishnu_Kaushik_Varma_${sanitizedRole}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.99 },
      html2canvas: { scale: 2.5, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save()
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
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '5vh 4vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Top Bar Navigation */}
      <div style={{ width: '100%', maxWidth: '840px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => { playClickSound(); setCurrentPage('portfolio'); }}
          style={{ background: 'transparent', border: `1px solid ${theme.cardBorder}`, color: theme.textMain, padding: '0.5rem 1.2rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
        >
          ← Back to Portfolio
        </button>
        {tailoredResume && (
          <button
            onClick={handleDownloadPDF}
            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.6rem 1.8rem', borderRadius: '25px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' }}
          >
            Download PDF
          </button>
        )}
      </div>

      {/* Target Job Description Input Box */}
      <div style={{ width: '100%', maxWidth: '840px', background: theme.cardBg, border: '1px solid #38bdf8', padding: '2.2rem', borderRadius: '1.2rem', backdropFilter: 'blur(16px)', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: theme.textMain, marginBottom: '1.4rem', letterSpacing: '0.3px' }}>
          Target Job Description
        </h2>
        <textarea
          rows={6}
          placeholder="Paste target Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ width: '100%', minHeight: '140px', padding: '1.2rem', borderRadius: '0.8rem', border: `1px solid ${theme.cardBorder}`, backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.02)', color: theme.textMain, fontSize: '0.92rem', lineHeight: 1.5, outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: '1.6rem', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: theme.textMuted }}>Direct Live Portfolio Alignment</span>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
            style={{ background: isGenerating ? '#64748b' : '#38bdf8', color: '#030712', border: 'none', padding: '0.7rem 1.8rem', borderRadius: '25px', fontWeight: 700, fontSize: '0.88rem', cursor: isGenerating ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease' }}
          >
            {isGenerating ? 'Tailoring Resume...' : 'Generate Resume'}
          </button>
        </div>
      </div>

      {/* Match Score Badge (Page Only) */}
      {tailoredResume && (
        <div style={{ width: '100%', maxWidth: '816px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isDarkMode ? 'rgba(56, 189, 248, 0.1)' : '#e0f2fe', border: '1px solid #38bdf8', borderRadius: '10px', padding: '0.85rem 1.4rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontWeight: 700, color: theme.textMain, fontSize: '0.95rem' }}>
              Target Role: <span style={{ color: '#38bdf8' }}>{tailoredResume.targetRole || 'Software Engineer'}</span>
            </span>
          </div>
          <div style={{ background: '#10b981', color: '#ffffff', padding: '0.35rem 0.9rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.88rem' }}>
            Match Score: {tailoredResume.matchScore || '96%'}
          </div>
        </div>
      )}

      {/* Printable Resume Container */}
      {tailoredResume && (
        <div
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