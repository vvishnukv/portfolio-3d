import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton, MagneticLink } from '../utils/microInteractions'

export default function ContactSection({ theme, isDarkMode, playClickSound }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    playClickSound && playClickSound()
    navigator.clipboard.writeText('vishnukaushikvarma@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 8vw',
        position: 'relative',
      }}
    >
      {/* Ambient gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, ' + theme.accent1 + '18, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
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
            marginBottom: '1rem',
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
          Get in Touch
        </motion.div>

        <h2
          className="display-heading shimmer-text"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
            fontWeight: 700,
            marginBottom: '1.2rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Let&apos;s Build Something Great
        </h2>

        <p
          style={{
            color: theme.textMuted,
            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
            marginBottom: '0.6rem',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Poughkeepsie, New York &nbsp;·&nbsp; (551) 297-5781
        </p>
        <p
          style={{
            color: theme.textMuted,
            fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
            marginBottom: '3rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.02em',
          }}
        >
          vishnukaushikvarma@gmail.com
        </p>

        <div
          className="contact-buttons"
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MagneticLink
            href="mailto:vishnukaushikvarma@gmail.com"
            onClick={playClickSound}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
              color: isDarkMode ? '#09090b' : '#fafaf8',
              padding: '1rem 2.5rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 8px 24px ' + theme.accent1 + '40',
              transition: 'box-shadow 0.25s ease',
              display: 'inline-block',
              letterSpacing: '0.02em',
            }}
          >
            Send Email
          </MagneticLink>

          <MagneticButton
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: copied
                ? 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')'
                : 'transparent',
              border: '2px solid ' + (copied ? 'transparent' : theme.accent1),
              color: copied ? (isDarkMode ? '#09090b' : '#fafaf8') : theme.accent1,
              padding: '1rem 2rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'all 0.25s ease',
              letterSpacing: '0.02em',
            }}
          >
            {copied ? '✓ Copied!' : 'Copy Email'}
          </MagneticButton>

          <MagneticLink
            href="https://linkedin.com/in/vishnukaushikvarma"
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'transparent',
              border: '2px solid ' + theme.accent2,
              color: theme.accent2,
              padding: '1rem 2.5rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'all 0.25s ease',
              display: 'inline-block',
              letterSpacing: '0.02em',
            }}
          >
            LinkedIn
          </MagneticLink>

          <MagneticLink
            href="https://github.com/vvishnukv"
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'transparent',
              border: '2px solid ' + theme.accent3,
              color: theme.accent3,
              padding: '1rem 2.5rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'all 0.25s ease',
              display: 'inline-block',
              letterSpacing: '0.02em',
            }}
          >
            GitHub
          </MagneticLink>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '5rem',
            color: theme.textMuted,
            fontSize: '0.8rem',
            opacity: 0.7,
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Designed &amp; built with React, Three.js &amp; Framer Motion
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '0.5rem',
            color: theme.textMuted,
            fontSize: '0.75rem',
            opacity: 0.5,
            fontFamily: 'var(--font-mono)',
          }}
        >
          © 2024 Vishnu Vuddaraju · All rights reserved
        </motion.p>
      </motion.div>
    </section>
  )
}
