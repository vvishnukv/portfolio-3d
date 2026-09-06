import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CountUp } from '../utils/microInteractions'
import TypingEffect from '../components/TypingEffect'

const ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'Mobile App Builder',
  'LMS Specialist',
  'Cloud Architect',
  'AI Integrator',
]

export default function HeroSection({ theme }) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, 60])
  const y2 = useTransform(scrollY, [0, 800], [0, -45])
  const y3 = useTransform(scrollY, [0, 800], [0, 30])

  const headlineLetters = 'Vishnu Kaushik Varma'.split('')

  return (
    <section
      id="home"
      style={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 8vw',
        overflow: 'hidden',
      }}
    >
      {/* Parallax floating atmospheric orbs */}
      <motion.div className="floating-orb orb-1" style={{ y: y1 }} />
      <motion.div className="floating-orb orb-2" style={{ y: y2 }} />
      <motion.div className="floating-orb orb-3" style={{ y: y3 }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Greeting pill */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            border: `1px solid ${theme.cardBorder}`,
            background: theme.cardBg,
            backdropFilter: 'blur(12px)',
            marginBottom: '1.5rem',
            fontSize: '0.78rem',
            fontWeight: 500,
            color: theme.textMuted,
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: theme.accent1,
              boxShadow: `0 0 12px ${theme.accent1}`,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          Available for new opportunities · NYC
        </motion.div>

        {/* Cormorant Display Headline */}
        <h1
          className="display-heading shimmer-text"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            marginBottom: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {headlineLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle with Typing Effect */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.2rem',
          }}
        >
          <span
            style={{
              color: theme.textMuted,
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            I'm a
          </span>
          <span
            style={{
              color: theme.accent1,
              fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
              fontWeight: 700,
              fontFamily: 'var(--font-body)',
              minHeight: '1.5em',
              display: 'inline-block',
            }}
          >
            <TypingEffect texts={ROLES} />
          </span>
        </div>

        {/* Bio paragraph */}
        <p
          style={{
            color: theme.textMuted,
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            maxWidth: '720px',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          M.S. Information Systems at <span style={{ color: theme.textMain, fontWeight: 600 }}>Marist University</span> (GPA 3.84).
          I engineer <span style={{ color: theme.textMain, fontWeight: 600 }}>scalable software</span>, build institutional
          <span style={{ color: theme.textMain, fontWeight: 600 }}> LMS platforms</span>, deploy containerized cloud pipelines,
          ship <span style={{ color: theme.textMain, fontWeight: 600 }}>cross-platform mobile apps</span>, and integrate
          <span style={{ color: theme.accent1, fontWeight: 600 }}> AI</span> into real products.
        </p>

        {/* Animated gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '2px',
            background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
            borderRadius: '999px',
            marginBottom: '2.5rem',
            transformOrigin: 'left',
            boxShadow: `0 0 16px ${theme.accent1}80`,
          }}
        />

        {/* Stats row with CountUp */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {[
            { label: 'GPA', value: '3.84', accent: theme.accent1, decimals: 2, prefix: '' },
            { label: 'Projects Shipped', value: '15', accent: theme.accent2, suffix: '+' },
            { label: 'Years of XP', value: '2', accent: theme.accent3, suffix: '+' },
            { label: 'Users Served', value: '10', accent: theme.accent4, suffix: 'K+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -4, borderColor: stat.accent, boxShadow: `0 8px 24px ${stat.accent}30` }}
              className="glass-card"
              style={{
                padding: '1rem 1.5rem',
                background: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                backdropFilter: 'blur(16px)',
                minWidth: '130px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  fontSize: '1.7rem',
                  fontWeight: 800,
                  color: stat.accent,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {i === 0 ? (
                  <CountUp value={3.84} decimals={2} />
                ) : i === 2 ? (
                  <><CountUp value={2} suffix="+" /><span style={{ fontSize: '1.1rem' }}> yrs</span></>
                ) : i === 3 ? (
                  <><CountUp value={10} suffix="K+" /></>
                ) : (
                  <CountUp value={15} suffix="+" />
                )}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: theme.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  marginTop: '0.2rem',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '999px',
              background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
              color: '#09090b',
              fontSize: '0.9rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: `0 8px 24px ${theme.accent1}40`,
              letterSpacing: '0.02em',
            }}
          >
            View My Work →
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '999px',
              background: 'transparent',
              border: `1.5px solid ${theme.accent1}`,
              color: theme.accent1,
              fontSize: '0.9rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: theme.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontWeight: 600,
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: `linear-gradient(180deg, ${theme.accent1}, transparent)`,
          }}
        />
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }
      `}</style>
    </section>
  )
}
