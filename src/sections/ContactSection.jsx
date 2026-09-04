import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton, MagneticLink } from '../utils/microInteractions'

export default function ContactSection({ theme, isDarkMode, playClickSound }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    playClickSound()
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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent1}15, transparent 70%)`,
          filter: 'blur(80px)',
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
        <h2
          className="gradient-text"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
            fontWeight: 800,
            marginBottom: '1.2rem',
            letterSpacing: '-0.02em',
          }}
        >
          Let's Connect
        </h2>

        <p
          style={{
            color: theme.textMuted,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '3rem',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Poughkeepsie, New York &bull; (551) 297-5781 &bull; vishnukaushikvarma@gmail.com
        </p>

        <div
          className="contact-buttons"
          style={{
            display: 'flex',
            gap: '1.5rem',
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
              background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
              color: '#fff',
              padding: '1rem 2.8rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: `0 4px 20px ${theme.accent1}50`,
              transition: 'box-shadow 0.25s ease',
              display: 'inline-block',
            }}
          >
            Email Me
          </MagneticLink>

          <MagneticButton
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: copied
                ? `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`
                : 'transparent',
              border: `2px solid ${copied ? 'transparent' : theme.accent1}`,
              color: copied ? '#fff' : theme.accent1,
              padding: '1rem 2.2rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.25s ease',
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Email'}
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
              border: `2px solid ${theme.accent2}`,
              color: theme.accent2,
              padding: '1rem 2.8rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
          >
            LinkedIn ↗
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
              border: `2px solid ${theme.accent4}`,
              color: theme.accent4,
              padding: '1rem 2.8rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
          >
            GitHub ↗
          </MagneticLink>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '4rem',
            color: theme.textMuted,
            fontSize: '0.85rem',
            opacity: 0.6,
          }}
        >
          Built with React + Three.js + Framer Motion &bull; 2024
        </motion.p>
      </motion.div>
    </section>
  )
}
