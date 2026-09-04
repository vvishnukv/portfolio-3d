import React from 'react'

export default function Navbar({
  theme,
  isDarkMode,
  setIsDarkMode,
  activeSection,
  currentPage,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  playClickSound
}) {
  const navSections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '70px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 4vw',
      backgroundColor: theme.navBg,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${theme.cardBorder}`,
      zIndex: 1000,
      boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.03)',
    }}>
      {/* Brand / Logo — Clean wordmark */}
      <div style={{ flexShrink: 0 }}>
        <a
          href="#home"
          onClick={() => { playClickSound(); setCurrentPage('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          {/* Avatar initials */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: '#fff',
            boxShadow: `0 0 16px ${theme.accent1}50`,
          }}>
            VK
          </div>

          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontWeight: 800,
              fontSize: '0.9rem',
              color: theme.textMain,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}>
              Vishnu Kaushik
            </span>
            <span style={{
              fontWeight: 500,
              fontSize: '0.65rem',
              color: theme.textMuted,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Portfolio
            </span>
          </div>
        </a>
      </div>

      {/* Desktop Navigation & Action Buttons */}
      <div className="desktop-nav-links" style={{ alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {navSections.map((section) => {
            const isActive = activeSection === section && currentPage === 'portfolio'
            return (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => { playClickSound(); setCurrentPage('portfolio'); }}
                style={{
                  color: isActive ? theme.accent1 : theme.textMuted,
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.85rem',
                  padding: '4px 2px',
                  position: 'relative',
                  transition: 'color 0.2s',
                  display: 'inline-block',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = theme.textMain }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = theme.textMuted }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
                    borderRadius: '999px',
                    boxShadow: `0 0 8px ${theme.accent1}`,
                  }} />
                )}
              </a>
            )
          })}
        </div>

        {/* Buttons Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorderFocus
              e.currentTarget.style.boxShadow = `0 0 12px ${theme.accent1}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.cardBorder
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => { playClickSound(); setCurrentPage('ai-resume'); }}
            style={{
              background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
              border: 'none',
              color: '#fff',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              boxShadow: `0 4px 16px ${theme.accent1}40`,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = `0 6px 24px ${theme.accent1}60`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = `0 4px 16px ${theme.accent1}40`
            }}
          >
            ✨ AI Resume
          </button>
        </div>
      </div>

      {/* Mobile Hamburger & Theme Controls */}
      <div className="mobile-controls" style={{ alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            color: theme.textMain,
            padding: '0.4rem 0.7rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
            backdropFilter: 'blur(8px)',
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
            color: theme.textMain,
            padding: '0.4rem 0.7rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 700,
            backdropFilter: 'blur(8px)',
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="mobile-dropdown-menu" style={{ backdropFilter: 'blur(24px)' }}>
        {/* Gradient top border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
        }} />

        {navSections.map((section) => {
          const isActive = activeSection === section && currentPage === 'portfolio'
          return (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => {
                setMobileMenuOpen(false)
                playClickSound()
                setCurrentPage('portfolio')
              }}
              style={{
                color: isActive ? theme.accent1 : theme.textMain,
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 600,
                fontSize: '1.1rem',
                position: 'relative',
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          )
        })}
        <button
          onClick={() => {
            setMobileMenuOpen(false)
            playClickSound()
            setCurrentPage('ai-resume')
          }}
          style={{
            background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
            color: '#fff',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          ✨ AI Resume
        </button>
      </div>
    </nav>
  )
}
