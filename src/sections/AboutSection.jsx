import React from 'react'
import { motion } from 'framer-motion'
import { TiltCard, reveal3D } from '../utils/microInteractions'

export default function AboutSection({ theme, isDarkMode }) {
  return (
    <section
      id="about"
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10vh 8vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient mesh background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: isDarkMode
            ? `radial-gradient(800px circle at 15% 30%, ${theme.accent1}10, transparent 50%),
               radial-gradient(600px circle at 85% 70%, ${theme.accent2}08, transparent 50%)`
            : `radial-gradient(700px circle at 10% 30%, ${theme.accent1}14, transparent 55%),
               radial-gradient(600px circle at 90% 70%, ${theme.accent2}10, transparent 55%)`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
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
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme.textMuted,
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                width: '20px',
                height: '1.5px',
                background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
                borderRadius: '2px',
              }}
            />
            Get to know me
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gradient-text"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            About Me
          </motion.h2>
        </div>

        {/* Two-column grid: identity card on left, bio on right */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 280px) 1fr',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Identity card — clean, minimal, breathing room */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal3D}
            custom={0}
          >
            <TiltCard
              theme={theme}
              style={{
                padding: '2.2rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                minHeight: '360px',
                boxSizing: 'border-box',
              }}
            >
              {/* Avatar — single focused element with subtle glow */}
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: isDarkMode
                    ? `linear-gradient(135deg, ${theme.accent1}55, ${theme.accent2}55)`
                    : `linear-gradient(135deg, ${theme.accent1}75, ${theme.accent2}75)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  color: isDarkMode ? theme.textMain : '#fff',
                  letterSpacing: '-0.02em',
                  boxShadow: isDarkMode
                    ? `0 6px 20px ${theme.accent1}40, inset 0 0 0 2px ${theme.accent1}30`
                    : `0 6px 20px ${theme.accent1}35, inset 0 0 0 2px rgba(255,255,255,0.5)`,
                  flexShrink: 0,
                }}
              >
                VK
              </div>

              {/* Name + role — clean typography stack */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: theme.textMain,
                    marginBottom: '0.2rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Vishnu Vuddaraju
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: theme.textMuted,
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Software Engineer
                </div>
              </div>

              {/* Thin gradient divider */}
              <div
                style={{
                  width: '48px',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${theme.accent1}60, transparent)`,
                }}
              />

              {/* Stats — pushed to bottom with margin-top: auto */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginTop: 'auto',
                  width: '100%',
                }}
              >
                {[
                  { v: '3.84', l: 'GPA' },
                  { v: '15+', l: 'Projects' },
                  { v: '2+', l: 'Years' },
                ].map(({ v, l }) => (
                  <div
                    key={l}
                    style={{
                      flex: 1,
                      minWidth: '60px',
                      padding: '0.5rem 0.3rem',
                      borderRadius: '0.6rem',
                      background: isDarkMode
                        ? `${theme.accent1}10`
                        : `${theme.accent1}14`,
                      border: `1px solid ${isDarkMode ? theme.accent1 + '25' : theme.accent1 + '35'}`,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: theme.accent1,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: '0.6rem',
                        color: theme.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 600,
                        marginTop: '0.1rem',
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Right: Bio card — matches left card height exactly */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal3D}
            custom={1}
          >
            <TiltCard
              theme={theme}
              style={{
                padding: '2.2rem 2.4rem',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                minHeight: '360px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Decorative quote mark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '0.6rem',
                  right: '1.4rem',
                  fontSize: '5.5rem',
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif',
                  color: theme.accent1,
                  opacity: isDarkMode ? 0.08 : 0.12,
                  fontWeight: 700,
                  userSelect: 'none',
                }}
              >
                "
              </div>

              <p
                style={{
                  color: theme.textMuted,
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                  lineHeight: 1.9,
                  margin: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                I live in{' '}
                <span style={{ color: theme.textMain, fontWeight: 600 }}>New York</span>{' '}
                and am pursuing my{' '}
                <span style={{ color: theme.accent1, fontWeight: 600 }}>
                  M.S. in Information Systems
                </span>{' '}
                at Marist University, expected graduation in{' '}
                <span style={{ color: theme.textMain, fontWeight: 600 }}>December 2026</span>.
                Currently working as a Web Developer and LMS QA tester at Marist University.
                I build dynamic software applications, create robust Android and iOS mobile apps,
                engineer responsive websites, and integrate machine learning into high-performance
                backend architectures.
              </p>

              {/* Bottom tag row */}
              <div
                style={{
                  marginTop: '1.6rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {[
                  'Full-Stack Dev',
                  'LMS Admin',
                  'AI Integration',
                  'Mobile Apps',
                  'Cloud & DevOps',
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '999px',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      background: isDarkMode
                        ? `${theme.accent1}14`
                        : `${theme.accent1}16`,
                      color: theme.accent1,
                      border: `1px solid ${isDarkMode ? theme.accent1 + '28' : theme.accent1 + '40'}`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
