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
            background: 'radial-gradient(circle, ' + theme.accent1 + '25, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: hovered ? 0.9 : 0.6,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Rotating dashed ring (decoration) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-8%',
            left: '-8%',
            right: '-8%',
            bottom: '-8%',
            borderRadius: '50%',
            border: '1.5px dashed ' + theme.accent1 + '30',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-15%',
            right: '-15%',
            bottom: '-15%',
            borderRadius: '50%',
            border: '1px solid ' + theme.accent1 + '15',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Gold frame card with parallax bg layer */}
        <motion.div
          style={{
            position: 'relative',
            x: bgX,
            y: bgY,
            borderRadius: '24px',
            padding: '4px',
            background:
              'linear-gradient(135deg, ' +
              theme.accent1 +
              ' 0%, ' +
              theme.accent2 +
              ' 50%, ' +
              theme.accent1 +
              ' 100%)',
            backgroundSize: '200% 200%',
            boxShadow:
              '0 25px 80px rgba(0,0,0,0.6), 0 0 60px ' +
              theme.accent1 +
              '30, inset 0 0 0 1px rgba(255,255,255,0.08)',
            zIndex: 2,
            animation: 'gradientShift 8s ease infinite',
          }}
        >
          {/* Inner card body */}
          <div
            style={{
              position: 'relative',
              borderRadius: '21px',
              overflow: 'hidden',
              background: isDarkMode ? '#0a0a0c' : '#f4f4f5',
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
                  'linear-gradient(to top, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.4) 40%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Gold rim shine (top edge) */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background:
                  'linear-gradient(120deg, transparent 30%, rgba(212,168,83,0.15) 50%, transparent 70%)',
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
                color: '#fafafa',
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
                Vishnu Kaushik
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  color: '#fafafa',
                }}
              >
                Software Engineer
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
                background: 'rgba(9,9,11,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,168,83,0.3)',
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

        {/* Floating particles */}
        {[
          { top: '5%', right: '-10%', size: 12, color: theme.accent1, delay: 0 },
          { bottom: '15%', left: '-12%', size: 10, color: theme.accent2, delay: 1 },
          { top: '40%', right: '-15%', size: 8, color: theme.accent3, delay: 2 },
          { bottom: '5%', right: '5%', size: 6, color: theme.accent1, delay: 0.5 },
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

        {/* Corner accent brackets (top-left) */}
        <div
          style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            width: '24px',
            height: '24px',
            borderTop: '2px solid ' + theme.accent1,
            borderLeft: '2px solid ' + theme.accent1,
            borderTopLeftRadius: '6px',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            width: '24px',
            height: '24px',
            borderBottom: '2px solid ' + theme.accent1,
            borderRight: '2px solid ' + theme.accent1,
            borderBottomRightRadius: '6px',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
