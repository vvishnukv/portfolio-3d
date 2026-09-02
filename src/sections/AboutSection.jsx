import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection({ theme, isDarkMode }) {
  return (
    <section id="about" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem', color: '#0284c7' }}>
        About Me
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="interactive-card"
        style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1.2rem', backdropFilter: 'blur(12px)', maxWidth: '900px', boxShadow: theme.cardShadow, transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)'
          e.currentTarget.style.borderColor = '#0284c7'
          e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(2, 132, 199, 0.15)' : '0 20px 40px rgba(2, 132, 199, 0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.borderColor = theme.cardBorder
          e.currentTarget.style.boxShadow = theme.cardShadow
        }}
      >
        <p style={{ color: theme.textMuted, fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.8, margin: 0 }}>
          I live in New York and am pursuing my M.S. in Information Systems at Marist University, with an expected graduation in December 2026. Currently, I work as a Web Developer and LMS QA tester at Marist University. Beyond enterprise platform administration, I build dynamic software applications, create robust Android and iOS mobile apps, engineer responsive websites, and seamlessly integrate machine learning solutions into high performance backend architectures.
        </p>
      </motion.div>
    </section>
  )
}