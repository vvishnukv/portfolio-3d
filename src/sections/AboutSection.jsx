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
            ? `radial-gradient(900px circle at 20% 30%, ${theme.accent1}08, transparent 55%),
               radial-gradient(700px circle at 80% 70%, ${theme.accent2}05, transparent 50%)`
            : `radial-gradient(800px circle at 15% 30%, ${theme.accent1}10, transparent 55%),
               radial-gradient(600px circle at 85% 70%, ${theme.accent2}08, transparent 50%)`,
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
                background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
                borderRadius: '2px',
              }}
            />
            About Me
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
            The story behind the code
          </motion.h2>
        </div>

        {/* Two-column grid */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 280px) 1fr',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .about-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          {/* Left: Identity card */}
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
                padding: '2.56rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                minHeight: '380px',
                boxSizing: 'border-box',
              }}
            >

              {/* Top section: photo + name + role */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                {/* Professional photo with gold ring — CENTERED */}
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                    padding: '3px',
                    boxShadow: `0 0 28px ${theme.accent1}50, 0 8px 20px rgba(0,0,0,0.4)`,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: isDarkMode ? '#18181b' : '#f4f4f5',
                      position: 'relative',
                    }}
                  >
                    <img
                      src="/vishnu-photo.png"
                      alt="Vishnu Kaushik Varma Vuddaraju"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>

                {/* Name + role */}
                <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
                  <div
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: theme.textMain,
                      marginBottom: '0.3rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Vishnu Vuddaraju
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: theme.accent1,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Software Engineer
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: '48px',
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${theme.accent1}60, transparent)`,
                    marginTop: '1.2rem',
                  }}
                />
              </div>

              {/* Bottom section: stats */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  width: '100%',
                  paddingBottom: '0.5rem',
                }}
              >
                {[
                  { v: '3.84', l: 'GPA', accent: theme.accent1 },
                  { v: '15+', l: 'Projects', accent: theme.accent2 },
                  { v: '2+', l: 'Years', accent: theme.accent3 },
                ].map(({ v, l, accent }) => (
                  <div
                    key={l}
                    style={{
                      flex: 1,
                      minWidth: '60px',
                      padding: '0.55rem 0.3rem',
                      borderRadius: '0.6rem',
                      background: `${accent}10`,
                      border: `1px solid ${accent}25`,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        color: accent,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: '0.58rem',
                        color: theme.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                        marginTop: '0.15rem',
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Right: Bio card */}
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
                minHeight: '380px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Decorative Cormorant quote mark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '0.4rem',
                  right: '1.4rem',
                  fontSize: '6rem',
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif',
                  color: theme.accent1,
                  opacity: isDarkMode ? 0.07 : 0.1,
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
                Based in <span style={{ color: theme.textMain, fontWeight: 600 }}>Poughkeepsie, NY</span>, I'm
                pursuing my{' '}
                <span style={{ color: theme.accent1, fontWeight: 600 }}>
                  M.S. in Information Systems
                </span>{' '}
                at <span style={{ color: theme.textMain, fontWeight: 600 }}>Marist University</span> (Dec 2026).
                Currently working as a Web Developer & LMS QA Tester, where I build dynamic
                software applications, engineer responsive websites, and integrate AI into
                high-performance systems — while serving 6,000+ students and faculty.
              </p>

              {/* Expertise tags */}
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
                  { label: 'Full-Stack Dev', color: theme.accent1 },
                  { label: 'LMS Admin', color: theme.accent2 },
                  { label: 'AI Integration', color: theme.accent3 },
                  { label: 'Mobile Apps', color: theme.accent4 },
                  { label: 'Cloud & DevOps', color: theme.accent1 },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: `${color}12`,
                      color: color,
                      border: `1px solid ${color}25`,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
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
