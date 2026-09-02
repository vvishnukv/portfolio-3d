import React from 'react'
import { motion } from 'framer-motion'
import { experienceData } from '../data/portfolioData'

export default function ExperienceSection({ theme, isDarkMode }) {
  return (
    <section id="experience" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '3rem', color: '#ef4444' }}>
        Work Experience
      </motion.h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px' }}>
        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="interactive-card"
            style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '1.2rem', backdropFilter: 'blur(12px)', boxShadow: theme.cardShadow, transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.005)'
              e.currentTarget.style.borderColor = '#ef4444'
              e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(239, 68, 68, 0.12)' : '0 20px 40px rgba(239, 68, 68, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.boxShadow = theme.cardShadow
            }}
          >
            <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '0.4rem', color: theme.textMain, fontWeight: 700 }}>
              {exp.title}
            </h3>
            <h4 style={{ color: exp.color, fontSize: '1.05rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              {exp.company}
            </h4>
            <ul style={{ color: theme.textMuted, lineHeight: 1.7, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', margin: 0 }}>
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}