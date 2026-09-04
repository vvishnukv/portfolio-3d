import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ProjectModal — click-to-expand spring morph modal
 *
 * Props:
 *  - project:    the project object to display
 *  - theme:      theme palette (accent1..4, textMain, textMuted, cardBorder, etc.)
 *  - isDarkMode: boolean
 *  - onClose:    () => void
 *  - originRect: { x, y, width, height } — bounding rect of the source card
 */
export default function ProjectModal({ project, theme, isDarkMode, onClose, originRect }) {
  const modalRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  if (!project) return null

  const techList = (project.tech || '').split('•').map((t) => t.trim()).filter(Boolean)

  // Origin-driven initial position so the card morphs into the modal
  const initialX = originRect ? originRect.x : 0
  const initialY = originRect ? originRect.y : 0
  const initialW = originRect ? originRect.width : 320
  const initialH = originRect ? originRect.height : 220

  return (
    <AnimatePresence>
      <motion.div
        key="modal-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <motion.div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          initial={{
            x: initialX - window.innerWidth / 2 + initialW / 2,
            y: initialY - window.innerHeight / 2 + initialH / 2,
            width: initialW,
            height: 'auto',
            scale: 0.95,
            opacity: 0.5,
            borderRadius: '1.5rem',
          }}
          animate={{
            x: 0,
            y: 0,
            width: 'min(720px, 92vw)',
            height: 'auto',
            scale: 1,
            opacity: 1,
            borderRadius: '1.5rem',
          }}
          exit={{
            x: initialX - window.innerWidth / 2 + initialW / 2,
            y: initialY - window.innerHeight / 2 + initialH / 2,
            width: initialW,
            scale: 0.95,
            opacity: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 26,
            mass: 0.9,
          }}
          style={{
            position: 'relative',
            maxHeight: '88vh',
            overflowY: 'auto',
            background: isDarkMode ? 'rgba(15, 19, 28, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${theme.cardBorderFocus}`,
            boxShadow: `0 30px 90px rgba(0, 0, 0, 0.5), 0 0 60px ${theme.accent1}30`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            color: theme.textMain,
            fontFamily: 'var(--font-display)',
          }}
        >
          {/* Top gradient bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '3px',
              background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2}, ${theme.accent3})`,
              transformOrigin: 'left',
            }}
          />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
            }}
          >
            ✕
          </motion.button>

          <div style={{ padding: '2.2rem 2.4rem' }}>
            {/* Title with stagger reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: 'clamp(1.4rem, 3.4vw, 1.9rem)',
                fontWeight: 800,
                margin: 0,
                marginBottom: '0.5rem',
                paddingRight: '3rem',
                lineHeight: 1.25,
                color: theme.textMain,
              }}
            >
              {project.title}
            </motion.h2>

            {/* Tech pills */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
              }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '1rem 0 1.5rem' }}
            >
              {techList.map((t, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.85 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 260, damping: 20 },
                    },
                  }}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    background: `linear-gradient(135deg, ${theme.accent1}18, ${theme.accent2}18)`,
                    color: theme.accent1,
                    border: `1px solid ${theme.accent1}30`,
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            {/* Description with reveal */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              style={{
                color: theme.textMuted,
                fontSize: '1rem',
                lineHeight: 1.75,
                margin: 0,
                marginBottom: '1.8rem',
              }}
            >
              {project.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
              }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}
            >
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } },
                }}
                href={project.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.7rem 1.6rem',
                  borderRadius: '999px',
                  background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: `0 6px 24px ${theme.accent1}50`,
                }}
              >
                View Code ↗
              </motion.a>

              {project.tableau && (
                <motion.a
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } },
                  }}
                  href={project.tableau}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '0.7rem 1.6rem',
                    borderRadius: '999px',
                    background: `linear-gradient(135deg, ${theme.accent3}, ${theme.accent4})`,
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: `0 6px 24px ${theme.accent3}50`,
                  }}
                >
                  View Dashboard ↗
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
