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

// 2. High-Density Multi-Shape 3D Background Matrix
function HyperComplexBackground({ isDarkMode }) {
  const groupRef = useRef()

  const shapesArray = useMemo(() => {
    return [...Array(65)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 20 - 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.8 + 0.3,
      speed: Math.random() * 2 + 1,
      type: i % 5,
    }))
  }, [])

  const dotsCount = 1200
  const dotPositions = useMemo(() => {
    const pos = new Float32Array(dotsCount * 3)
    for (let i = 0; i < dotsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35
      pos[i * 3 + 1] = (Math.random() - 0.5) * 120
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    const scrollY = window.scrollY || window.pageYOffset
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 5 - (scrollY * 0.005), 0.1)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 8 + (scrollY * 0.002), 0.1)

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.035 + (state.pointer.x * 0.12)
    }
  })

  return (
    <group ref={groupRef}>
      {shapesArray.map((item, i) => (
        <Float key={`shape-${i}`} speed={item.speed} rotationIntensity={2.5} floatIntensity={3.5}>
          <mesh position={item.position} rotation={item.rotation} scale={item.scale}>
            {item.type === 0 && <boxGeometry args={[1, 1, 1]} />}
            {item.type === 1 && <boxGeometry args={[1.8, 0.8, 0.4]} />}
            {item.type === 2 && <torusKnotGeometry args={[0.5, 0.15, 64, 16]} />}
            {item.type === 3 && <octahedronGeometry args={[0.8, 0]} />}
            {item.type === 4 && <cylinderGeometry args={[0.8, 0.8, 0.2, 6]} />}

            <meshStandardMaterial 
              color={i % 2 === 0 ? '#38bdf8' : '#ef4444'} 
              wireframe 
              transparent 
              opacity={isDarkMode ? 0.45 : 0.3} 
            />
          </mesh>
        </Float>
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dotsCount} array={dotPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color={isDarkMode ? '#38bdf8' : '#0284c7'} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  const theme = {
    bg: isDarkMode ? '#030712' : '#f8fafc',
    textMain: isDarkMode ? '#f9fafb' : '#0f172a',
    textMuted: isDarkMode ? '#9ca3af' : '#475569',
    cardBg: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.85)',
    cardBorder: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    navBg: isDarkMode ? 'rgba(3, 7, 18, 0.85)' : 'rgba(248, 250, 252, 0.85)',
  }

  // Intersection Observer to track active section for navbar highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ width: '100vw', backgroundColor: theme.bg, color: theme.textMain, position: 'relative', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <SpidermanCursor />

      {/* STICKY TOP NAVIGATION BAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '70px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 4vw', backgroundColor: theme.navBg, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.cardBorder}`, zIndex: 1000
      }}>
        {/* Isolated Marquee Container */}
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '190px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'smoothMarquee 8s linear infinite' }}>
            <span style={{ display: 'inline-block', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px', color: '#ef4444', paddingRight: '20px' }}>Vishnu Kaushik Varma &bull;</span>
            <span style={{ display: 'inline-block', fontWeight: 900, fontSize: '1.0rem', letterSpacing: '1px', color: '#ef4444', paddingRight: '20px' }}>Vishnu Kaushik Varma &bull;</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'].map((section) => {
            const isActive = activeSection === section
            return (
              <a
                key={section}
                href={`#${section}`}
                style={{
                  color: isActive ? '#ef4444' : theme.textMain,
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.9rem',
                  position: 'relative',
                  paddingBottom: '4px',
                  borderBottom: isActive ? '2px solid #ef4444' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            )
          })}

          {/* LIGHT / DARK THEME TOGGLE BUTTON */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              padding: '0.5rem 0.9rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85',
              display: 'flex',
              alignItem: 'center',
              gap: '6px',
              transition: 'background 0.2s'
            }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      {/* FULL-PAGE ABSOLUTE CANVAS */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <ambientLight intensity={isDarkMode ? 0.6 : 1.2} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -20, -10]} intensity={1} color="#ef4444" />
          <HyperComplexBackground isDarkMode={isDarkMode} />
        </Canvas>
      </div>

      {/* VERTICAL SCROLL CONTAINER */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>

        {/* SECTION 1: HOME / HERO */}
        <section id="home" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10vw' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.5rem', color: theme.textMain }}>
            Vishnu Kaushik Varma Vuddaraju
          </h1>
          <p style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Software Engineer & IT Technical Specialist
          </p>
          <p style={{ color: theme.textMuted, fontSize: '1.2rem', maxWidth: '650px', lineHeight: 1.6 }}>
            M.S. Information Systems at Marist College (GPA: 3.845). Specializing in scalable software engineering, institutional LMS platform administration, containerized cloud data pipelines, intelligent AI solutions, and full-lifecycle cross-platform mobile applications.
          </p>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 10vw' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', color: '#38bdf8' }}>
            About Me
          </h2>
          <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '3rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', maxWidth: '900px', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
            <p style={{ color: theme.textMuted, fontSize: '1.15rem', lineHeight: 1.8 }}>
              I live in New York and am pursuing my M.S. in Information Systems at Marist University, with an expected graduation in December 2026. Currently, I work as an LMS QA tester and Web Developer at Marist University. Beyond enterprise platform administration, I build dynamic software applications, create robust Android and iOS mobile apps, engineer responsive websites, and seamlessly integrate machine learning solutions into high performance backend architectures.
            </p>
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 10vw' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '3rem', color: '#ef4444' }}>
            Work Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px' }}>
            
            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: theme.textMain }}>LMS Quality Assurnace Tester and Web Developer - Digital Education</h3>
              <h4 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>Marist University • Apr 2025 – Present</h4>
              <ul style={{ color: theme.textMuted, lineHeight: 1.7, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>Audited 5,000+ Brightspace courses for WCAG 2.2 compliance using Power Apps and Power Automate workflow, automating issue reporting to faculty.</li>
                <li>Assisted faculty across every department with Brightspace LMS and accessibility through hybrid/live sessions and resolved 200+ support requests through the Team Dynamix ticketing system.</li>
                <li>Conducted workshops on integrating LTI tools and new LMS features, collaborating with the Center for Teaching and Learning to enhance faculty teaching.</li>
                <li>Spearheaded full institutional migration of 500+ courses from Sakai to Brightspace for 6,000+ end-users.</li>
                <li>Engineered tracking pipeline with Power Apps and Excel to parse system errors, eliminating 10+ hours of manual follow-up weekly.</li>
                <li>Resolved 100+ complex Jira tickets, cutting ticket resolution time by 50% and boosting response rates by 30%.</li>
                <li>Co-led Bright Foxes outreach campaign delivering 15+ faculty support sessions and resolving 50+ system inquiries.</li>
                <li>Documented Minutes of Meetings (MoMs) for Digital Education projects, ensuring clear communication of action items among technical and academic stakeholders.</li>
                <li>Developed 150+ academic and departmental web pages in Liferay CMS with responsive design, SEO optimization, and WCAG 2.2 accessibility compliance.</li>
                <li>Conducted functional, regression, and cross-browser QA testing to ensure LMS and CMS accessibility and quality compliance.</li>
                <li>Tested Sakai tools rigorously, helping out with quality assurance testing and creating detailed tickets for the Sakai team to resolve bugs.</li>
              </ul>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: theme.textMain }}>Forge Alumnus | Application Developer & Team Lead</h3>
              <h4 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>Hyderabad, India • Sep 2023 – Mar 2024</h4>
              <ul style={{ color: theme.textMuted, lineHeight: 1.7, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>Engineered and launched Realtor+, a full-scale real estate mobile platform for a USA (New Jersey) client in just 45 days, supporting 10,000+ active users, 100+ real estate agents, and 3 distinct user profiles across Android and iOS platforms.</li>
                <li>Released major feature updates for the enterprise mobile application on the Apple App Store and Google Play Store, driving a 60% increase in total application downloads while managing Apple Analytics and Google Analytics.</li>
                <li>Architected the Forge HRMS application for automated daily employee check-in and check-out tracking utilizing real-time GPS coordinates and location validation.</li>
                <li>Delivered the fully functional Forge Inspira event platform in just 30 days for a 2024 conference, executing rigorous QA testing across 3 user profiles and QR-based event registration tracking.</li>
                <li>Directed a 20-member technical development team, hosting 5+ onboarding sessions, authoring 15+ pages of Standard Operating Procedures, and serving as head of volunteers and technical hackathon instructor.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 5vw' }}>
          <div style={{ padding: '0 5vw', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#38bdf8' }}>
              Featured Projects
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', padding: '0 5vw' }}>
            
            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', color: theme.textMain }}>Containerized Research Data Pipeline</h3>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Engineered research workflow on GCP Ubuntu Linux VM using Docker for environment isolation. Compiled statistical summaries via Pandas and NumPy.
              </p>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>DOCKER • GCP • PYTHON • PANDAS</span>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', color: theme.textMain }}>System Compliance Reporting Architecture</h3>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Designed Power Apps reporting architecture to monitor learning environments and identify WCAG 2.1 compliance errors across 500+ active university courses.
              </p>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>POWER APPS • AUTOMATION • WCAG 2.1</span>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', color: theme.textMain }}>AI-Powered Virtual Assistant (Copilot)</h3>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Engineered conversational AI agent utilizing OpenAI API with context-aware prompt engineering, voice pipeline (TTS/STT), and modular backend REST APIs.
              </p>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>OPENAI API • PYTHON • REST APIS</span>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', color: theme.textMain }}>LinkNews Mobile App (Flutter)</h3>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Developed cross-platform app using Flutter and Dart. Integrated asynchronous JSON REST API pipelines and Firebase Cloud Messaging (FCM) notifications.
              </p>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>FLUTTER • DART • FIREBASE FCM</span>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', color: theme.textMain }}>Personal Diary App</h3>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Built full CRUD mobile application with Provider state management, dynamic light/dark themes, and local storage data persistence via shared preferences.
              </p>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>FLUTTER • PROVIDER • LOCAL STORAGE</span>
            </div>

            <div className="interactive-card" style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', color: theme.textMain }}>LMS Accessibility & Student Success Analysis</h3>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Processed 10,000+ LMS records using Python and PostgreSQL inside Docker. Built interactive Tableau Public dashboards for academic leadership.
              </p>
              <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>PYTHON • POSTGRESQL • TABLEAU • DOCKER</span>
            </div>

          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 10vw' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2.5rem', color: '#38bdf8' }}>
            Technical Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1rem' }}>Programming Languages</h3>
              <p style={{ color: theme.textMuted, lineHeight: 1.6 }}>Python, SQL, JavaScript, HTML, Dart</p>
            </div>

            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1rem' }}>Frameworks & Libraries</h3>
              <p style={{ color: theme.textMuted, lineHeight: 1.6 }}>Pandas, NumPy, Flutter</p>
            </div>

            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1rem' }}>Tools & Software</h3>
              <p style={{ color: theme.textMuted, lineHeight: 1.6 }}>Ubuntu Linux, Docker, Containerization, Liferay, Brightspace, Sakai, Power Apps, Jira, TDX, Git, GitHub, Tableau</p>
            </div>

            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1rem' }}>Cloud & Soft Skills</h3>
              <p style={{ color: theme.textMuted, lineHeight: 1.6 }}>Google Cloud Platform, Firebase, Faculty Workshops, Technical Consulting</p>
            </div>

          </div>
        </section>

        {/* SECTION 6: EDUCATION */}
        <section id="education" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 10vw' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2.5rem', color: '#ef4444' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px' }}>
            
            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.4rem', color: theme.textMain, marginBottom: '0.4rem' }}>Marist College</h3>
              <h4 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '1rem' }}>Master of Science, Information Systems • Jan 2025 – Dec 2026 (GPA: 3.845)</h4>
            </div>

            <div style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: '2.5rem', borderRadius: '1rem', backdropFilter: 'blur(12px)', boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.4rem', color: theme.textMain, marginBottom: '0.4rem' }}>Keshav Memorial Institute Of Technology</h3>
              <h4 style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '1rem' }}>Bachelor of Technology, CSM • Aug 2020 – May 2024 (GPA: 3.5)</h4>
            </div>

          </div>
        </section>

        {/* SECTION 7: CONTACT */}
        <section id="contact" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 10vw' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1rem', color: theme.textMain }}>
            Let's Connect
          </h2>
          <p style={{ color: theme.textMuted, fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px' }}>
            Poughkeepsie, New York • (551) 297-5781 • vishnukaushikvarma@gmail.com
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:vishnukaushikvarma@gmail.com" style={{ background: '#ef4444', color: '#fff', padding: '1.2rem 3rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
              Email Me
            </a>
            <a href="https://linkedin.com/in/vishnukaushikvarma" target="_blank" rel="noreferrer" style={{ background: 'transparent', border: '2px solid #38bdf8', color: '#38bdf8', padding: '1.2rem 3rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}