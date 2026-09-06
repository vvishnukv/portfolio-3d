import React, { useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '../data/portfolioData'
import { TiltCard, reveal3D } from '../utils/microInteractions'
import ProjectModal from '../components/ProjectModal'

const FILTERS = [
  { id: 'all', label: 'All Work' },
  { id: 'data', label: 'Data & Analytics' },
  { id: 'ai', label: 'AI & Cloud' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'fullstack', label: 'Full-Stack' },
]

function getCategory(project) {
  const tech = project.tech.toLowerCase()
  if (tech.includes('flutter') || tech.includes('dart')) return 'mobile'
  if (tech.includes('python') || tech.includes('tableau') || tech.includes('pandas')) return 'data'
  if (tech.includes('openai') || tech.includes('docker') || tech.includes('gcp')) return 'ai'
  if (tech.includes('node') || tech.includes('mongodb') || tech.includes('express')) return 'fullstack'
  return 'all'
}

export default function ProjectsSection({ theme, isDarkMode, searchQuery, setSearchQuery }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const cardRefs = useRef({})

  const handleOpenModal = (project, idx) => {
    const rect = cardRefs.current[idx] && cardRefs.current[idx].getBoundingClientRect()
    setSelectedProject({
      project,
      rect: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null,
    })
  }
  const handleCloseModal = () => setSelectedProject(null)

  const filteredProjects = useMemo(() => {
    return projectsData.filter((proj) => {
      const matchesSearch =
        !searchQuery ||
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tech.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = activeFilter === 'all' || getCategory(proj) === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

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
      {/* Header */}
      <div
        style={{
          padding: '0 3vw',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: theme.accent1,
              marginBottom: '0.5rem',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '1.5px',
                background: 'linear-gradient(90deg, var(--gold), var(--teal))',
                borderRadius: '2px',
              }}
            />
            Selected Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="display-heading shimmer-text"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Featured Projects
            {searchQuery && (
              <span
                style={{
                  fontSize: '1.1rem',
                  color: theme.textMuted,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  display: 'block',
                  marginTop: '0.5rem',
                  fontFamily: 'var(--font-body)',
                }}
              >
                filtered by "{searchQuery}"
              </span>
            )}
          </motion.h2>
        </div>

        {/* Search bar */}
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
            border: '1.5px solid ' + theme.cardBorderFocus,
            background: theme.cardBg,
            padding: '0.5rem 1.2rem',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 20px ' + theme.accent1 + '20',
          }}
        >
          <span style={{ fontSize: '0.95rem', marginRight: '8px', opacity: 0.7 }}>⌘</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.textMain,
              fontSize: '0.9rem',
              fontWeight: 500,
              outline: 'none',
              width: '240px',
              fontFamily: 'var(--font-body)',
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

      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0 3vw',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}
      >
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.id
          return (
            <motion.button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: isActive
                  ? 'linear-gradient(135deg, ' + theme.accent1 + ', ' + theme.accent2 + ')'
                  : theme.cardBg,
                color: isActive ? (isDarkMode ? '#09090b' : '#ffffff') : theme.textMuted,
                border: '1px solid ' + (isActive ? 'transparent' : theme.cardBorder),
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 4px 16px ' + theme.accent1 + '30' : 'none',
              }}
            >
              {f.label}
            </motion.button>
          )
        })}
      </div>

      {/* Project grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          padding: '0 3vw',
        }}
      >
        {filteredProjects.length === 0 ? (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              color: theme.textMuted,
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>
              No projects found matching your criteria
            </div>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              style={{
                marginTop: '1.5rem',
                padding: '0.6rem 1.5rem',
                background: 'transparent',
                border: '1.5px solid ' + theme.accent1,
                borderRadius: '999px',
                color: theme.accent1,
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Clear filters
            </button>
          </div>
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
                  padding: '1.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '100%',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.7rem',
                      marginTop: '0.4rem',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        color: theme.textMain,
                        margin: 0,
                        fontWeight: 700,
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
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
                        fontSize: '0.82rem',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      ↗
                    </a>
                  </div>

                  <p
                    style={{
                      color: theme.textMuted,
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      marginBottom: '1.3rem',
                    }}
                  >
                    {project.desc}
                  </p>

                  <div style={{ marginBottom: '1.3rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {project.tech.split('•').map((t, i) => (
                        <span
                          key={i}
                          className="skill-badge"
                          style={{
                            fontSize: '0.68rem',
                            padding: '0.2rem 0.6rem',
                            fontWeight: 600,
                            letterSpacing: '0.03em',
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
                    justifyContent: 'flex-start',
                    gap: '0.6rem',
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
                      padding: '0.5rem 1.2rem',
                      borderRadius: '999px',
                      border: '1px solid ' + theme.cardBorder,
                      background: theme.accent1 + '10',
                      color: theme.accent1,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.accent1
                      e.currentTarget.style.color = isDarkMode ? '#09090b' : '#ffffff'
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme.accent1 + '10'
                      e.currentTarget.style.color = theme.accent1
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
                        padding: '0.5rem 1.2rem',
                        borderRadius: '999px',
                        border: '1px solid ' + theme.accent2 + '40',
                        background: theme.accent2 + '10',
                        color: theme.accent2,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.accent2
                        e.currentTarget.style.color = isDarkMode ? '#09090b' : '#ffffff'
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme.accent2 + '10'
                        e.currentTarget.style.color = theme.accent2
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    >
                      Dashboard
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))
        )}
      </div>

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
