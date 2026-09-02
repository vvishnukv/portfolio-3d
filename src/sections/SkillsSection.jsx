import React from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '../data/portfolioData'

export default function SkillsSection({ theme, isDarkMode, searchQuery }) {
  return (
    <section id="skills" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 8vw' }}>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#0284c7' }}>
        Technical Skills
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {skillsData.map((category, idx) => {
          const matchedSkills = category.skills.filter(skill =>
            skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.title.toLowerCase().includes(searchQuery.toLowerCase())
          )

          if (searchQuery && matchedSkills.length === 0) return null

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="interactive-card"
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                padding: '2.2rem',
                borderRadius: '1.2rem',
                backdropFilter: 'blur(12px)',
                boxShadow: theme.cardShadow,
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
                <h3 style={{ color: '#ef4444', fontSize: '1.25rem', marginBottom: '1.2rem', fontWeight: 700 }}>
                  {category.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {category.skills.map((skill, sIdx) => {
                    const isHighlighted = searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase())
                    return (
                      <span
                        key={sIdx}
                        style={{
                          display: 'inline-block',
                          padding: '0.4rem 0.9rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: isHighlighted ? '#ef4444' : (isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)'),
                          color: isHighlighted ? '#ffffff' : (isDarkMode ? '#38bdf8' : '#0284c7'),
                          border: `1px solid ${isHighlighted ? '#ef4444' : (isDarkMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)')}`,
                          transition: 'all 0.25s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ef4444'
                          e.currentTarget.style.color = '#ffffff'
                          e.currentTarget.style.borderColor = '#ef4444'
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isHighlighted ? '#ef4444' : (isDarkMode ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)')
                          e.currentTarget.style.color = isHighlighted ? '#ffffff' : (isDarkMode ? '#38bdf8' : '#0284c7')
                          e.currentTarget.style.borderColor = isHighlighted ? '#ef4444' : (isDarkMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)')
                          e.currentTarget.style.transform = 'translateY(0) scale(1)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}