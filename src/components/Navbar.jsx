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
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.cardBorder}`,
      zIndex: 1000,
      boxShadow: isDarkMode ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.03)'
    }}>
      {/* 1. Brand / Marquee Name */}
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '180px', flexShrink: 0 }}>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'smoothMarquee 8s linear infinite' }}>
          <span style={{ display: 'inline-block', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px', color: '#ef4444', paddingRight: '20px' }}>
            Vishnu Kaushik Varma &bull;
          </span>
          <span style={{ display: 'inline-block', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '1px', color: '#ef4444', paddingRight: '20px' }}>
            Vishnu Kaushik Varma &bull;
          </span>
        </div>
      </div>

      {/* 2. Desktop Navigation & Action Buttons */}
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
                  color: isActive ? '#ef4444' : theme.textMain,
                  textDecoration: 'none',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.85rem',
                  padding: '4px 2px',
                  borderBottom: isActive ? '2px solid #ef4444' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  display: 'inline-block'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            )
          })}
        </div>

        {/* Buttons Group (Row) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.06)',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMain,
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <button
            onClick={() => { playClickSound(); setCurrentPage('ai-resume'); }}
            style={{
              background: currentPage === 'ai-resume' ? '#38bdf8' : 'rgba(56, 189, 248, 0.15)',
              border: '1px solid #38bdf8',
              color: currentPage === 'ai-resume' ? '#030712' : '#38bdf8',
              padding: '0.45rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
              whiteSpace: 'nowrap'
            }}
          >
            ✨ AI Resume
          </button>
        </div>
      </div>

      {/* 3. Mobile Hamburger & Theme Controls */}
      <div className="mobile-controls" style={{ alignItems: 'center', gap: '0.6rem' }}>
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
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 4. Mobile Dropdown Menu Drawer */}
      <div className="mobile-dropdown-menu">
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
        <button
          onClick={() => {
            setMobileMenuOpen(false)
            playClickSound()
            setCurrentPage('ai-resume')
          }}
          style={{
            background: '#38bdf8',
            color: '#030712',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          ✨ AI Resume
        </button>
      </div>
    </nav>
  )
}