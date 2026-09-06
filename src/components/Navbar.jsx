import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({
  theme,
  isDarkMode,
  setIsDarkMode,
  activeSection,
  currentPage,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  playClickSound,
  onOpenCommandPalette,
}) {
  const [scrolled, setScrolled] = useState(false)
  const navSections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact']

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 4vw',
        backgroundColor: scrolled ? theme.navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid ' + (scrolled ? theme.cardBorder : 'transparent'),
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <a
          href="#home"
          onClick={() => {
            playClickSound && playClickSound()
            setCurrentPage('portfolio')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              padding: '2px',
              background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
              boxShadow: '0 4px 12px ' + theme.accent1 + '40',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                background: isDarkMode ? '#18181b' : '#f4f4f5',
              }}
            >
              <img
                src="/vishnu-photo.png"
                alt="VK"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 18%',
                  display: 'block',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: '0.9rem',
                color: theme.textMain,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Vishnu Kaushik
            </span>
            <span
              style={{
                fontWeight: 500,
                fontSize: '0.62rem',
                color: theme.accent1,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Portfolio
            </span>
          </div>
        </a>
      </div>

      {/* Desktop nav */}
      <div className="desktop-nav-links" style={{ alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.3rem' }}>
          {navSections.map((section) => {
            const isActive = activeSection === section && currentPage === 'portfolio'
            return (
              <a
                key={section}
                href={'#' + section}
                onClick={() => {
                  playClickSound && playClickSound()
                  setCurrentPage('portfolio')
                }}
                style={{
                  color: isActive ? theme.accent1 : theme.textMuted,
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.78rem',
                  padding: '4px 2px',
                  position: 'relative',
                  transition: 'color 0.2s',
                  display: 'inline-block',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = theme.textMain
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = theme.textMuted
                }}
              >
                {section}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
                      borderRadius: '999px',
                      boxShadow: '0 0 8px ' + theme.accent1,
                    }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.8rem' }}>
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              title="Command Palette (⌘K)"
              style={{
                background: theme.cardBg,
                border: '1px solid ' + theme.cardBorder,
                color: theme.textMuted,
                padding: '0.45rem 0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>⌘K</span>
            </button>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle theme"
            style={{
              background: theme.cardBg,
              border: '1px solid ' + theme.cardBorder,
              color: theme.textMain,
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorderFocus
              e.currentTarget.style.boxShadow = '0 0 12px ' + theme.accent1 + '30'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {isDarkMode ? '☀' : '☾'}
          </button>

          <button
            onClick={() => {
              playClickSound && playClickSound()
              setCurrentPage('ai-resume')
            }}
            style={{
              background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
              border: 'none',
              color: '#09090b',
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px ' + theme.accent1 + '40',
              transition: 'all 0.2s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 24px ' + theme.accent1 + '60'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px ' + theme.accent1 + '40'
            }}
          >
            AI Resume
          </button>
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mobile-controls" style={{ alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            background: theme.cardBg,
            border: '1px solid ' + theme.cardBorder,
            color: theme.textMain,
            padding: '0.4rem 0.7rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          {isDarkMode ? '☀' : '☾'}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: theme.cardBg,
            border: '1px solid ' + theme.cardBorder,
            color: theme.textMain,
            padding: '0.4rem 0.7rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 700,
            backdropFilter: 'blur(8px)',
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="mobile-dropdown-menu" style={{ backdropFilter: 'blur(24px)' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
          }}
        />

        {navSections.map((section) => {
          const isActive = activeSection === section && currentPage === 'portfolio'
          return (
            <a
              key={section}
              href={'#' + section}
              onClick={() => {
                setMobileMenuOpen(false)
                playClickSound && playClickSound()
                setCurrentPage('portfolio')
              }}
              style={{
                color: isActive ? theme.accent1 : theme.textMain,
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: '1rem',
                position: 'relative',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.4rem 0',
              }}
            >
              {section}
            </a>
          )
        })}
        <button
          onClick={() => {
            setMobileMenuOpen(false)
            playClickSound && playClickSound()
            setCurrentPage('ai-resume')
          }}
          style={{
            background: 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')',
            color: '#09090b',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          ✨ AI Resume
        </button>
      </div>
    </nav>
  )
}
