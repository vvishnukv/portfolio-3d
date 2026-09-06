import React, { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

export default function PremiumCursor({ theme }) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Dot: follows exactly
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 600 })
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 600 })

  // Ring: follows with smooth lag for elegant trailing effect
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 180 })
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 180 })

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trails, setTrails] = useState([])

  useEffect(() => {
    // Hide cursor on touch devices
    if ('ontouchstart' in window) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 5)
      cursorY.set(e.clientY - 5)

      // Add trail point
      const now = Date.now()
      setTrails((prev) => [
        ...prev.filter((t) => now - t.time < 400),
        { id: now + Math.random(), x: e.clientX, y: e.clientY, time: now },
      ])
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHover = (e) => {
      const isInteractive =
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('[role="button"]') ||
        e.target.classList.contains('glass-card')
      setIsHovering(!!isInteractive)
    }

    // Cleanup trails periodically
    const interval = setInterval(() => {
      const now = Date.now()
      setTrails((prev) => prev.filter((t) => now - t.time < 400))
    }, 80)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleHover)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Trailing glow particles */}
      <AnimatePresence>
        {trails.map((t, i) => {
          const age = Date.now() - t.time
          const opacity = Math.max(0, 0.5 - (age / 400) * 0.5)
          const size = Math.max(2, 6 - (age / 400) * 4)
          return (
            <motion.div
              key={t.id}
              initial={{ opacity, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: t.x - size / 2,
                top: t.y - size / 2,
                width: size,
                height: size,
                borderRadius: '50%',
                background: theme.accent1,
                boxShadow: `0 0 ${size * 2}px ${theme.accent1}60`,
                pointerEvents: 'none',
                zIndex: 9998,
              }}
            />
          )
        })}
      </AnimatePresence>

      {/* Outer ring — smooth lag */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 36 : isHovering ? 52 : 44,
            height: isClicking ? 36 : isHovering ? 52 : 44,
            borderColor: isHovering
              ? `${theme.accent1}`
              : isClicking
              ? `${theme.accent2}`
              : `${theme.accent1}50`,
            borderWidth: isHovering ? 2 : 1.5,
            opacity: isHovering ? 1 : 0.7,
            boxShadow: isHovering
              ? `0 0 20px ${theme.accent1}40, 0 0 40px ${theme.accent1}20`
              : isClicking
              ? `0 0 30px ${theme.accent2}50`
              : `0 0 12px ${theme.accent1}20`,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: `1.5px solid ${theme.accent1}50`,
            background: 'transparent',
          }}
        />
      </motion.div>

      {/* Inner dot — precise cursor */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 6 : isHovering ? 10 : 8,
            height: isClicking ? 6 : isHovering ? 10 : 8,
            background: isHovering ? theme.accent1 : isClicking ? theme.accent2 : theme.accent1,
            boxShadow: isHovering
              ? `0 0 16px ${theme.accent1}, 0 0 32px ${theme.accent1}60`
              : isClicking
              ? `0 0 12px ${theme.accent2}`
              : `0 0 8px ${theme.accent1}80`,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: theme.accent1,
            boxShadow: `0 0 8px ${theme.accent1}80`,
          }}
        />
      </motion.div>
    </>
  )
}
