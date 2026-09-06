import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function TiltPhotoCard({ theme, isDarkMode }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Mouse-tracked 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring-smoothed values
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 })

  // Parallax layers (different speeds)
  const bgX = useTransform(mouseX, [-0.5, 0.5], [-12, 12])
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-8, 8])
  const imgX = useTransform(mouseX, [-0.5, 0.5], [-6, 6])
  const imgY = useTransform(mouseY, [-0.5, 0.5], [-4, 4])
  const glowX = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const glowY = useTransform(mouseY, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer floating wrapper - subtle Y-axis bob */}
      <motion.div
        animate={{ y: hovered ? 0 : [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        {/* Ambient glow that follows cursor */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            x: glowX,
            y: glowY,
            translateX: '-50%',
            translateY: '-50%',
            width: '120%',
            height: '120%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, ' + theme.accent1 + '15, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: hovered ? 0.7 : 0.4,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Subtle ambient ring (very soft, no harsh border) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            right: '-10%',
            bottom: '-10%',
            borderRadius: '24px',
            border: '1px solid ' + theme.accent1 + '12',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Smooth card with parallax bg layer - NO BORDER */}
        <motion.div
          style={{
            position: 'relative',
            x: bgX,
            y: bgY,
            borderRadius: '24px',
            overflow: 'hidden',
            background: theme.bgCard,
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.5), 0 0 60px ' +
              theme.accent1 +
              '15',
            zIndex: 2,
          }}
        >
          {/* Inner card body */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              width: '300px',
              height: '420px',
            }}
          >
            {/* Photo with parallax */}
            <motion.img
              src="/vishnu-photo.png"
              alt="Vishnu Kaushik Varma Vuddaraju"
              style={{
                x: imgX,
                y: imgY,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 14%',
                display: 'block',
                filter: hovered
                  ? 'brightness(1.05) contrast(1.05)'
                  : 'brightness(1) contrast(1)',
                transition: 'filter 0.5s ease',
              }}
              draggable={false}
            />

            {/* Subtle dark gradient overlay at bottom for caption */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background:
                  isDarkMode
                    ? 'linear-gradient(to top, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.4) 40%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.4) 40%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Floating caption */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                color: theme.textMain,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: theme.accent1,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  color: theme.textMain,
                }}
              >
                Vishnu Kaushik Varma Vuddaraju
              </div>
            </div>

            {/* Status badge top-right */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.7rem',
                borderRadius: '999px',
                background: theme.cardBg,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${theme.accent1}30`,
                fontSize: '0.65rem',
                fontWeight: 700,
                color: theme.accent1,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                zIndex: 3,
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: theme.accent1,
                  boxShadow: '0 0 8px ' + theme.accent1,
                }}
              />
              Open to work
            </div>
          </div>
        </motion.div>

        {/* Floating particles — soft, subtle glow */}
        {[
          { top: '5%', right: '-8%', size: 8, color: theme.accent1, delay: 0 },
          { bottom: '15%', left: '-10%', size: 6, color: theme.accent2, delay: 1 },
          { top: '45%', right: '-12%', size: 5, color: theme.accent3, delay: 2 },
          { bottom: '8%', right: '8%', size: 4, color: theme.accent1, delay: 0.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              top: p.top,
              right: p.right,
              bottom: p.bottom,
              left: p.left,
              width: p.size + 'px',
              height: p.size + 'px',
              borderRadius: '50%',
              background: p.color,
              boxShadow: '0 0 ' + p.size * 2 + 'px ' + p.color,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        ))}

      </motion.div>
    </motion.div>
  )
}
