import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import './index.css'

import SpidermanCursor from './components/SpidermanCursor'
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

  const theme = {
    bg: isDarkMode ? '#030712' : '#eef2f6',
    textMain: isDarkMode ? '#f9fafb' : '#1e293b',
    textMuted: isDarkMode ? '#9ca3af' : '#64748b',
    cardBg: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.92)',
    cardBorder: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(148, 163, 184, 0.25)',
    cardShadow: isDarkMode ? 'none' : '0 12px 32px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)',
    navBg: isDarkMode ? 'rgba(3, 7, 18, 0.9)' : 'rgba(238, 242, 246, 0.92)',
  }

  // Active section scroll watcher
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  return (
    <div style={{ width: '100vw', maxWidth: '100%', overflowX: 'hidden', backgroundColor: theme.bg, color: theme.textMain, position: 'relative', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
      
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
          <pointLight position={[-10, -20, -10]} intensity={1} color="#ef4444" />
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
    </div>
  )
}