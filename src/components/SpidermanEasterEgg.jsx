import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SpidermanEasterEgg() {
  const [unlocked, setUnlocked] = useState(false)
  const [typedKeys, setTypedKeys] = useState([])

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ]

  useEffect(() => {
    let timer = null

    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      
      setTypedKeys((prev) => {
        const nextKeys = [...prev, key].slice(-10)

        const isKonamiMatch = konamiCode.every((k, idx) => {
          return nextKeys[nextKeys.length - konamiCode.length + idx]?.toLowerCase() === k.toLowerCase()
        })

        const joinedString = nextKeys.join('').toLowerCase()
        const isSpiderMatch = joinedString.includes('spider')

        if (isKonamiMatch || isSpiderMatch) {
          setUnlocked(true)
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => setUnlocked(false), 7000)
          return []
        }

        return nextKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Courier New', monospace",
            color: '#fff',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Pulsing Radar Aura Background */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              border: '2px dashed rgba(239, 68, 68, 0.4)',
              boxShadow: '0 0 50px rgba(56, 189, 248, 0.2)',
              pointerEvents: 'none',
            }}
          />

          {/* Comic-Book Style Pop Box with Spring Entrance */}
          <motion.div
            initial={{ scale: 0.5, rotate: -10, y: 50 }}
            animate={{ scale: 1, rotate: [0, -1.5, 1.5, 0], y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'relative',
              border: '3px solid #ef4444',
              backgroundColor: '#090d16',
              padding: '3rem 2.5rem',
              borderRadius: '12px',
              boxShadow: '0 0 60px rgba(239, 68, 68, 0.5), inset 0 0 30px rgba(56, 189, 248, 0.2)',
              maxWidth: '520px',
              width: '100%',
            }}
          >
            {/* Floating Spider Icon Animation */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{ fontSize: '3.5rem', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 12px #ef4444)' }}
            >
              🕷️🕸️
            </motion.div>

            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '2px', marginBottom: '1rem', textTransform: 'uppercase', textShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}>
              Spider-Man Mode Unlocked!
            </h1>

            <p style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.8rem' }}>
              Secret developer sequence accepted! You've unlocked high-velocity web-slinging protocols across the portfolio interface.
            </p>

            {/* Glowing Achievement Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ef4444, #38bdf8)',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '25px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
              }}
            >
              🏆 Achievement Unlocked: Ultimate Web-Slinger
            </motion.div>
          </motion.div>

          {/* Interactive Return Button */}
          <motion.button
            whileHover={{ scale: 1.08, borderColor: '#ef4444', color: '#ef4444' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUnlocked(false)}
            style={{
              marginTop: '2.5rem',
              background: 'transparent',
              border: '2px solid #38bdf8',
              color: '#38bdf8',
              padding: '0.7rem 1.8rem',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)',
            }}
          >
            Resume Portfolio Browsing →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}