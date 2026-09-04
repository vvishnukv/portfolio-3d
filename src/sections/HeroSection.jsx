import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CountUp } from '../utils/microInteractions'

export default function HeroSection({ theme }) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, 60])
  const y2 = useTransform(scrollY, [0, 800], [0, -45])
  const y3 = useTransform(scrollY, [0, 800], [0, 30])

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
      <motion.div
        className="floating-orb orb-1"
        style={{ y: y1 }}
      />
      <motion.div
        className="floating-orb orb-2"
        style={{ y: y2 }}
      />
      <motion.div
        className="floating-orb orb-3"
        style={{ y: y3 }}
      />

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
            fontSize: '0.85rem',
            fontWeight: 500,
            color: theme.textMuted,
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
          Available for new opportunities
        </motion.div>

        {/* Gradient headline */}
        <h1
          className="gradient-text"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-display)',
          }}
        >
          Vishnu Kaushik Varma Vuddaraju
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: theme.textMain,
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            fontWeight: 600,
            marginBottom: '1.2rem',
            letterSpacing: '0.01em',
          }}
        >
          Software Engineer & IT Technical Specialist
        </p>

        {/* Bio paragraph */}
        <p
          style={{
            color: theme.textMuted,
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            maxWidth: '720px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          M.S. Information Systems at Marist University (GPA: 3.845). Specializing in scalable software
          engineering, institutional LMS platform administration, containerized cloud data pipelines,
          intelligent AI solutions, and full-lifecycle cross-platform mobile applications.
        </p>

        {/* Animated gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '3px',
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
            { label: 'GPA', value: '3.845', accent: theme.accent1, decimals: 3 },
            { label: 'Projects', value: '15', accent: theme.accent2, suffix: '+' },
            { label: 'Experience', value: '2', accent: theme.accent3, suffix: '+ yrs' },
            { label: 'Users Served', value: '10', accent: theme.accent4, suffix: 'K+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              style={{
                padding: '0.8rem 1.4rem',
                borderRadius: '1rem',
                background: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                backdropFilter: 'blur(16px)',
                minWidth: '120px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = stat.accent
                e.currentTarget.style.boxShadow = isDarkMode
                  ? `0 0 16px ${stat.accent}30`
                  : `0 4px 16px rgba(0,0,0,0.1)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = theme.cardBorder
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: stat.accent,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                }}
              >
                {i === 0 ? (
                  <CountUp value={3.845} decimals={3} suffix="" prefix="" />
                ) : i === 2 ? (
                  <><CountUp value={2} suffix="+" /><span style={{ fontSize: '1rem' }}> yrs</span></>
                ) : i === 3 ? (
                  <><CountUp value={10} suffix="K+" /><span style={{ fontSize: '1rem' }}></span></>
                ) : (
                  <CountUp value={15} suffix="+" />
                )}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: theme.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '3rem',
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
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
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
