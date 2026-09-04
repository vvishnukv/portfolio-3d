import React, { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

export default function SpidermanCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 14, stiffness: 200 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  const [isClicking, setIsClicking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isWalking, setIsWalking] = useState(false)
  const [spiderRotation, setSpiderRotation] = useState(0)
  const [webs, setWebs] = useState([])
  const [grapplePoint, setGrapplePoint] = useState(null)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    let lastX = window.innerWidth / 2
    let lastY = window.innerHeight / 2
    let scrollTimeout = null

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)

      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
        setSpiderRotation(angle)
      }
      lastX = e.clientX
      lastY = e.clientY

      // Add trailing segment with individual timestamp
      const now = Date.now()
      const newWeb = { id: now + Math.random(), x1: lastX, y1: lastY, x2: e.clientX, y2: e.clientY, time: now }
      setWebs((prev) => [...prev.filter((w) => now - w.time < 2500), newWeb])
    }

    const handleScroll = () => {
      setIsWalking(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsWalking(false)
      }, 250)
    }

    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setWebs((prev) => prev.filter((w) => now - w.time < 2500))
    }, 300)

    const handleMouseDown = (e) => {
      setIsClicking(true)

      const isTargetClickable = 
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.interactive-card')

      if (isTargetClickable) {
        setGrapplePoint({ x: e.clientX, y: e.clientY })
        setTimeout(() => {
          setGrapplePoint(null)
        }, 180)
      } else {
        setGrapplePoint({ x: e.clientX, y: e.clientY })
      }

      const burst = Array.from({ length: 12 }).map(() => ({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 90 + 30,
      }))
      setParticles(burst)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      setTimeout(() => {
        setGrapplePoint(null)
      }, 300)
    }

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.interactive-card') ||
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      clearInterval(cleanupInterval)
      clearTimeout(scrollTimeout)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* SVG Canvas for Thicker Trailing Webs & Grapple Lines */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9998 }}>
        {/* Thicker Individual Trail Segments */}
        <AnimatePresence>
          {webs.map((w) => (
            <motion.line
              key={w.id}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              x1={w.x1}
              y1={w.y1}
              x2={w.x2}
              y2={w.y2}
              stroke="rgba(0, 212, 170, 0.7)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0, 212, 170, 0.6))' }}
            />
          ))}
        </AnimatePresence>

        {/* Thicker Active Grapple Web Line */}
        <AnimatePresence>
          {grapplePoint && (
            <motion.line
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              x1={cursorX.get() + 20}
              y1={cursorY.get() + 20}
              x2={grapplePoint.x}
              y2={grapplePoint.y}
              stroke="#00d4aa"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="6 3"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0, 212, 170, 0.8))' }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Click Impact Sparks */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.speed,
              y: p.y + Math.sin(p.angle) * p.speed,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              width: '6px',
              height: '6px',
              backgroundColor: Math.random() > 0.5 ? '#00d4aa' : '#0066ff',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 10000,
              boxShadow: '0 0 10px currentColor',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Crawling Spider Element */}
      <motion.div style={{ position: 'fixed', left: 0, top: 0, x, y, pointerEvents: 'none', zIndex: 9999 }}>
        
        {/* Spider-Sense Hover Aura */}
        {isHovered && (
          <motion.div
            animate={{ scale: [1, 1.7], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              width: '60px',
              height: '60px',
              border: '2px solid #00d4aa',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Spider Body with Scroll-Walking Scuttle Effect */}
        <motion.div
          animate={{
            rotate: spiderRotation + (isWalking ? [0, -12, 12, 0] : 0),
            scale: isClicking ? 0.85 : isHovered ? 1.4 : isWalking ? 1.15 : 1,
            y: isWalking ? [0, -3, 3, 0] : 0,
          }}
          transition={{
            rotate: { repeat: isWalking ? Infinity : 0, duration: 0.15 },
            y: { repeat: isWalking ? Infinity : 0, duration: 0.15 },
            type: 'spring',
            stiffness: 350,
            damping: 18,
          }}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 0 12px rgba(0, 212, 170, 0.85))',
          }}
        >
          {/* Vector Spider Icon — gradient cyan/blue */}
          <svg viewBox="0 0 24 24" width="38" height="38">
            <defs>
              <linearGradient id="spiderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4aa" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
            </defs>
            <path d="M3 3L10 10M21 3L14 10M3 21L10 14M21 21L14 14M2 11H9M15 11H22M2 13H9M15 13H22" stroke="url(#spiderGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <ellipse cx="12" cy="12" rx="4" ry="5" fill="url(#spiderGrad)" />
            <circle cx="12" cy="7" r="2.5" fill="#0a0e17" />
            <circle cx="11" cy="6.5" r="0.6" fill="#00d4aa" />
            <circle cx="13" cy="6.5" r="0.6" fill="#00d4aa" />
          </svg>
        </motion.div>

        {/* Grapple Target Anchor Effect */}
        <AnimatePresence>
          {grapplePoint && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                left: grapplePoint.x - 12,
                top: grapplePoint.y - 12,
                width: '24px',
                height: '24px',
                border: '2px solid #00d4aa',
                borderRadius: '50%',
                boxShadow: '0 0 12px #00d4aa',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}