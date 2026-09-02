import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactSection({ theme, isDarkMode, playClickSound }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    playClickSound()
    navigator.clipboard.writeText('vishnukaushikvarma@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 8vw' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
      >
        <h2 style={{ fontSize: 'clamp(2.8rem, 7vw, 4rem)', fontWeight: 900, marginBottom: '1rem', color: theme.textMain }}>
          Let's Connect
        </h2>
        <p style={{ color: theme.textMuted, fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '3rem', maxWidth: '600px' }}>
          Poughkeepsie, New York • (551) 297-5781 • vishnukaushikvarma@gmail.com
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <a
            href="mailto:vishnukaushikvarma@gmail.com"
            onClick={playClickSound}
            style={{
              background: '#ef4444',
              color: '#fff',
              padding: '1rem 2.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.35)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.35)'
            }}
          >
            Email Me
          </a>

          <button
            onClick={handleCopyEmail}
            style={{
              background: copied ? '#22c55e' : 'transparent',
              border: `2px solid ${copied ? '#22c55e' : '#38bdf8'}`,
              color: copied ? '#ffffff' : '#38bdf8',
              padding: '1rem 2.2rem',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = '#38bdf8'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#38bdf8'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
              }
            }}
          >
            {copied ? '✓ Email Copied!' : '📋 Copy Email'}
          </button>

          <a
            href="https://linkedin.com/in/vishnukaushikvarma"
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            style={{
              background: 'transparent',
              border: '2px solid #0284c7',
              color: '#0284c7',
              padding: '1rem 2.8rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0284c7'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(2, 132, 199, 0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#0284c7'
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      </motion.div>
    </section>
  )
}