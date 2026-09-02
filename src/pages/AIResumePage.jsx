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
      margin: [0.3, 0.4, 0.3, 0.4],
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

      if (!response.ok) throw new Error('API call failed')

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

      {/* Input Field */}
      <div style={{ width: '100%', maxWidth: '820px', background: theme.cardBg, border: '1px solid #38bdf8', padding: '1.5rem', borderRadius: '1rem', backdropFilter: 'blur(16px)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme.textMain, marginBottom: '0.4rem' }}>Tailor to Target Job Description</h2>
        <textarea
          rows={3}
          placeholder="Paste target Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', borderRadius: '0.6rem', border: `1px solid ${theme.cardBorder}`, backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.02)', color: theme.textMain, fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: '0.8rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: theme.textMuted }}>Strict 1-Page Template Alignment</span>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
            style={{ background: isGenerating ? '#64748b' : '#38bdf8', color: '#030712', border: 'none', padding: '0.6rem 1.6rem', borderRadius: '25px', fontWeight: 700, fontSize: '0.85rem', cursor: isGenerating ? 'not-allowed' : 'pointer' }}
          >
            {isGenerating ? 'Analyzing & Tailoring...' : 'Generate Resume 🚀'}
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      {tailoredResume && (
        <div
          ref={resumePrintRef}
          style={{
            width: '100%',
            maxWidth: '816px',
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '32px 38px 24px 38px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            fontFamily: "'Arial', 'Helvetica', sans-serif",
            fontSize: '9.2pt',
            lineHeight: 1.28,
          }}
        >
          {/* EDUCATION */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '6px', letterSpacing: '0.5px' }}>
              EDUCATION
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontWeight: 700 }}>Marist College</div>
              <div>Master of Science, Information Systems</div>
              <div>Jan 2025 - Dec 2026</div>
              <div>GPA: 3.845</div>
            </div>

            <div>
              <div style={{ fontWeight: 700 }}>Keshav Memorial Institute Of Technology</div>
              <div>Bachelor of Technology, CSM</div>
              <div>Aug 2020 - May 2024</div>
              <div>GPA: 3.5</div>
            </div>
          </div>

          {/* SKILLS */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '6px', letterSpacing: '0.5px' }}>
              SKILLS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {Array.isArray(tailoredResume.skills) ? (
                <div><strong>Technical Skills:</strong> {tailoredResume.skills.join(', ')}</div>
              ) : (
                <>
                  <div><strong>Programming Languages:</strong> {tailoredResume.skills?.languages || 'Python, SQL, JavaScript, HTML'}</div>
                  <div><strong>Frameworks & Libraries:</strong> {tailoredResume.skills?.frameworks || 'Pandas, NumPy'}</div>
                  <div><strong>Tools & Software:</strong> {tailoredResume.skills?.tools || 'Ubuntu Linux, Docker, Containerization, Liferay, Brightspace, Sakai, Enterprise System Onboarding, Power Apps, Automated Workflows, Jira, TDX Tickets, Git, GitHub, Technical Documentation, Helpdesk/Walk-in Labs, flutter, dart'}</div>
                  <div><strong>Cloud Platforms:</strong> {tailoredResume.skills?.cloud || 'Google Cloud Platform, Firebase'}</div>
                  <div><strong>Soft Skills:</strong> {tailoredResume.skills?.softSkills || 'Faculty Workshops, Technical Consulting'}</div>
                </>
              )}
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '6px', letterSpacing: '0.5px' }}>
              WORK EXPERIENCE
            </div>
            {tailoredResume.experience?.map((exp, eIdx) => (
              <div key={eIdx} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700 }}>{exp.header}</div>
                <div style={{ marginBottom: '3px' }}>{exp.period}</div>
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {exp.bullets?.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '3px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* PROJECTS */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', marginBottom: '6px', letterSpacing: '0.5px' }}>
              PROJECTS
            </div>
            {tailoredResume.projects?.map((proj, pIdx) => (
              <div key={pIdx} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700 }}>{proj.title}</div>
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {proj.bullets?.map((b, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '2px' }}>
                      {typeof b === 'string' ? (
                        b
                      ) : (
                        <>
                          <strong>{b.boldPrefix}</strong>
                          {b.text}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '6px', textAlign: 'center', fontSize: '8.8pt', color: '#111' }}>
            <div style={{ fontWeight: 700, fontSize: '9.8pt', marginBottom: '1px' }}>
              Vishnu Kaushik Varma
            </div>
            <div>
              Poughkeepsie, New York, United States | vishnukaushikvarma@gmail.com | (551) 297-5781
            </div>
            <div>
              <a href="https://vishnukaushikvarma.vercel.app/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', fontWeight: 600 }}>
                https://vishnukaushikvarma.vercel.app/
              </a>
              {' | '}
              <a href="https://linkedin.com/in/vishnukaushikvarma" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>
                linkedin.com/in/vishnukaushikvarma
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}