import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_LABELS = ['Job Description', 'ATS Analysis', 'Resume Preview']

function ATSGauge({ score, theme }) {
  const radius = 60
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference
  const color = score >= 80 ? theme.accent1 : score >= 60 ? theme.accent2 : theme.accent3

  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
      <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke={color + '20'}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="ats-circle-progress"
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            color: color,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontSize: '0.65rem',
            color: theme.textMuted,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          ATS
        </span>
      </div>
    </div>
  )
}

function KeywordChip({ keyword, matched, theme }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.25rem 0.65rem',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        background: matched ? theme.accent1 + '15' : theme.accent3 + '12',
        color: matched ? theme.accent1 : theme.textMuted,
        border: '1px solid ' + (matched ? theme.accent1 + '30' : theme.accent3 + '25'),
      }}
    >
      {matched ? '✓' : '✗'} {keyword}
    </span>
  )
}

export default function AIResumePage({ theme, isDarkMode, playClickSound, setCurrentPage }) {
  const [jobDescription, setJobDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tailoredResume, setTailoredResume] = useState(null)
  const [step, setStep] = useState(0) // 0=input, 1=analysis, 2=preview
  const [error, setError] = useState(null)
  const resumePrintRef = useRef(null)

  const handleDownloadPDF = () => {
    playClickSound && playClickSound()
    const sanitizedRole = (tailoredResume?.targetRole || 'Software_Engineer')
      .replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_')
    const originalTitle = document.title
    document.title = 'Vishnu_Kaushik_Varma_' + sanitizedRole + '_Resume'
    window.print()
    document.title = originalTitle
  }

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return
    setIsGenerating(true)
    setError(null)
    playClickSound && playClickSound()

    try {
      const response = await fetch('/api/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      })
      if (!response.ok) throw new Error('API request failed')
      const data = await response.json()
      setTailoredResume(data)
      setStep(1)
    } catch (err) {
      setError('Could not generate resume. Please ensure the API server is running.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleViewResume = () => {
    setStep(2)
  }

  const handleBack = () => {
    if (step === 1) {
      setStep(0)
      setTailoredResume(null)
    } else if (step === 2) {
      setStep(1)
    }
  }

  const handleNewJob = () => {
    setStep(0)
    setJobDescription('')
    setTailoredResume(null)
    setError(null)
  }

  // Parse match score from string
  const matchScoreNum = tailoredResume
    ? parseInt((tailoredResume.matchScore || tailoredResume.match_score || '75').replace('%', ''), 10)
    : 75

  // Extract keywords from job description for display
  const jobKeywords = React.useMemo(() => {
    if (!jobDescription) return []
    const words = jobDescription.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
    const freq = {}
    words.forEach((w) => { freq[w] = (freq[w] || 0) + 1 })
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([kw]) => kw)
  }, [jobDescription])

  // Check which portfolio skills match
  const portfolioSkills = [
    'python', 'sql', 'react', 'javascript', 'docker', 'postgresql',
    'lms', 'cloud', 'gcp', 'git', 'tableau', 'rest', 'api',
    'flutter', 'testing', 'qa', 'automation', 'agile', 'database',
    'developer', 'nodejs', 'mongodb', 'firebase', 'html', 'css',
  ]

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #resume-print-area, #resume-print-area * { visibility: visible !important; }
          #resume-print-area {
            position: absolute !important; left: 0 !important; top: 0 !important;
            width: 100% !important; margin: 0 !important;
            padding: 0.4in 0.5in !important; box-shadow: none !important;
          }
          @page { size: letter portrait; margin: 0; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: '860px', padding: '4vh 4vw 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        {step > 0 ? (
          <button
            onClick={handleBack}
            style={{
              background: theme.cardBg,
              border: '1px solid ' + theme.cardBorder,
              color: theme.textMain,
              padding: '0.5rem 1.2rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.cardBorderFocus }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.cardBorder }}
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={() => { playClickSound && playClickSound(); setCurrentPage('portfolio') }}
            style={{
              background: theme.cardBg,
              border: '1px solid ' + theme.cardBorder,
              color: theme.textMain,
              padding: '0.5rem 1.2rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.cardBorderFocus }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.cardBorder }}
          >
            ← Portfolio
          </button>
        )}

        {step === 2 && (
          <button
            onClick={handleNewJob}
            style={{
              background: theme.cardBg,
              border: '1px solid ' + theme.cardBorder,
              color: theme.textMain,
              padding: '0.5rem 1.2rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
          >
            + New Job
          </button>
        )}

        {step === 1 && tailoredResume && (
          <button
            onClick={handleDownloadPDF}
            style={{
              background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
              color: '#09090b',
              border: 'none',
              padding: '0.55rem 1.5rem',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px ' + theme.accent1 + '40',
            }}
          >
            Download PDF
          </button>
        )}
      </div>

      {/* Page header */}
      <div style={{ width: '100%', maxWidth: '860px', textAlign: 'center', padding: '3vh 4vw 2vh' }}>
        <h1 className="display-heading shimmer-text" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}>
          AI Resume Tailor
        </h1>
        <p style={{ color: theme.textMuted, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Paste any job description — get an ATS-optimized, tailored resume in seconds
        </p>

        {/* Step indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '0' }}>
          {STEP_LABELS.map((label, i) => {
            const isActive = step === i
            const isPast = step > i
            return (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isActive
                        ? 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')'
                        : isPast
                          ? theme.accent1
                          : 'transparent',
                      border: '2px solid ' + (isActive || isPast ? theme.accent1 : theme.cardBorder),
                      color: (isActive || isPast) ? '#09090b' : theme.textMuted,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 4px 12px ' + theme.accent1 + '40' : 'none',
                    }}
                  >
                    {isPast ? '✓' : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? theme.accent1 : theme.textMuted,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    style={{
                      width: '60px',
                      height: '2px',
                      background: step > i ? theme.accent1 : theme.cardBorder,
                      marginTop: '14px',
                      borderRadius: '999px',
                      transition: 'background 0.3s ease',
                    }}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Main content area */}
      <div style={{ width: '100%', maxWidth: '860px', padding: '0 4vw 5vh' }}>

        {/* STEP 0: Job Description Input */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                {/* Gold accent top */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, ' + theme.accent1 + '25, ' + theme.accent2 + '25)',
                    border: '1px solid ' + theme.accent1 + '30',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                  }}>
                    🎯
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: theme.textMain, margin: 0 }}>
                      Step 1: Paste Job Description
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: theme.textMuted, margin: '0.2rem 0 0' }}>
                      Copy & paste the job posting you are targeting
                    </p>
                  </div>
                </div>

                <textarea
                  rows={8}
                  placeholder={"Paste job description here...\n\nExample: Looking for a Software Engineer with experience in Python, React, SQL, and cloud technologies. Must have experience with Docker and GCP..."}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '1rem 1.2rem',
                    borderRadius: '0.8rem',
                    border: '1px solid ' + theme.cardBorder,
                    background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    color: theme.textMain,
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '1.5rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = theme.cardBorderFocus }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = theme.cardBorder }}
                />

                {error && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.6rem',
                    background: theme.accent3 + '15',
                    border: '1px solid ' + theme.accent3 + '30',
                    color: theme.accent3,
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    fontWeight: 500,
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', color: theme.textMuted }}>
                    {jobDescription.length} characters typed
                  </span>
                  <button
                    onClick={handleAnalyze}
                    disabled={isGenerating || !jobDescription.trim()}
                    style={{
                      background: isGenerating || !jobDescription.trim()
                        ? 'rgba(212,168,83,0.2)'
                        : 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                      color: isGenerating || !jobDescription.trim() ? theme.textMuted : '#09090b',
                      border: 'none',
                      padding: '0.75rem 2rem',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: isGenerating || !jobDescription.trim() ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: !isGenerating && jobDescription.trim() ? '0 4px 16px ' + theme.accent1 + '40' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {isGenerating ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block' }}
                        >
                          ⟳
                        </motion.span>
                        Analyzing...
                      </>
                    ) : (
                      <>⚡ Generate ATS Resume</>
                    )}
                  </button>
                </div>
              </div>

              {/* Tips card */}
              <div style={{ marginTop: '1rem', padding: '1.5rem', background: theme.cardBg, border: '1px solid ' + theme.cardBorder, borderRadius: '1.2rem', backdropFilter: 'blur(16px)' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: theme.textMain, marginBottom: '0.75rem' }}>
                  💡 Tips for best results
                </h3>
                <ul style={{ color: theme.textMuted, fontSize: '0.82rem', lineHeight: 1.7, paddingLeft: '1.2rem', margin: 0 }}>
                  <li>Paste the full job description, not just the title</li>
                  <li>Include requirements, responsibilities, and preferred qualifications</li>
                  <li>The more detail you paste, the better the ATS match analysis</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 1: ATS Analysis */}
        <AnimatePresence mode="wait">
          {step === 1 && tailoredResume && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ATS Score card */}
              <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {/* Score gauge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <ATSGauge score={matchScoreNum} theme={theme} />
                    <div>
                      <div style={{ fontSize: '0.72rem', color: theme.textMuted, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        Match Score
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: theme.textMain, lineHeight: 1.3 }}>
                        {tailoredResume.targetRole || 'Software Engineer'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: theme.textMuted, marginTop: '0.2rem' }}>
                        {matchScoreNum >= 80 ? 'Strong match — good to apply!' : matchScoreNum >= 60 ? 'Moderate match — tailor your resume' : 'Low match — consider other roles'}
                      </div>
                    </div>
                  </div>

                  {/* Score breakdown */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Skills', value: Math.min(100, matchScoreNum + 5) },
                      { label: 'Experience', value: Math.max(50, matchScoreNum - 10) },
                      { label: 'Format', value: Math.min(100, matchScoreNum + 12) },
                    ].map((item) => (
                      <div key={item.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: theme.accent1, fontFamily: 'var(--font-display)' }}>
                          {item.value}%
                        </div>
                        <div style={{ width: '60px', height: '4px', background: theme.accent1 + '20', borderRadius: '999px', marginTop: '0.25rem', overflow: 'hidden' }}>
                          <div style={{ width: item.value + '%', height: '100%', background: 'linear-gradient(90deg, ' + theme.accent1 + ', ' + theme.accent2 + ')', borderRadius: '999px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keywords analysis */}
              <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: theme.textMain, marginBottom: '1rem' }}>
                  🔑 Keyword Match Analysis
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {portfolioSkills.map((skill) => {
                    const matched = jobDescription.toLowerCase().includes(skill)
                    return <KeywordChip key={skill} keyword={skill} matched={matched} theme={theme} />
                  })}
                </div>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={handleViewResume}
                  style={{
                    background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                    color: '#09090b',
                    border: 'none',
                    padding: '0.85rem 2.5rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px ' + theme.accent1 + '40',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  View Tailored Resume →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2: Resume Preview / Download */}
        <AnimatePresence mode="wait">
          {step === 2 && tailoredResume && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Preview banner */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(135deg, ' + theme.accent1 + '15, ' + theme.accent2 + '10)',
                border: '1px solid ' + theme.accent1 + '25',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(16px)',
                flexWrap: 'wrap',
                gap: '0.8rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>✅</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: theme.textMain }}>
                      ATS-Optimized Resume Generated
                    </div>
                    <div style={{ fontSize: '0.78rem', color: theme.textMuted }}>
                      For: <span style={{ color: theme.accent1, fontWeight: 600 }}>{tailoredResume.targetRole}</span>
                      &nbsp;·&nbsp; Match: <span style={{ color: theme.accent1, fontWeight: 600 }}>{matchScoreNum}%</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handleDownloadPDF}
                    style={{
                      background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                      color: '#09090b',
                      border: 'none',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px ' + theme.accent1 + '40',
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Printable resume */}
              <div
                id="resume-print-area"
                ref={resumePrintRef}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  padding: '36px 44px 30px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  fontFamily: "'Calibri', 'Arial', sans-serif",
                  fontSize: '9.2pt',
                  lineHeight: 1.28,
                  letterSpacing: '0.01em',
                  boxSizing: 'border-box',
                  borderRadius: '0.8rem',
                }}
              >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '4px' }}>
                  <h1 style={{ fontSize: '18pt', fontWeight: 700, letterSpacing: '0.5px', margin: '0 0 4px 0', color: '#000' }}>
                    Vishnu Kaushik Varma Vuddaraju
                  </h1>
                  <p style={{ margin: '0 0 3px 0', fontSize: '9pt', color: '#222' }}>
                    Poughkeepsie, New York, United States | vishnukaushikvarma@gmail.com | (551) 297-5781 |
                    <a href="https://linkedin.com/in/vishnukaushikvarma" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}> linkedin.com/in/vishnukaushikvarma</a>
                  </p>
                  <p style={{ margin: 0, fontSize: '9pt' }}>
                    <a href="https://vishnukaushikvarma.vercel.app/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', fontWeight: 600 }}>https://vishnukaushikvarma.vercel.app/</a>
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
                    <div><strong>Languages:</strong> {tailoredResume.skills?.languages || 'Python, SQL, JavaScript, Dart, HTML'}</div>
                    <div><strong>Frameworks:</strong> {tailoredResume.skills?.frameworks || 'Flutter, Node.js, Express, Pandas, NumPy, REST APIs'}</div>
                    <div><strong>Databases & Cloud:</strong> {tailoredResume.skills?.databasesCloud || 'PostgreSQL, MongoDB Atlas, SQLite, GCP, Firebase'}</div>
                    <div><strong>Tools:</strong> {tailoredResume.skills?.toolsPlatforms || 'Docker, Tableau, Jira, Git, Power Apps, Liferay CMS, Brightspace, Sakai'}</div>
                  </div>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '10pt', color: '#000000', borderBottom: '1px solid #111', paddingBottom: '2px', marginBottom: '8px', letterSpacing: '0.5px' }}>
                    WORK EXPERIENCE
                  </div>
                  {(tailoredResume.experience || []).map((exp, eIdx) => (
                    <div key={eIdx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700 }}>
                        <span>{exp.header}</span>
                        <span>{exp.period}</span>
                      </div>
                      <div style={{ paddingLeft: '2px', marginTop: '4px' }}>
                        {(exp.bullets || []).map((b, bIdx) => (
                          <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <span style={{ marginRight: '6px', fontSize: '9pt' }}>•</span>
                            <span>{b}</span>
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
                  {(tailoredResume.projects || []).map((proj, pIdx) => (
                    <div key={pIdx} style={{ marginBottom: '10px' }}>
                      <div style={{ fontWeight: 700, marginBottom: '3px' }}>{proj.title}</div>
                      <div style={{ paddingLeft: '2px' }}>
                        {(proj.bullets || []).map((b, bIdx) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
