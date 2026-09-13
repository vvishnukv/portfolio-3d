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
          const opacity = Math.max(0, 0.8 - (age / 500) * 0.4)
          const size = Math.max(3, 10 - (age / 500) * 5)
          return (
            <motion.div
              key={t.id}
              initial={{ opacity, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                left: t.x - size / 2,
                top: t.y - size / 2,
                width: size,
                height: size,
                borderRadius: '50%',
                background: theme.accent2,
                boxShadow: `0 0 ${size * 2.5}px ${theme.accent2}80`,
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
            width: isClicking ? 44 : isHovering ? 64 : 54,
            height: isClicking ? 44 : isHovering ? 64 : 54,
            borderColor: isHovering
              ? `${theme.accent2}`
              : isClicking
              ? `${theme.accent2}`
              : `${theme.accent2}50`,
            borderWidth: isHovering ? 2 : 1.5,
            opacity: isHovering ? 1 : 0.7,
            boxShadow: isHovering
              ? `0 0 20px ${theme.accent2}40, 0 0 40px ${theme.accent2}20`
              : isClicking
              ? `0 0 30px ${theme.accent2}50`
              : `0 0 12px ${theme.accent2}20`,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            border: 'none',
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
            width: isClicking ? 8 : isHovering ? 12 : 10,
            height: isClicking ? 8 : isHovering ? 12 : 10,
            background: isHovering ? theme.accent2 : isClicking ? theme.accent2 : theme.accent2,
            boxShadow: isHovering
              ? `0 0 16px ${theme.accent2}, 0 0 32px ${theme.accent2}60`
              : isClicking
              ? `0 0 12px ${theme.accent2}`
              : `0 0 8px ${theme.accent2}80`,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: theme.accent2,
            boxShadow: `0 0 12px ${theme.accent2}80`,
          }}
        />
      </motion.div>
    </>
  )
}
