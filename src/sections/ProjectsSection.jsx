import React from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '../data/portfolioData'

export default function ProjectsSection({ theme, isDarkMode, searchQuery, setSearchQuery }) {
  const filteredProjects = projectsData.filter(proj =>
    proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.tech.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 5vw' }}>
      <div style={{ padding: '0 3vw', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#0284c7', margin: 0 }}
        >
          Featured Projects {searchQuery && <span style={{ fontSize: '1.2rem', color: theme.textMuted }}>(Filtered by "{searchQuery}")</span>}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="project-search-container shine-effect"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '30px',
            border: '2px solid #38bdf8',
            backgroundColor: theme.cardBg,
            padding: '0.5rem 1.2rem',
            backdropFilter: 'blur(12px)',
            boxShadow: isDarkMode ? '0 0 20px rgba(56, 189, 248, 0.2)' : '0 8px 25px rgba(2, 132, 199, 0.12)'
          }}
        >
          <span style={{ fontSize: '1rem', marginRight: '8px' }}>⚡</span>
          <input
            type="text"
            placeholder="Search projects (e.g., Docker, Python)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.textMain,
              fontSize: '0.95rem',
              fontWeight: 600,
              outline: 'none',
              width: '260px',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: '#ef4444',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '8px'
              }}
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '0 3vw' }}>
        {filteredProjects.length === 0 ? (
          <p style={{ color: theme.textMuted, gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem' }}>No projects found matching "{searchQuery}"</p>
        ) : (
          filteredProjects.map((project, idx) => (
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
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'
                e.currentTarget.style.borderColor = '#38bdf8'
                e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(56, 189, 248, 0.15)' : '0 20px 40px rgba(2, 132, 199, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = theme.cardBorder
                e.currentTarget.style.boxShadow = theme.cardShadow
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
                    e.currentTarget.style.backgroundColor = '#ef4444'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.borderColor = '#ef4444'
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.textContent = 'GitHub ↗'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)'
                    e.currentTarget.style.color = theme.textMain
                    e.currentTarget.style.borderColor = theme.cardBorder
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.textContent = 'View Code'
                  }}
                >
                  View Code
                </a>

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
                      e.currentTarget.style.backgroundColor = '#38bdf8'
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.borderColor = '#38bdf8'
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.textContent = 'Tableau ↗'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)'
                      e.currentTarget.style.color = theme.textMain
                      e.currentTarget.style.borderColor = theme.cardBorder
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.textContent = 'View Dashboard'
                    }}
                  >
                    View Dashboard
                  </a>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  )
}