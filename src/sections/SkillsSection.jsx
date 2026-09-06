import React from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '../data/portfolioData'
import { TiltCard, reveal3D } from '../utils/microInteractions'

const CATEGORY_ICONS = ['💻', '⚛️', '☁️', '🛠️']
const CATEGORY_COLORS = ['#d4a853', '#2dd4bf', '#8b5cf6', '#f97316']

export default function SkillsSection({ theme, isDarkMode, searchQuery }) {
  return (
    <section
      id="skills"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8vh 8vw',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
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
            marginBottom: '0.75rem',
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
          Tech Stack
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
          Technical Skills
        </motion.h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {skillsData.map((category, idx) => {
          const accentColor = CATEGORY_COLORS[idx]
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
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '100%',
                }}
              >
                {/* Category header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    marginBottom: '1.4rem',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(135deg, ' + accentColor + '25, ' + accentColor + '10)',
                      border: '1px solid ' + accentColor + '35',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                    }}
                  >
                    {CATEGORY_ICONS[idx]}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: theme.textMain,
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Skill pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {category.skills.map((skill, sIdx) => {
                    const isHighlighted =
                      searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase())
                    return (
                      <span
                        key={sIdx}
                        className="skill-badge"
                        style={{
                          background: isHighlighted
                            ? 'linear-gradient(135deg, ' + accentColor + ', ' + CATEGORY_COLORS[(idx + 1) % 4] + ')'
                            : accentColor + '0C',
                          color: isHighlighted ? '#09090b' : accentColor,
                          border: '1px solid ' + (isHighlighted ? 'transparent' : accentColor + '30'),
                          fontWeight: 600,
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
