import React from 'react'
import { motion } from 'framer-motion'
import { TiltCard, reveal3D } from '../utils/microInteractions'

const SOFT_SKILLS = [
  {
    icon: '📣',
    skill: 'Communication & Storytelling',
    proof: 'Presented the Sakai→Brightspace migration plan to 15+ faculty members; authored clear technical docs for 50+ support-request resolutions.',
    accent: '#2dd4bf',
  },
  {
    icon: '👥',
    skill: 'Collaboration & Networking',
    proof: 'Co-led Bright Foxes outreach: 15+ faculty sessions and 50+ system inquiries resolved alongside cross-functional colleagues.',
    accent: '#8b5cf6',
  },
  {
    icon: '🧘',
    skill: 'Adaptability & Resilience',
    proof: 'Pivoted Forge Inspira event platform from in-person to QR-based registration in 30 days amid shifting requirements.',
    accent: '#f97316',
  },
  {
    icon: '🎓',
    skill: 'Leadership & Team Management',
    proof: 'Directed a 20-member dev team; hosted 5+ onboarding sessions; authored 15+ pages of SOPs; served as hackathon instructor.',
    accent: '#d4a853',
  },
  {
    icon: '🧩',
    skill: 'Problem Solving & Analytical Thinking',
    proof: 'Cut Jira ticket resolution time by 50% and boosted response rates by 30% across 100+ complex tickets.',
    accent: '#2dd4bf',
  },
  {
    icon: '🤝',
    skill: 'Emotional Intelligence & Empathy',
    proof: 'Assisted faculty across every department with Brightspace LMS through hybrid/live sessions, resolving 200+ support requests.',
    accent: '#8b5cf6',
  },
]

const IMPACT_AREAS = [
  'Team productivity & relationships',
  'Customer & client satisfaction',
  'Leadership & decision-making',
  'Promotion & advancement trajectory',
  'Ability to drive change & innovation',
]

export default function SoftSkillsSection({ theme }) {
  return (
    <section
      id="soft-skills"
      style={{
        minHeight: 'auto',
        padding: '10vh 8vw',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
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
            color: theme.accent2,
            marginBottom: '0.75rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1.5px',
              background: `linear-gradient(90deg, ${theme.accent2}, ${theme.accent1})`,
              borderRadius: '2px',
            }}
          />
          How I Work
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
          Soft Skills
        </motion.h2>
      </div>

      {/* Proof Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem',
        }}
      >
        {SOFT_SKILLS.map((item, idx) => (
          <motion.div
            key={item.skill}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal3D}
            custom={idx}
          >
            <TiltCard
              theme={theme}
              style={{
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minHeight: 'auto',
                borderLeft: `3px solid ${item.accent}`,
                background: `linear-gradient(180deg, ${item.accent}06, transparent 40%), ${theme.cardBg}`,
              }}
            >
              {/* Skill header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    flexShrink: 0,
                    borderRadius: '0.85rem',
                    background: `linear-gradient(135deg, ${item.accent}18, ${item.accent}08)`,
                    border: `1px solid ${item.accent}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: theme.textMain,
                      margin: '0 0 0.2rem 0',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.skill}
                  </h3>
                  <div
                    style={{
                      width: '36px',
                      height: '2px',
                      background: `linear-gradient(90deg, ${item.accent}, ${item.accent}40)`,
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>

              {/* Evidence */}
              <p
                style={{
                  color: theme.textMuted,
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {item.proof}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Impact Areas — what these skills actually move */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          marginBottom: '3.5rem',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: theme.accent1,
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1.5px',
              background: `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`,
              borderRadius: '2px',
            }}
          />
          Where These Skills Move the Needle
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {IMPACT_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: theme.accent1,
                  boxShadow: `0 0 12px ${theme.accent1}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: theme.textMain,
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {area}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}