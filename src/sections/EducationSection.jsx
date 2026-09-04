import React from 'react'
import { motion } from 'framer-motion'
import { educationData } from '../data/portfolioData'

export default function EducationSection({ theme, isDarkMode }) {
  return (
    <section
      id="education"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8vh 8vw',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="gradient-text"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: '2.5rem',
          letterSpacing: '-0.01em',
        }}
      >
        Education
      </motion.h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '900px',
        }}
      >
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="glass-card"
            style={{
              padding: '2.2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
              e.currentTarget.style.borderColor = theme.cardBorderFocus
              e.currentTarget.style.boxShadow = `${theme.cardGlow}, 0 12px 40px rgba(0,0,0,0.4)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.boxShadow = 'var(--shadow-card)'
            }}
          >
            {/* Left accent bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: `linear-gradient(180deg, ${theme.accent3}, ${theme.accent4})`,
                borderRadius: '0 2px 2px 0',
              }}
            />

            <div style={{ paddingLeft: '1.2rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.4rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.4rem',
                    color: theme.textMain,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {edu.institution}
                </h3>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: theme.accent3,
                    background: `linear-gradient(135deg, ${theme.accent3}15, ${theme.accent4}15)`,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    border: `1px solid ${theme.accent3}30`,
                  }}
                >
                  {edu.gpa}
                </span>
              </div>
              <h4
                style={{
                  color: theme.accent1,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '0.4rem',
                }}
              >
                {edu.degree}
              </h4>
              <p
                style={{
                  color: theme.textMuted,
                  fontSize: '0.9rem',
                  margin: 0,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.02em',
                }}
              >
                {edu.duration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
