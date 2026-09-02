import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection({ theme }) {
  return (
    <section id="home" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.2rem', color: theme.textMain }}>
          Vishnu Kaushik Varma Vuddaraju
        </h1>
        <p style={{ color: '#0284c7', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 600, marginBottom: '1.2rem' }}>
          Software Engineer & IT Technical Specialist
        </p>
        <p style={{ color: theme.textMuted, fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '650px', lineHeight: 1.6 }}>
          M.S. Information Systems at Marist University (GPA: 3.845). Specializing in scalable software engineering, institutional LMS platform administration, containerized cloud data pipelines, intelligent AI solutions, and full-lifecycle cross-platform mobile applications.
        </p>
      </motion.div>
    </section>
  )
}