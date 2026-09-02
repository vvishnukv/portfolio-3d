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
    return [...Array(45)].map((_, i) => ({
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

  const dotsCount = 800
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
              color={i % 2 === 0 ? '#0284c7' : '#dc2626'} 
              wireframe 
              transparent 
              opacity={isDarkMode ? 0.45 : 0.22} 
            />
          </mesh>
        </Float>
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dotsCount} array={dotPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color={isDarkMode ? '#38bdf8' : '#0284c7'} transparent opacity={isDarkMode ? 0.7 : 0.35} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const theme = {
    bg: isDarkMode ? '#030712' : '#eef2f6',
    textMain: isDarkMode ? '#f9fafb' : '#1e293b',
    textMuted: isDarkMode ? '#9ca3af' : '#64748b',
    cardBg: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.92)',
    cardBorder: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(148, 163, 184, 0.25)',
    cardShadow: isDarkMode ? 'none' : '0 12px 32px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)',
    navBg: isDarkMode ? 'rgba(3, 7, 18, 0.9)' : 'rgba(238, 242, 246, 0.92)',
  }

  // Intersection Observer for active section tracking
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
    <div style={{ width: '100vw', maxWidth: '100%', overflowX: 'hidden', backgroundColor: theme.bg, color: theme.textMain, position: 'relative', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
      
      {/* GLOBAL MOBILE RESPONSIVE CSS INJECTION */}
      <style>{`
        @keyframes smoothMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .desktop-nav-links { display: flex; }
        .mobile-menu-btn { display: none; }
        .mobile-dropdown-menu { display: none; }

        @media (max-width: 900px) {
          .desktop-nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-dropdown-menu {
            display: ${mobileMenuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: ${theme.navBg};
            backdrop-filter: blur(16px);
            border-bottom: 1px solid ${theme.cardBorder};
            padding: 1.5rem 2rem;
            gap: 1.2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
        }
      `}</style>

      <SpidermanCursor />

      {/* STICKY TOP NAVIGATION BAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '70px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 5vw', backgroundColor: theme.navBg, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.cardBorder}`, zIndex: 1000,
        boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Marquee Name */}
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '160px', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'smoothMarquee 8s linear infinite' }}>
            <span style={{ display: 'inline-block', fontWeight: 900, fontSize: '0.95rem', letterSpacing: '1px', color: '#ef4444', paddingRight: '20px' }}>Vishnu Kaushik Varma &bull;</span>
            <span style={{ display: 'inline-block', fontWeight: 900, fontSize: '0.95rem', letterSpacing: '1px', color: '#ef4444', paddingRight: '20px' }}>Vishnu Kaushik Varma &bull;</span>
          </div>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links" style={{ gap: '1.5rem', alignItems: 'center' }}>
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
                  fontSize: '0.85rem',
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

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.06)',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              padding: '0.4rem 0.8rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'background 0.2s'
            }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.06)',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              padding: '0.4rem 0.7rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
            className="mobile-menu-btn"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              padding: '0.4rem 0.7rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 700,
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className="mobile-dropdown-menu">
          {['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'].map((section) => {
            const isActive = activeSection === section
            return (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: isActive ? '#ef4444' : theme.textMain,
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '1.1rem',
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            )
          })}
        </div>
      </nav>

      {/* FULL-PAGE ABSOLUTE CANVAS */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <ambientLight intensity={isDarkMode ? 0.6 : 1.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -20, -10]} intensity={1} color="#ef4444" />
          <HyperComplexBackground isDarkMode={isDarkMode} />
        </Canvas>
      </div>

      {/* VERTICAL SCROLL CONTAINER */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>

        {/* SECTION 1: HOME / HERO */}
        <section id="home" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8vw' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1.2rem', color: theme.textMain }}>
              Vishnu Kaushik Varma Vuddaraju
            </h1>
            <p style={{ color: '#0284c7', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 600, marginBottom: '1.2rem' }}>
              Software Engineer & IT Technical Specialist
            </p>
            <p style={{ color: theme.textMuted, fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '650px', lineHeight: 1.6 }}>
              M.S. Information Systems at Marist College (GPA: 3.845). Specializing in scalable software engineering, institutional LMS platform administration, containerized cloud data pipelines, intelligent AI solutions, and full-lifecycle cross-platform mobile applications.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2rem', color: '#0284c7' }}
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="interactive-card"
            style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1.2rem', backdropFilter: 'blur(12px)', maxWidth: '900px', boxShadow: theme.cardShadow, transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = '#0284c7';
              e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(2, 132, 199, 0.15)' : '0 20px 40px rgba(2, 132, 199, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = theme.cardBorder;
              e.currentTarget.style.boxShadow = theme.cardShadow;
            }}
          >
            <p style={{ color: theme.textMuted, fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.8, margin: 0 }}>
              I live in New York and am pursuing my M.S. in Information Systems at Marist University, with an expected graduation in December 2026. Currently, I work as a Web Developer and LMS QA tester at Marist University. Beyond enterprise platform administration, I build dynamic software applications, create robust Android and iOS mobile apps, engineer responsive websites, and seamlessly integrate machine learning solutions into high performance backend architectures.
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '3rem', color: '#ef4444' }}
          >
            Work Experience
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px' }}>
            
            {[
              {
                title: "Web Developer and LMS Quality Assurance Tester - Digital Education",
                company: "Marist University • Apr 2025 – Present",
                color: "#0284c7",
                bullets: [
                  "Developed 150+ academic and departmental web pages in Liferay CMS with responsive design, SEO optimization, and WCAG 2.2 accessibility compliance.",
                  "Resolved 100+ complex Jira tickets, cutting ticket resolution time by 50% and boosting response rates by 30%.",
                  "Audited 5,000+ Brightspace courses for WCAG 2.2 compliance using Power Apps and Power Automate workflow, automating issue reporting to faculty.",
                  "Assisted faculty across every department with Brightspace LMS and accessibility through hybrid/live sessions and resolved 200+ support requests through the Team Dynamix ticketing system.",
                  "Conducted workshops on integrating LTI tools and new LMS features, collaborating with the Center for Teaching and Learning to enhance faculty teaching.",
                  "Spearheaded full institutional migration of 500+ courses from Sakai to Brightspace for 6,000+ end-users.",
                  "Engineered tracking pipeline with Power Apps and Excel to parse system errors, eliminating 10+ hours of manual follow-up weekly.",
                  "Co-led Bright Foxes outreach campaign delivering 15+ faculty support sessions and resolving 50+ system inquiries.",
                  "Documented Minutes of Meetings (MoMs) for Digital Education projects, ensuring clear communication of action items among technical and academic stakeholders.",
                  "Conducted functional, regression, and cross-browser QA testing to ensure LMS and CMS accessibility and quality compliance.",
                  "Tested Sakai tools rigorously, helping out with quality assurance testing and creating detailed tickets for the Sakai team to resolve bugs."
                ]
              },
              {
                title: "Forge Alumnus | Application Developer & Team Lead",
                company: "Hyderabad, India • Sep 2023 – Mar 2024",
                color: "#0284c7",
                bullets: [
                  "Engineered and launched Realtor+, a full-scale real estate mobile platform for a USA (New Jersey) client in just 45 days, supporting 10,000+ active users, 100+ real estate agents, and 3 distinct user profiles across Android and iOS platforms.",
                  "Released major feature updates for the enterprise mobile application on the Apple App Store and Google Play Store, driving a 60% increase in total application downloads while managing Apple Analytics and Google Analytics.",
                  "Architected the Forge HRMS application for automated daily employee check-in and check-out tracking utilizing real-time GPS coordinates and location validation.",
                  "Delivered the fully functional Forge Inspira event platform in just 30 days for a 2024 conference, executing rigorous QA testing across 3 user profiles and QR-based event registration tracking.",
                  "Directed a 20-member technical development team, hosting 5+ onboarding sessions, authoring 15+ pages of Standard Operating Procedures, and serving as head of volunteers and technical hackathon instructor."
                ]
              }
            ].map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="interactive-card" 
                style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}`, padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '1.2rem', backdropFilter: 'blur(12px)', boxShadow: theme.cardShadow, transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.005)';
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(239, 68, 68, 0.12)' : '0 20px 40px rgba(239, 68, 68, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = theme.cardBorder;
                  e.currentTarget.style.boxShadow = theme.cardShadow;
                }}
              >
                <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '0.4rem', color: theme.textMain, fontWeight: 700 }}>
                  {exp.title}
                </h3>
                <h4 style={{ color: exp.color, fontSize: '1.05rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  {exp.company}
                </h4>
                <ul style={{ color: theme.textMuted, lineHeight: 1.7, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', margin: 0 }}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}

          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 5vw' }}>
          <div style={{ padding: '0 3vw', marginBottom: '2.5rem' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#0284c7' }}
            >
              Featured Projects
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '0 3vw' }}>

            {[
              {
                title: "AI-Powered Voice Music Assistant",
                desc: "Built a full-stack voice-activated virtual assistant leveraging Node.js, Express, and MongoDB Atlas to manage and query song directories. Processed speech-to-text voice prompts through OpenAI's API to intelligently parse requests and trigger local computer audio playback.",
                tech: "NODE.JS • EXPRESS • MONGODB • OPENAI API • SPEECH-TO-TEXT",
                github: "https://github.com/vvishnukv/Virtual-Assistant-ChatGPT"
              },
              {
                title: "LinkNews Mobile App (Flutter)",
                desc: "Developed a cross-platform news mobile application using Flutter and Dart. Integrated asynchronous JSON REST API data pipelines via HTTP, HTML parsing utilities, and Firebase Cloud Messaging (FCM) with local notifications for real-time user engagement.",
                tech: "FLUTTER • DART • GETX • FIREBASE FCM • REST APIS",
                github: "https://github.com/vvishnukv/LinkNews"
              },
              {
                title: "Personal Diary App",
                desc: "Built a full-featured personal diary mobile application using Flutter and Dart. Integrated Provider state management, SQLite/Shared Preferences for persistent local data storage, and dynamic light/dark theme switching.",
                tech: "FLUTTER • DART • PROVIDER • SQLITE • SHARED PREFERENCES",
                github: "https://github.com/vvishnukv/diary_app"
              },
              {
                title: "Flutter SQLite & API Integration App",
                desc: "Developed a Flutter mobile utility to fetch remote data from JSONPlaceholder APIs, cache and manage records securely using local SQLite databases (`sqflite`), and render dynamic floating lists with stylized components.",
                tech: "FLUTTER • DART • SQLITE • REST API • HTTP",
                github: "https://github.com/vvishnukv/flutter_sqlite_api_test"
              },
              {
                title: "Containerized Research Data Pipeline",
                desc: "Engineered an automated research workflow deployed on a GCP Ubuntu Linux virtual machine utilizing Docker for absolute environment isolation. Processed multi-subject research simulations and generated statistical aggregates via Pandas and NumPy.",
                tech: "DOCKER • GCP • PYTHON • PANDAS • NUMPY",
                github: "https://github.com/vvishnukv/research-computing-docker-pipeline"
              },
              {
                title: "LMS Accessibility & Student Success Analysis",
                desc: "Processed 10,000+ student LMS records using Python and PostgreSQL inside Docker to evaluate WCAG 2.1 accessibility compliance. Uncovered critical academic performance metrics and built interactive Tableau Public dashboards.",
                tech: "PYTHON • POSTGRESQL • TABLEAU • DOCKER • PANDAS",
                github: "https://github.com/vvishnukv/lms-analysis-project",
                tableau: "https://public.tableau.com/app/profile/vishnu.kaushik.varma.vuddaraju/viz/LMSAccessibilityStudentEngagementAnalysis/Dashboard1?publish=yes"
              }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => window.open(project.github, '_blank')}
                className="interactive-card" 
                style={{ 
                  background: theme.cardBg, 
                  border: `1px solid ${theme.cardBorder}`, 
                  padding: '2rem', 
                  borderRadius: '1.2rem', 
                  backdropFilter: 'blur(12px)', 
                  boxShadow: theme.cardShadow,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(56, 189, 248, 0.15)' : '0 20px 40px rgba(2, 132, 199, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = theme.cardBorder;
                  e.currentTarget.style.boxShadow = theme.cardShadow;
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: theme.textMain, margin: 0, fontWeight: 700 }}>
                      {project.title}
                    </h3>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      GitHub ↗
                    </a>
                  </div>

                  <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {project.desc}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                      {project.tech}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', marginTop: 'auto' }}>
                  {/* View Code Button */}
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.4rem',
                      borderRadius: '25px',
                      border: `1px solid ${theme.cardBorder}`,
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)',
                      color: theme.textMain,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ef4444';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.textContent = 'GitHub ↗';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)';
                      e.currentTarget.style.color = theme.textMain;
                      e.currentTarget.style.borderColor = theme.cardBorder;
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.textContent = 'View Code';
                    }}
                  >
                    View Code
                  </a>

                  {/* Optional Tableau Dashboard Button */}
                  {project.tableau && (
                    <a 
                      href={project.tableau} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.4rem',
                        borderRadius: '25px',
                        border: `1px solid ${theme.cardBorder}`,
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)',
                        color: theme.textMain,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#38bdf8';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = '#38bdf8';
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.textContent = 'Tableau ↗';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)';
                        e.currentTarget.style.color = theme.textMain;
                        e.currentTarget.style.borderColor = theme.cardBorder;
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.textContent = 'View Dashboard';
                      }}
                    >
                      View Dashboard
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#0284c7' }}
          >
            Technical Skills
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            {[
              { 
                title: 'Programming Languages', 
                skills: ['Python', 'SQL', 'JavaScript', 'Dart', 'HTML'] 
              },
              { 
                title: 'Frameworks & Libraries', 
                skills: ['Flutter', 'Node.js', 'Express', 'Pandas', 'NumPy', 'Provider', 'GetX', 'REST APIs'] 
              },
              { 
                title: 'Databases & Cloud', 
                skills: ['PostgreSQL', 'MongoDB Atlas', 'SQLite', 'Google Cloud Platform (GCP)', 'Firebase', 'Firebase FCM'] 
              },
              { 
                title: 'Tools, AI & Platforms', 
                skills: ['Docker', 'Tableau', 'OpenAI API', 'Speech-to-Text', 'Power Apps', 'Liferay CMS', 'Brightspace', 'Sakai', 'Git', 'GitHub', 'Jira'] 
              }
            ].map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="interactive-card" 
                style={{ 
                  background: theme.cardBg, 
                  border: `1px solid ${theme.cardBorder}`, 
                  padding: '2.2rem', 
                  borderRadius: '1.2rem', 
                  backdropFilter: 'blur(12px)', 
                  boxShadow: theme.cardShadow,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(56, 189, 248, 0.15)' : '0 20px 40px rgba(2, 132, 199, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = theme.cardBorder;
                  e.currentTarget.style.boxShadow = theme.cardShadow;
                }}
              >
                <div>
                  <h3 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '1.2rem', fontWeight: 700 }}>
                    {category.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        style={{
                          display: 'inline-block',
                          padding: '0.4rem 0.9rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                          color: isDarkMode ? '#38bdf8' : '#0284c7',
                          border: `1px solid ${isDarkMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)'}`,
                          transition: 'all 0.25s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ef4444';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.borderColor = '#ef4444';
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)';
                          e.currentTarget.style.color = isDarkMode ? '#38bdf8' : '#0284c7';
                          e.currentTarget.style.borderColor = isDarkMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)';
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </section>

        {/* SECTION 6: EDUCATION */}
        <section id="education" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#ef4444' }}
          >
            Education
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px' }}>
            
            {[
              {
                institution: "Marist College",
                degree: "Master of Science, Information Systems",
                duration: "Jan 2025 – Dec 2026",
                gpa: "GPA: 3.845"
              },
              {
                institution: "Keshav Memorial Institute Of Technology",
                degree: "Bachelor of Technology, Computer Science & Machine Learning (CSM)",
                duration: "Aug 2020 – May 2024",
                gpa: "GPA: 3.5"
              }
            ].map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="interactive-card" 
                style={{ 
                  background: theme.cardBg, 
                  border: `1px solid ${theme.cardBorder}`, 
                  padding: '2.2rem', 
                  borderRadius: '1.2rem', 
                  backdropFilter: 'blur(12px)', 
                  boxShadow: theme.cardShadow,
                  transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(239, 68, 68, 0.12)' : '0 20px 40px rgba(239, 68, 68, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = theme.cardBorder;
                  e.currentTarget.style.boxShadow = theme.cardShadow;
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: theme.textMain, fontWeight: 700, margin: 0 }}>
                    {edu.institution}
                  </h3>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 700, 
                    color: '#ef4444', 
                    backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                  }}>
                    {edu.gpa}
                  </span>
                </div>
                <h4 style={{ color: '#0284c7', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {edu.degree}
                </h4>
                <p style={{ color: theme.textMuted, fontSize: '0.9rem', margin: 0 }}>
                  {edu.duration}
                </p>
              </motion.div>
            ))}

          </div>
        </section>

        {/* SECTION 7: CONTACT */}
        <section id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 8vw' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          >
            <h2 style={{ fontSize: 'clamp(2.8rem, 7vw, 4rem)', fontWeight: 900, marginBottom: '1rem', color: theme.textMain }}>
              Let's Connect
            </h2>
            <p style={{ color: theme.textMuted, fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '3rem', maxWidth: '600px' }}>
              Poughkeepsie, New York • (551) 297-5781 • vishnukaushikvarma@gmail.com
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a 
                href="mailto:vishnukaushikvarma@gmail.com" 
                style={{ 
                  background: '#ef4444', 
                  color: '#fff', 
                  padding: '1rem 2.8rem', 
                  borderRadius: '50px', 
                  textDecoration: 'none', 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  boxShadow: '0 4px 20px rgba(239, 68, 68, 0.35)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.35)';
                }}
              >
                Email Me
              </a>
              <a 
                href="https://linkedin.com/in/vishnukaushikvarma" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  background: 'transparent', 
                  border: '2px solid #0284c7', 
                  color: '#0284c7', 
                  padding: '1rem 2.8rem', 
                  borderRadius: '50px', 
                  textDecoration: 'none', 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0284c7';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(2, 132, 199, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#0284c7';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  )
}