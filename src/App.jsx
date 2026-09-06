import React, { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Canvas } from '@react-three/fiber'
import './index.css'

import PremiumCursor from './components/PremiumCursor'
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
    // Warm, eye-friendly backgrounds
    bg: isDarkMode ? '#09090b' : '#fafaf8',
    bgSubtle: isDarkMode ? '#18181b' : '#f3f2ee',
    bgCard: isDarkMode ? '#111114' : '#ffffff',
    bgCardAlt: isDarkMode ? '#18181b' : '#f8f7f4',

    // Soft text colors (not pure black/white for eye comfort)
    textMain: isDarkMode ? '#fafafa' : '#1c1917',
    textMuted: isDarkMode ? '#71717a' : '#78716c',
    textAccent: isDarkMode ? '#d4a853' : '#b45309',

    // Warm card surfaces
    cardBg: isDarkMode ? 'rgba(17, 17, 20, 0.88)' : 'rgba(255, 255, 255, 0.88)',
    cardBgHover: isDarkMode ? 'rgba(28, 28, 31, 0.92)' : 'rgba(255, 255, 255, 0.98)',
    cardBorder: isDarkMode ? 'rgba(212, 168, 83, 0.15)' : 'rgba(161, 98, 7, 0.15)',
    cardBorderHover: isDarkMode ? 'rgba(212, 168, 83, 0.35)' : 'rgba(161, 98, 7, 0.35)',
    cardShadow: isDarkMode ? '0 8px 40px rgba(0, 0, 0, 0.5)' : '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
    cardGlow: isDarkMode ? '0 0 40px rgba(212, 168, 83, 0.12)' : '0 0 40px rgba(161, 98, 7, 0.08)',

    // Navigation
    navBg: isDarkMode ? 'rgba(9, 9, 11, 0.88)' : 'rgba(250, 250, 248, 0.92)',
    navBorder: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',

    // Accent colors — softer variants for light mode
    accent1: isDarkMode ? '#d4a853' : '#b45309',   // Warm amber gold
    accent1Light: isDarkMode ? '#d4a85320' : '#b4530915',
    accent1Mid: isDarkMode ? '#d4a85340' : '#b4530930',
    accent2: isDarkMode ? '#2dd4bf' : '#0f766e',   // Muted teal
    accent2Light: isDarkMode ? '#2dd4bf15' : '#0f766e12',
    accent3: isDarkMode ? '#8b5cf6' : '#6d28d9',   // Deep violet
    accent3Light: isDarkMode ? '#8b5cf615' : '#6d28d912',
    accent4: isDarkMode ? '#f97316' : '#c2410c',   // Warm orange
    accent4Light: isDarkMode ? '#f9731615' : '#c2410c12',
  }

  // Sync body background color with theme (since index.css has hardcoded body bg)
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg
    document.body.style.color = theme.textMain
    document.body.style.transition = 'background-color 0.35s ease, color 0.35s ease'
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

      <PremiumCursor theme={theme} />

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