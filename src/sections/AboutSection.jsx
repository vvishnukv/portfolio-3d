import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection({ theme, isDarkMode }) {
  return (
    <section
      id="about"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8vh 8vw',
        position: 'relative',
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
        About Me
      </motion.h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '1.5rem',
            background: `linear-gradient(135deg, ${theme.accent1}30, ${theme.accent2}30)`,
            border: `2px solid transparent`,
            backgroundClip: 'padding-box',
            position: 'relative',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            fontWeight: 800,
            color: theme.accent1,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 0 40px ${theme.accent1}20`,
          }}
        >
          {/* Gradient border effect */}
          <div
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '1.6rem',
              background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2}, ${theme.accent3})`,
              zIndex: -1,
            }}
          />
          VK
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card"
          style={{
            flex: 1,
            minWidth: '300px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
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
          {/* Accent line at top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
              borderRadius: '0 0 0 0',
            }}
          />

          <p
            style={{
              color: theme.textMuted,
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            I live in New York and am pursuing my M.S. in Information Systems at Marist University, with an
            expected graduation in December 2026. Currently, I work as a Web Developer and LMS QA tester at
            Marist University. Beyond enterprise platform administration, I build dynamic software applications,
            create robust Android and iOS mobile apps, engineer responsive websites, and seamlessly integrate
            machine learning solutions into high performance backend architectures.
          </p>

          {/* Quick facts */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            {[
              'Full-Stack Development',
              'LMS Administration',
              'AI Integration',
              'Mobile Apps',
              'Cloud & DevOps',
            ].map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.accent1}15, ${theme.accent2}15)`,
                  color: theme.accent1,
                  border: `1px solid ${theme.accent1}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
