import React from 'react'
import { motion } from 'framer-motion'
import { experienceData } from '../data/portfolioData'
import { TiltCard, reveal3D } from '../utils/microInteractions'

export default function ExperienceSection({ theme, isDarkMode }) {
  return (
    <section
      id="experience"
      style={{
        minHeight: '100vh',
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
          marginBottom: '3rem',
          letterSpacing: '-0.01em',
        }}
      >
        Work Experience
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px' }}>
        {experienceData.map((exp, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal3D}
            custom={idx}
          >
            <TiltCard
              theme={theme}
              style={{
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                position: 'relative',
                overflow: 'hidden',
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
                background: `linear-gradient(180deg, ${theme.accent1}, ${theme.accent2})`,
                borderRadius: '0 2px 2px 0',
              }}
            />

            <div style={{ paddingLeft: '1.2rem' }}>
              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  marginBottom: '0.3rem',
                  color: theme.textMain,
                  fontWeight: 700,
                }}
              >
                {exp.title}
              </h3>

              <h4
                style={{
                  color: theme.accent1,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                {exp.company}
              </h4>

              <ul
                style={{
                  color: theme.textMuted,
                  lineHeight: 1.7,
                  paddingLeft: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  margin: 0,
                }}
              >
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '-1.2rem',
                        top: '0.6rem',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: theme.accent2,
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
