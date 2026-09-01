import React, { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion, useSpring, useMotionValue } from 'framer-motion'

// 1. Spiderman Cursor Component
function SpidermanCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 400 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  const [isClicking, setIsClicking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.interactive-card')) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <motion.div style={{ position: 'fixed', left: 0, top: 0, x, y, pointerEvents: 'none', zIndex: 9999 }}>
      <motion.div
        animate={{ scale: isClicking ? 0.7 : isHovered ? 1.4 : 1 }}
        style={{
          width: '32px', height: '32px', borderRadius: '50%',
          border: '2px solid #ef4444',
          backgroundColor: isHovered ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isHovered ? '0 0 15px #ef4444' : 'none',
        }}
      >
        <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
      </motion.div>
      {isClicking && (
        <motion.div
          initial={{ scale: 0.2, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: '-8px', left: '-8px',
            width: '48px', height: '48px',
            border: '1.5px dashed #38bdf8',
            borderRadius: '50%',
          }}
        />
      )}
    </motion.div>
  )
}

// 2. High-Density Multi-Shape 3D Background Matrix (Cubes, Rectangles, Knots, Octahedrons)
function HyperComplexBackground() {
  const groupRef = useRef()

  const shapesArray = useMemo(() => {
    return [...Array(65)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 20 - 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.8 + 0.3,
      speed: Math.random() * 2 + 1,
      type: i % 5, // 0: Cube, 1: Rectangle Box, 2: Torus Knot, 3: Octahedron, 4: Hexagon
    }))
  }, [])

  const dotsCount = 1000
  const dotPositions = useMemo(() => {
    const pos = new Float32Array(dotsCount * 3)
    for (let i = 0; i < dotsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    const scrollY = window.scrollY || window.pageYOffset
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 5 - (scrollY * 0.007), 0.1)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 8 + (scrollY * 0.003), 0.1)

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.035 + (state.pointer.x * 0.12)
    }
  })

  return (
    <group ref={groupRef}>
      {shapesArray.map((item, i) => (
        <Float key={`shape-${i}`} speed={item.speed} rotationIntensity={2.5} floatIntensity={3.5}>
          <mesh position={item.position} rotation={item.rotation} scale={item.scale}>
            {item.type === 0 && <boxGeometry args={[1, 1, 1]} />} {/* Cube */}
            {item.type === 1 && <boxGeometry args={[1.8, 0.8, 0.4]} />} {/* Rectangle Plate */}
            {item.type === 2 && <torusKnotGeometry args={[0.5, 0.15, 64, 16]} />} {/* Torus Knot */}
            {item.type === 3 && <octahedronGeometry args={[0.8, 0]} />} {/* Octahedron */}
            {item.type === 4 && <cylinderGeometry args={[0.8, 0.8, 0.2, 6]} />} {/* Hexagon */}

            <meshStandardMaterial 
              color={i % 2 === 0 ? '#38bdf8' : '#ef4444'} 
              wireframe 
              transparent 
              opacity={0.45} 
            />
          </mesh>
        </Float>
      ))}

      {/* Holographic Dot Matrix */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dotsCount} array={dotPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#38bdf8" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

export default function App() {
  const theme = {
    bg: '#030712',
    textMain: '#f9fafb',
    textMuted: '#9ca3af',
    cardBg: 'rgba(15, 23, 42, 0.75)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    navBg: 'rgba(3, 7, 18, 0.85)',
  }

  return (
    <div style={{ width: '100vw', backgroundColor: theme.bg, color: theme.textMain, position: 'relative' }}>
      <SpidermanCursor />

      {/* STICKY TOP NAVIGATION BAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '70px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 5vw', backgroundColor: theme.navBg, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.cardBorder}`, zIndex: 1000
      }}>
        <div style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '1px', color: '#ef4444' }}>
          VVKV
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="#home" style={{ color: theme.textMain, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Home</a>
          <a href="#about" style={{ color: theme.textMain, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>About</a>
          <a href="#experience" style={{ color: theme.textMain, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Experience</a>
          <a href="#projects" style={{ color: theme.textMain, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Projects</a>
          <a href="#contact" style={{ color: theme.textMain, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Contact</a>
        </div>
      </nav>

      {/* FULL-PAGE ABSOLUTE CANVAS */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -20, -10]} intensity={1} color="#ef4444" />
          <HyperComplexBackground />
        </Canvas>
      </div>

      {/* VERTICAL SCROLL CONTAINER */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>

        {/* SECTION 1: HOME / HERO */}
        <section id="home" style={{ height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw' }}>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', color: theme.textMain }}>
            Vishnu Kaushik Varma
          </h1>
          <p style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Software Engineer & Data Analyst
          </p>
          <p style={{ color: theme.textMuted, fontSize: '1.2rem', maxWidth: '550px', lineHeight: 1.6 }}>
            M.S. Information Systems at Marist University. Exploring dense geometric wireframes, cubes, plates, and knots across an immersive dark canvas.
          </p>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 10vw' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', color: '#38bdf8' }}>
            About Me
          </h2>
          <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '3rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', maxWidth: '800px' }}>
            <p style={{ color: theme.textMuted, fontSize: '1.15rem', lineHeight: 1.8 }}>
              I am an aspiring software and data engineer currently pursuing my Master’s in Information Systems at Marist University, graduating in December 2026. My technical expertise bridges robust back-end development (Go, PostgreSQL, Python), cross-platform mobile apps (Flutter), and quality assurance automation. I thrive on building aesthetic, highly performant web dimensions and data-driven systems.
            </p>
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 10vw' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '3rem', color: '#ef4444' }}>
            Experience
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1000px' }}>
            
            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: theme.textMain }}>LMS QA Developer & Tester</h3>
              <h4 style={{ color: '#38bdf8', fontSize: '1rem', marginBottom: '1.2rem' }}>Marist University • Aug 2026 – Present</h4>
              <p style={{ color: theme.textMuted, lineHeight: 1.6 }}>Executing automated QA testing protocols, performance audits, and strict accessibility standards for enterprise learning platforms.</p>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: theme.textMain }}>Flutter Mobile App Developer</h3>
              <h4 style={{ color: '#38bdf8', fontSize: '1rem', marginBottom: '1.2rem' }}>Previous Internship (India)</h4>
              <p style={{ color: theme.textMuted, lineHeight: 1.6 }}>Designed and deployed reactive, cross-platform mobile app architectures with complex state management systems.</p>
            </div>

          </div>
        </section>

        {/* SECTION 4: PROJECTS (Horizontal Track) */}
        <section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 0' }}>
          <div style={{ padding: '0 10vw', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#38bdf8' }}>
              Featured Projects <span style={{ fontSize: '1.2rem', color: theme.textMuted, fontWeight: 400 }}>(Scroll horizontally $\rightarrow$)</span>
            </h2>
          </div>

          <div className="horizontal-scroll-section">
            
            <div className="project-slide interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '3rem', borderRadius: '1rem', backdropFilter: 'blur(12px)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: theme.textMain }}>LMS Engagement Analysis</h3>
              <p style={{ color: theme.textMuted, fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>Full-scale data pipeline tracking engagement metrics using Python, SQL, Docker, and Tableau Public dashboards.</p>
              <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700 }}>PYTHON • SQL • TABLEAU</span>
            </div>

            <div className="project-slide interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '3rem', borderRadius: '1rem', backdropFilter: 'blur(12px)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: theme.textMain }}>High-Concurrency Go Backend</h3>
              <p style={{ color: theme.textMuted, fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>Engineered high-performance microservice API architecture featuring strict rate limiting and optimized database routing.</p>
              <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700 }}>GO • POSTGRESQL • REST</span>
            </div>

            <div className="project-slide interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '3rem', borderRadius: '1rem', backdropFilter: 'blur(12px)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: theme.textMain }}>3D Interactive Portfolio</h3>
              <p style={{ color: theme.textMuted, fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>Built with React, Vite, Three.js, and Framer Motion featuring custom interactive cursors and responsive layouts.</p>
              <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 700 }}>REACT • THREE.JS • VITE</span>
            </div>

          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 10vw' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1rem', color: theme.textMain }}>
            Let's Connect
          </h2>
          <p style={{ color: theme.textMuted, fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px' }}>
            Graduating December 2026. Ready to bring technical execution and creative vision to your engineering team.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="mailto:vishnukaushikvarma@gmail.com" style={{ background: '#ef4444', color: '#fff', padding: '1.2rem 3rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
              Email Me
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ background: 'transparent', border: '2px solid #38bdf8', color: '#38bdf8', padding: '1.2rem 3rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}