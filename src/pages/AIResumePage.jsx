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

    const opt = {
      margin: [0.35, 0.45, 0.35, 0.45],
      filename: 'Vishnu_Kaushik_Varma_Resume.pdf',
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
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '4vh 4vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Navigation Controls */}
      <div style={{ width: '100%', maxWidth: '820px', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => { playClickSound(); setCurrentPage('portfolio'); }}
          style={{ background: 'transparent', border: `1px solid ${theme.cardBorder}`, color: theme.textMain, padding: '0.45rem 1.1rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
        >
          ← Back to Portfolio
        </button>
        {tailoredResume && (
          <button
            onClick={handleDownloadPDF}
            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.55rem 1.8rem', borderRadius: '25px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' }}
          >
            📥 Download 1-Page PDF
          </button>
        )}
      </div>

      {/* Target Role Input Box */}
      <div style={{ width: '100%', maxWidth: '820px', background: theme.cardBg, border: '1px solid #38bdf8', padding: '1.4rem', borderRadius: '1rem', backdropFilter: 'blur(16px)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme.textMain, marginBottom: '0.4rem' }}>Target Job Description</h2>
        <textarea
          rows={3}
          placeholder="Paste target Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '0.6rem', border: `1px solid ${theme.cardBorder}`, backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.02)', color: theme.textMain, fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: '0.8rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: theme.textMuted }}>Direct Portfolio Alignment</span>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
            style={{ background: isGenerating ? '#64748b' : '#38bdf8', color: '#030712', border: 'none', padding: '0.6rem 1.6rem', borderRadius: '25px', fontWeight: 700, fontSize: '0.85rem', cursor: isGenerating ? 'not-allowed' : 'pointer' }}
          >
            {isGenerating ? 'Generating...' : 'Generate Resume 🚀'}
          </button>
        </div>
      </div>

      {/* RESUME TEMPLATE CLONE (USING LIVE PORTFOLIO INFO) */}
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
            lineHeight: 1.25,
            letterSpacing: '0.01em',
            boxSizing: 'border-box'
          }}
        >
          {/* EDUCATION SECTION */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '8px' }}>
              EDUCATION
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <div>Marist University</div>
              <div>Master of Science, Information Systems</div>
              <div>Jan 2025 – Dec 2026</div>
              <div>GPA: 3.845</div>
            </div>

            <div>
              <div>Keshav Memorial Institute Of Technology</div>
              <div>Bachelor of Technology, Computer Science & Machine Learning (CSM)</div>
              <div>Aug 2020 – May 2024</div>
              <div>GPA: 3.5</div>
            </div>
          </div>

          {/* SKILLS SECTION */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '8px' }}>
              SKILLS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div><strong>Programming Languages:</strong> {tailoredResume.skills?.languages || 'Python, SQL, JavaScript, Dart, HTML'}</div>
              <div><strong>Frameworks & Libraries:</strong> {tailoredResume.skills?.frameworks || 'Flutter, Node.js, Express, Pandas, NumPy, Provider, GetX, REST APIs'}</div>
              <div><strong>Databases & Cloud:</strong> {tailoredResume.skills?.databasesCloud || 'PostgreSQL, MongoDB Atlas, SQLite, Google Cloud Platform (GCP), Firebase, Firebase FCM'}</div>
              <div><strong>Tools, AI & Platforms:</strong> {tailoredResume.skills?.toolsPlatforms || 'Docker, Tableau, OpenAI API, Speech-to-Text, Power Apps, Liferay CMS, Brightspace, Sakai, Git, GitHub, Jira'}</div>
            </div>
          </div>

          {/* WORK EXPERIENCE SECTION */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '8px' }}>
              WORK EXPERIENCE
            </div>

            {tailoredResume.experience?.map((exp, eIdx) => (
              <div key={eIdx} style={{ marginBottom: '14px' }}>
                <div>{exp.header}</div>
                <div style={{ marginBottom: '5px' }}>{exp.period}</div>
                <div style={{ paddingLeft: '2px' }}>
                  {exp.bullets?.map((bullet, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ marginRight: '6px', fontSize: '9pt' }}>•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* PROJECTS SECTION */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '8px' }}>
              PROJECTS
            </div>

            {tailoredResume.projects?.map((proj, pIdx) => (
              <div key={pIdx} style={{ marginBottom: '12px' }}>
                <div style={{ marginBottom: '4px' }}>{proj.title}</div>
                <div style={{ paddingLeft: '2px' }}>
                  {proj.bullets?.map((b, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '5px' }}>
                      <span style={{ marginRight: '6px', fontSize: '9pt' }}>•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div style={{ textAlign: 'left', marginTop: '16px', fontSize: '9pt' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', marginBottom: '2px' }}>
              Vishnu Kaushik Varma Vuddaraju
            </div>
            <div>
              Poughkeepsie, New York, United States | vishnukaushikvarma@gmail.com | (551) 297-5781 |{' '}
              <a href="https://linkedin.com/in/vishnukaushikvarma" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                linkedin.com/in/vishnukaushikvarma
              </a>
            </div>
            <div style={{ marginTop: '2px' }}>
              <a href="https://vishnukaushikvarma.vercel.app/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                https://vishnukaushikvarma.vercel.app/
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}