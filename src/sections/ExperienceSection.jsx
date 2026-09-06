import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experienceData } from '../data/portfolioData'

export default function ExperienceSection({ theme, isDarkMode }) {
  const [expandedIdx, setExpandedIdx] = useState(0)

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
          Career Journey
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
          Where I have made an impact
        </motion.h2>
      </div>

      <div className="timeline">
        {experienceData.map((exp, idx) => {
          const isExpanded = expandedIdx === idx
          return (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.div
                className="glass-card"
                onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                whileHover={{ x: 4 }}
                style={{
                  padding: '1.8rem 2rem',
                  cursor: 'pointer',
                  background: theme.cardBg,
                  border: '1px solid ' + (isExpanded ? theme.cardBorderFocus : theme.cardBorder),
                  boxShadow: isExpanded
                    ? '0 8px 32px rgba(0,0,0,0.4), 0 0 24px ' + theme.accent1 + '15'
                    : theme.cardShadow,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: theme.textMain,
                        margin: '0 0 0.3rem 0',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                      }}
                    >
                      {exp.title}
                    </h3>
                    <div
                      style={{
                        color: theme.accent1,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '999px',
                      background: idx === 0 ? theme.accent1 + '15' : theme.accent2 + '10',
                      border: '1px solid ' + (idx === 0 ? theme.accent1 + '30' : theme.accent2 + '25'),
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: idx === 0 ? theme.accent1 : theme.accent2,
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: idx === 0 ? theme.accent1 : theme.accent2,
                        boxShadow: '0 0 8px ' + (idx === 0 ? theme.accent1 : theme.accent2),
                      }}
                    />
                    {idx === 0 ? 'CURRENT' : 'PREVIOUS'}
                  </div>
                </div>

                <div style={{ marginTop: '1rem', color: theme.textMuted, fontSize: '0.9rem', lineHeight: 1.75 }}>
                  {exp.bullets.slice(0, 2).map((b, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: theme.accent1, fontWeight: 700, flexShrink: 0 }}>→</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {isExpanded && exp.bullets.length > 2 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          marginTop: '0.8rem',
                          paddingTop: '0.8rem',
                          borderTop: '1px solid ' + theme.cardBorder,
                          color: theme.textMuted,
                          fontSize: '0.9rem',
                          lineHeight: 1.75,
                        }}
                      >
                        {exp.bullets.slice(2).map((b, i) => (
                          <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.4rem' }}>
                            <span style={{ color: theme.accent2, fontWeight: 700, flexShrink: 0 }}>→</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {exp.bullets.length > 2 && (
                  <div
                    style={{
                      marginTop: '0.8rem',
                      fontSize: '0.72rem',
                      color: theme.accent1,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    {isExpanded ? 'Show less' : 'Show ' + (exp.bullets.length - 2) + ' more'}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: 'inline-block', fontSize: '0.6rem' }}
                    >
                      ▼
                    </motion.span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
