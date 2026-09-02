import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
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
      margin: 0.4,
      filename: 'Vishnu_Kaushik_Varma_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
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
      alert('Could not connect to Gemini backend server. Ensure /api/tailor-resume is running.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', padding: '10vh 8vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: '900px' }}>
        <button
          onClick={() => { playClickSound(); setCurrentPage('portfolio'); }}
          style={{ background: 'transparent', border: `1px solid ${theme.cardBorder}`, color: theme.textMain, padding: '0.5rem 1.2rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', marginBottom: '2rem', transition: 'all 0.2s ease' }}
        >
          ← Back to Portfolio
        </button>

        <div style={{ background: theme.cardBg, border: '2px solid #38bdf8', padding: 'clamp(2rem, 4vw, 3.5rem)', borderRadius: '1.5rem', backdropFilter: 'blur(16px)', boxShadow: isDarkMode ? '0 0 35px rgba(56, 189, 248, 0.15)' : '0 15px 40px rgba(2, 132, 199, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>✨ Gemini 2.5 Pro Engine</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: theme.textMain, marginTop: '0.5rem' }}>Tailored 1-Page Resume</h1>
            <p style={{ color: theme.textMuted, fontSize: '0.95rem', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
              Paste a target job description below. Gemini 2.5 Pro cross-references all your projects, tech stack, and experience to generate a matching 1-page resume.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <textarea
              rows={5}
              placeholder="Paste target job description here (e.g. Software Engineer with Python, Docker, Flutter, PostgreSQL)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{ width: '100%', padding: '1.2rem', borderRadius: '1rem', border: `1px solid ${theme.cardBorder}`, backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.02)', color: theme.textMain, fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.82rem', color: theme.textMuted }}>🔒 Powered by Gemini 2.5 Pro • Strict 1-Page Format</span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !jobDescription.trim()}
                style={{ background: isGenerating ? '#64748b' : '#ef4444', color: '#fff', border: 'none', padding: '0.9rem 2.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '0.95rem', cursor: isGenerating ? 'not-allowed' : 'pointer', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.35)', transition: 'all 0.25s ease' }}
              >
                {isGenerating ? '🤖 Gemini Analyzing...' : 'Generate Tailored Resume 🚀'}
              </button>
            </div>
          </div>

          {tailoredResume && (
            <motion.div
              ref={resumePrintRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '2.5rem',
                padding: '2rem',
                borderRadius: '1rem',
                backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                color: isDarkMode ? '#f8fafc' : '#0f172a',
                border: '1px solid #38bdf8'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: `1px solid ${theme.cardBorder}`, paddingBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: theme.textMain, margin: 0, fontWeight: 800 }}>Vishnu Kaushik Varma Vuddaraju</h3>
                  <p style={{ color: '#0284c7', fontSize: '0.85rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>Target: {tailoredResume.targetRole}</p>
                </div>
                <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>Match: {tailoredResume.matchScore} 🎯</span>
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#ef4444', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.5px' }}>Tailored Summary</h4>
                <p style={{ fontSize: '0.9rem', color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{tailoredResume.summary}</p>
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#ef4444', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Matched Technical Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {tailoredResume.skills.map((sk, sI) => (
                    <span key={sI} style={{ fontSize: '0.78rem', padding: '0.25rem 0.7rem', borderRadius: '15px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontWeight: 600 }}>{sk}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#ef4444', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Targeted Experience Bullets</h4>
                <ul style={{ color: theme.textMuted, fontSize: '0.9rem', lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {tailoredResume.bullets.map((b, bI) => (<li key={bI}>{b}</li>))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  onClick={handleDownloadPDF}
                  style={{
                    background: '#38bdf8',
                    color: '#030712',
                    border: 'none',
                    padding: '0.7rem 1.8rem',
                    borderRadius: '25px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)'
                  }}
                >
                  📥 Download 1-Page PDF
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}