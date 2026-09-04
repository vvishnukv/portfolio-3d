import React from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '../data/portfolioData'
import { TiltCard, reveal3D } from '../utils/microInteractions'

export default function SkillsSection({ theme, isDarkMode, searchQuery }) {
  return (
    <section
      id="skills"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8vh 8vw',
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
          marginBottom: '2.5rem',
          letterSpacing: '-0.01em',
        }}
      >
        Technical Skills
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {skillsData.map((category, idx) => {
          const matchedSkills = category.skills.filter(
            (skill) =>
              skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
              category.title.toLowerCase().includes(searchQuery.toLowerCase())
          )

          if (searchQuery && matchedSkills.length === 0) return null

          return (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal3D}
              custom={idx}
            >
              <TiltCard
                theme={theme}
                style={{
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '100%',
                }}
              >
              {/* Category icon area */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.2rem',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `linear-gradient(135deg, ${theme.accent1}25, ${theme.accent2}25)`,
                    border: `1px solid ${theme.accent1}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  {idx === 0 ? '💻' : idx === 1 ? '⚛️' : idx === 2 ? '☁️' : '🛠️'}
                </div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: theme.textMain,
                    margin: 0,
                  }}
                >
                  {category.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {category.skills.map((skill, sIdx) => {
                  const isHighlighted =
                    searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase())
                  return (
                    <span
                      key={sIdx}
                      style={{
                        display: 'inline-block',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '999px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        background: isHighlighted
                          ? `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`
                          : isDarkMode
                            ? `linear-gradient(135deg, ${theme.accent1}12, ${theme.accent2}12)`
                            : 'rgba(13,148,136,0.1)',
                        color: isHighlighted ? '#fff' : theme.accent1,
                        border: `1px solid ${isHighlighted ? 'transparent' : isDarkMode ? theme.accent1 + '30' : 'rgba(13,148,136,0.25)'}`,
                        transition: 'all 0.25s ease',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-display)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isHighlighted) {
                          e.currentTarget.style.background = isDarkMode
                            ? `linear-gradient(135deg, ${theme.accent1}30, ${theme.accent2}30)`
                            : 'rgba(13,148,136,0.2)'
                          e.currentTarget.style.borderColor = theme.accent1
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                          e.currentTarget.style.boxShadow = isDarkMode
                            ? `0 4px 12px ${theme.accent1}30`
                            : '0 4px 12px rgba(13,148,136,0.15)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isHighlighted) {
                          e.currentTarget.style.background = isDarkMode
                            ? `linear-gradient(135deg, ${theme.accent1}12, ${theme.accent2}12)`
                            : 'rgba(13,148,136,0.1)'
                          e.currentTarget.style.borderColor = isDarkMode ? theme.accent1 + '30' : 'rgba(13,148,136,0.25)'
                          e.currentTarget.style.transform = 'translateY(0) scale(1)'
                          e.currentTarget.style.boxShadow = 'none'
                        }
                      }}
                    >
                      {skill}
                    </span>
                  )
                })}
              </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
