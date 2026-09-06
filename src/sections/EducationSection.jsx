import React from 'react'
import { motion } from 'framer-motion'
import { educationData } from '../data/portfolioData'
import { TiltCard, reveal3D } from '../utils/microInteractions'

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
      <div style={{ marginBottom: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: theme.accent1,
            marginBottom: '0.75rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1.5px',
              background: 'linear-gradient(90deg, var(--gold), var(--teal))',
              borderRadius: '2px',
            }}
          />
          Academic Background
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-heading shimmer-text"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Education
        </motion.h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
        }}
      >
        {educationData.map((edu, idx) => (
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
                padding: '2rem 2.2rem',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '200px',
              }}
            >
              {/* Top gold accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.2rem',
                }}
              >
                {/* Icon block */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    flexShrink: 0,
                    borderRadius: '0.8rem',
                    background: 'linear-gradient(135deg, ' + theme.accent1 + '25, ' + theme.accent2 + '25)',
                    border: '1px solid ' + theme.accent1 + '30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                  }}
                >
                  🎓
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      color: theme.textMain,
                      fontWeight: 700,
                      margin: '0 0 0.3rem 0',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <h4
                    style={{
                      color: theme.accent1,
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      marginBottom: '0.6rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: theme.accent2,
                        background: theme.accent2 + '12',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '999px',
                        border: '1px solid ' + theme.accent2 + '30',
                      }}
                    >
                      {edu.gpa}
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        color: theme.textMuted,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {edu.duration}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
