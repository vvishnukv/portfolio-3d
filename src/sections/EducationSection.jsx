import React from 'react'
import { motion } from 'framer-motion'
import { educationData } from '../data/portfolioData'

export default function EducationSection({ theme, isDarkMode }) {
  return (
    <section id="education" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#ef4444' }}>
        Education
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px' }}>
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="interactive-card"
            style={{
              background: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              padding: '2.2rem',
              borderRadius: '1.2rem',
              backdropFilter: 'blur(12px)',
              boxShadow: theme.cardShadow,
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
              e.currentTarget.style.borderColor = '#ef4444'
              e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(239, 68, 68, 0.12)' : '0 20px 40px rgba(239, 68, 68, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.boxShadow = theme.cardShadow
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: theme.textMain, fontWeight: 700, margin: 0 }}>
                {edu.institution}
              </h3>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ef4444',
                backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                {edu.gpa}
              </span>
            </div>
            <h4 style={{ color: '#0284c7', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              {edu.degree}
            </h4>
            <p style={{ color: theme.textMuted, fontSize: '0.9rem', margin: 0 }}>
              {edu.duration}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}