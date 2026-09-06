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

  // Premium "Liquid Glass" theme palette - Billion-dollar design system
  const theme = {
    bg: isDarkMode ? '#09090b' : '#fafaf9',
    bgSubtle: isDarkMode ? '#18181b' : '#f4f4f5',
    textMain: isDarkMode ? '#fafafa' : '#09090b',
    textMuted: isDarkMode ? '#71717a' : '#52525b',
    textAccent: isDarkMode ? '#d4a853' : '#a16207',
    cardBg: isDarkMode ? 'rgba(24, 24, 27, 0.85)' : 'rgba(255, 255, 255, 0.9)',
    cardBgHover: isDarkMode ? 'rgba(39, 39, 42, 0.9)' : 'rgba(255, 255, 255, 1)',
    cardBorder: isDarkMode ? 'rgba(212, 168, 83, 0.15)' : 'rgba(161, 98, 7, 0.2)',
    cardBorderFocus: isDarkMode ? 'rgba(212, 168, 83, 0.4)' : 'rgba(161, 98, 7, 0.5)',
    cardShadow: isDarkMode ? '0 8px 40px rgba(0, 0, 0, 0.5)' : '0 8px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
    cardGlow: isDarkMode ? '0 0 40px rgba(212, 168, 83, 0.12)' : '0 0 40px rgba(161, 98, 7, 0.1)',
    navBg: isDarkMode ? 'rgba(9, 9, 11, 0.85)' : 'rgba(250, 250, 249, 0.92)',
    accent1: isDarkMode ? '#d4a853' : '#a16207',   // Gold - primary
    accent2: isDarkMode ? '#2dd4bf' : '#0d9488',   // Teal - secondary
    accent3: isDarkMode ? '#8b5cf6' : '#7c3aed',  // Violet - tertiary
    accent4: isDarkMode ? '#f97316' : '#c2410c',   // Orange - quaternary
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
          <HeroSection theme={theme} isDarkMode={isDarkMode} />
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