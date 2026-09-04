import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '../data/portfolioData'
import { TiltCard, reveal3D } from '../utils/microInteractions'
import ProjectModal from '../components/ProjectModal'

export default function ProjectsSection({ theme, isDarkMode, searchQuery, setSearchQuery }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const cardRefs = useRef({})

  const handleOpenModal = (project, idx) => {
    const rect = cardRefs.current[idx]?.getBoundingClientRect()
    setSelectedProject({
      project,
      rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
    })
  }
  const handleCloseModal = () => setSelectedProject(null)

  const filteredProjects = projectsData.filter(proj =>
    proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.tech.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section
      id="projects"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8vh 5vw',
      }}
    >
      <div
        style={{
          padding: '0 3vw',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-text"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Featured Projects{' '}
          {searchQuery && (
            <span
              style={{
                fontSize: '1.2rem',
                color: theme.textMuted,
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              (Filtered by "{searchQuery}")
            </span>
          )}
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
            borderRadius: '999px',
            border: `1.5px solid ${theme.cardBorderFocus}`,
            background: theme.cardBg,
            padding: '0.5rem 1.2rem',
            backdropFilter: 'blur(16px)',
            boxShadow: isDarkMode ? `0 0 20px ${theme.accent1}30` : '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <span style={{ fontSize: '1rem', marginRight: '8px' }}>⚡</span>
          <input
            type="text"
            placeholder="Search projects or type 'SPIDER'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.textMain,
              fontSize: '0.95rem',
              fontWeight: 500,
              outline: 'none',
              width: '260px',
              fontFamily: 'var(--font-display)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: theme.accent3,
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '8px',
                fontWeight: 700,
              }}
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          padding: '0 3vw',
        }}
      >
        {filteredProjects.length === 0 ? (
          <p
            style={{
              color: theme.textMuted,
              gridColumn: '1 / -1',
              textAlign: 'center',
              fontSize: '1.2rem',
            }}
          >
            No projects found matching "{searchQuery}"
          </p>
        ) : (
          filteredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal3D}
              custom={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
            >
              <TiltCard
                theme={theme}
                onClick={() => handleOpenModal(project, idx)}
                style={{
                  padding: '2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '100%',
                }}
              >
              {/* Top gradient strip */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2}, ${theme.accent3})`,
                }}
              />

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.8rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      color: theme.textMain,
                      margin: 0,
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: theme.accent1,
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    GitHub ↗
                  </a>
                </div>

                <p
                  style={{
                    color: theme.textMuted,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {project.desc}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                    }}
                  >
                    {project.tech.split('•').map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '999px',
                          background: `linear-gradient(135deg, ${theme.accent1}18, ${theme.accent2}18)`,
                          color: theme.accent1,
                          border: `1px solid ${theme.accent1}30`,
                        }}
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  width: '100%',
                  marginTop: 'auto',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    padding: '0.55rem 1.4rem',
                    borderRadius: '999px',
                    border: `1px solid ${isDarkMode ? theme.cardBorder : 'rgba(13,148,136,0.3)'}`,
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${theme.accent1}15, ${theme.accent2}15)`
                      : 'rgba(13,148,136,0.08)',
                    color: isDarkMode ? theme.textMain : '#0d9488',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDarkMode
                      ? `linear-gradient(135deg, ${theme.accent1}15, ${theme.accent2}15)`
                      : 'rgba(13,148,136,0.08)'
                    e.currentTarget.style.color = isDarkMode ? theme.textMain : '#0d9488'
                    e.currentTarget.style.borderColor = isDarkMode ? theme.cardBorder : 'rgba(13,148,136,0.3)'
                    e.currentTarget.style.transform = 'scale(1)'
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
                      padding: '0.55rem 1.4rem',
                      borderRadius: '999px',
                      border: `1px solid ${isDarkMode ? theme.cardBorder : 'rgba(190,24,93,0.3)'}`,
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${theme.accent3}15, ${theme.accent4}15)`
                        : 'rgba(190,24,93,0.08)',
                      color: isDarkMode ? theme.textMain : '#be185d',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${theme.accent3}, ${theme.accent4})`
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDarkMode
                        ? `linear-gradient(135deg, ${theme.accent3}15, ${theme.accent4}15)`
                        : 'rgba(190,24,93,0.08)'
                      e.currentTarget.style.color = isDarkMode ? theme.textMain : '#be185d'
                      e.currentTarget.style.borderColor = isDarkMode ? theme.cardBorder : 'rgba(190,24,93,0.3)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    View Dashboard
                  </a>
                )}
              </div>
              </TiltCard>
            </motion.div>
          ))
        )}
      </div>

      {/* Click-to-expand project modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject.project}
          theme={theme}
          isDarkMode={isDarkMode}
          onClose={handleCloseModal}
          originRect={selectedProject.rect}
        />
      )}
    </section>
  )
}
