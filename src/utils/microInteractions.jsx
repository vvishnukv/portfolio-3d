import React, { useRef, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  animate,
} from 'framer-motion'

/* =========================================================
   SHARED SPRING CONFIGS
   — same physics across the site for a consistent feel
   ========================================================= */
export const springs = {
  gentle: { stiffness: 120, damping: 20, mass: 0.6 },
  bouncy: { stiffness: 260, damping: 18, mass: 0.8 },
  smooth: { stiffness: 80, damping: 22, mass: 0.7 },
  snappy: { stiffness: 320, damping: 24, mass: 0.5 },
  magnetic: { stiffness: 180, damping: 15, mass: 0.4 },
}

/* =========================================================
   3D-ROTATE STAGGERED ENTRY VARIANT
   ========================================================= */
export const reveal3D = {
  hidden: { opacity: 0, y: 40, rotateX: -18, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/* =========================================================
   useTilt — 3D mouse-tracking tilt with spring physics
   ========================================================= */
export function useTilt({ max = 7, perspective = 1000 } = {}) {
  const ref = useRef(null)
  const rotateX = useSpring(useMotionValue(0), springs.smooth)
  const rotateY = useSpring(useMotionValue(0), springs.smooth)
  const scale = useSpring(useMotionValue(1), springs.snappy)

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * max * 2)
    rotateX.set(-(py - 0.5) * max * 2)
  }

  const onMouseEnter = () => scale.set(1.02)
  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return { ref, rotateX, rotateY, scale, onMouseMove, onMouseEnter, onMouseLeave, perspective }
}

/* =========================================================
   useSpotlight — cursor-following radial gradient overlay
   ========================================================= */
export function useSpotlight() {
  const x = useSpring(useMotionValue(50), springs.smooth)
  const y = useSpring(useMotionValue(50), springs.smooth)
  const opacity = useSpring(useMotionValue(0), springs.snappy)

  const onMouseMove = (e) => {
    if (!e.currentTarget) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width) * 100)
    y.set(((e.clientY - rect.top) / rect.height) * 100)
    opacity.set(1)
  }
  const onMouseLeave = () => opacity.set(0)

  // Build the radial-gradient string from a single transform of [x, y, opacity]
  // Uses a large, soft warm glow — no harsh white spotlight
  const background = useTransform(
    [x, y, opacity],
    ([mx, my, op]) =>
      `radial-gradient(500px circle at ${mx}% ${my}%, rgba(255,248,240,${0.03 + op * 0.02}), transparent 65%)`
  )
  const overlayOpacity = useTransform(opacity, (o) => Math.min(o, 1))

  return { background, overlayOpacity, onMouseMove, onMouseLeave }
}

/* =========================================================
   TiltCard — wraps any glass-card with 3D tilt + spotlight
   + conic-gradient border sweep. Preserves all children.
   ========================================================= */
export function TiltCard({
  children,
  theme,
  borderAccents = [1, 2, 3, 4],
  className = 'glass-card',
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const { ref, rotateX, rotateY, scale, onMouseMove, onMouseEnter: tiltEnter, onMouseLeave: tiltLeave, perspective } =
    useTilt({ max: 7 })

  const spot = useSpotlight()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        onMouseMove(e)
        spot.onMouseMove(e)
      }}
      onMouseEnter={(e) => {
        tiltEnter()
        setHovered(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        tiltLeave()
        spot.onMouseLeave()
        setHovered(false)
        onMouseLeave?.(e)
      }}
      style={{
        perspective: `${perspective}px`,
        position: 'relative',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          position: 'relative',
          zIndex: 1,
          ...style,
        }}
        onClick={onClick}
        className={className}
        {...rest}
      >
        {/* Subtle warm spotlight overlay */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: spot.background,
            opacity: spot.overlayOpacity,
            zIndex: 0,
          }}
        />
        {/* Inner content sits above overlay */}
        <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      </motion.div>
    </div>
  )
}

/* =========================================================
   MagneticButton — element drifts toward cursor with spring
   ========================================================= */
export function MagneticButton({
  children,
  strength = 0.35,
  maxOffset = 6,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), springs.magnetic)
  const y = useSpring(useMotionValue(0), springs.magnetic)

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    x.set(Math.max(-maxOffset, Math.min(maxOffset, dx)))
    y.set(Math.max(-maxOffset, Math.min(maxOffset, dy)))
  }
  const handleLeave = (e) => {
    x.set(0)
    y.set(0)
    onMouseLeave?.(e)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ x, y, ...style }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

/* =========================================================
   MagneticLink — same as MagneticButton but for <a>
   ========================================================= */
export function MagneticLink({
  children,
  strength = 0.35,
  maxOffset = 6,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), springs.magnetic)
  const y = useSpring(useMotionValue(0), springs.magnetic)

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    x.set(Math.max(-maxOffset, Math.min(maxOffset, dx)))
    y.set(Math.max(-maxOffset, Math.min(maxOffset, dy)))
  }
  const handleLeave = (e) => {
    x.set(0)
    y.set(0)
    onMouseLeave?.(e)
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{ x, y, ...style }}
      {...rest}
    >
      {children}
    </motion.a>
  )
}

/* =========================================================
   CountUp — animates from 0 to value with spring easing
   ========================================================= */
export function CountUp({ value, duration = 1.6, decimals = 0, suffix = '', prefix = '' }) {
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => {
    const fixed = v.toFixed(decimals)
    return `${prefix}${fixed}${suffix}`
  })

  useEffect(() => {
    const numeric = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
    const controls = animate(motionVal, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [value, duration])

  return (
    <motion.span style={{ display: 'inline-block' }}>
      {rounded}
    </motion.span>
  )
}

/* =========================================================
   RevealHeading — clipPath mask-wipe for gradient headings
   ========================================================= */
export function RevealHeading({
  children,
  className = 'gradient-text shimmer-text',
  style,
  as: Tag = motion.h2,
  delay = 0,
  ...rest
}) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Tag
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        style={{ display: 'inline-block', willChange: 'transform', ...style }}
        {...rest}
      >
        {children}
      </Tag>
    </div>
  )
}

/* =========================================================
   useParallax — scroll-driven translate for orbs
   ========================================================= */
export function useParallax(intensity = 80) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, intensity])
  return y
}
