import React, { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Canvas } from '@react-three/fiber'
import './index.css'

import SpidermanCursor from './components/SpidermanCursor'
import SpidermanEasterEgg from './components/SpidermanEasterEgg'
import HyperComplexBackground from './components/HyperComplexBackground'
import Navbar from './components/Navbar'

import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ExperienceSection from './sections/ExperienceSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import EducationSection from './sections/EducationSection'
import ContactSection from './sections/ContactSection'

import AIResumePage from './pages/AIResumePage'
import { playClickSound } from './utils/audio'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentPage, setCurrentPage] = useState('portfolio')
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  // New futuristic theme palette
  const theme = {
    bg: isDarkMode ? '#0a0e17' : '#f5f3ef',
    bgSubtle: isDarkMode ? '#111827' : '#ede9e1',
    textMain: isDarkMode ? '#f8fafc' : '#1c1917',
    textMuted: isDarkMode ? '#a3a8b8' : '#44403c',
    textAccent: isDarkMode ? '#e6fffa' : '#0d9488',
    cardBg: isDarkMode ? 'rgba(10, 14, 23, 0.75)' : 'rgba(255, 253, 249, 0.96)',
    cardBgHover: isDarkMode ? 'rgba(15, 19, 28, 0.8)' : 'rgba(255, 255, 255, 1)',
    cardBorder: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(180, 168, 150, 0.45)',
    cardBorderFocus: isDarkMode ? 'rgba(0, 212, 170, 0.35)' : 'rgba(13, 148, 136, 0.4)',
    cardShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
    cardGlow: isDarkMode ? '0 0 30px rgba(0, 212, 170, 0.15)' : '0 0 30px rgba(13, 148, 136, 0.12)',
    navBg: isDarkMode ? 'rgba(10, 14, 23, 0.8)' : 'rgba(245, 243, 239, 0.95)',
    accent1: isDarkMode ? '#00d4aa' : '#0d9488',
    accent2: isDarkMode ? '#0066ff' : '#1e40af',
    accent3: isDarkMode ? '#ff00a8' : '#be185d',
    accent4: isDarkMode ? '#7928ca' : '#7e22ce',
  }

  // Sync body background color with theme (since index.css has hardcoded body bg)
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg
    document.body.style.color = theme.textMain
  }, [theme.bg, theme.textMain])

  // Active section scroll watcher + scroll progress
  useEffect(() => {
    if (currentPage !== 'portfolio') return
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
      // Update scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  return (
    <div
      className={isDarkMode ? '' : 'light-mode'}
      style={{
        width: '100vw',
        maxWidth: '100%',
        overflowX: 'hidden',
        backgroundColor: theme.bg,
        color: theme.textMain,
        position: 'relative',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        minHeight: '100vh',
      }}
    >

      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      
      {/* Mobile Dropdown Style Override when opened */}
      <style>{`
        @media (max-width: 950px) {
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
      <SpidermanEasterEgg />

      <Navbar
        theme={theme}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activeSection={activeSection}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        playClickSound={playClickSound}
      />

      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
          <ambientLight intensity={isDarkMode ? 0.6 : 1.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -20, -10]} intensity={1} color="#00d4aa" />
          <HyperComplexBackground isDarkMode={isDarkMode} />
        </Canvas>
      </div>

      {/* View Switcher: AI Resume Page vs Portfolio Sections */}
      {currentPage === 'ai-resume' ? (
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <AIResumePage
            theme={theme}
            isDarkMode={isDarkMode}
            playClickSound={playClickSound}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <HeroSection theme={theme} />
          <AboutSection theme={theme} isDarkMode={isDarkMode} />
          <ExperienceSection theme={theme} isDarkMode={isDarkMode} />
          <ProjectsSection
            theme={theme}
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <SkillsSection
            theme={theme}
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
          />
          <EducationSection theme={theme} isDarkMode={isDarkMode} />
          <ContactSection
            theme={theme}
            isDarkMode={isDarkMode}
            playClickSound={playClickSound}
          />
        </div>
      )}
      {/* Vercel Web Analytics Component */}
      <Analytics />
    </div>
  )
}