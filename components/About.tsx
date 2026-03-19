'use client'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Award, Users, BookOpen, Star, Linkedin, Mail } from 'lucide-react'

const team = [
  {
    role: 'Director',
    emoji: '👨‍💼',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    ring: 'rgba(102,126,234,0.5)',
    bio: 'Visionary leader with 15+ years in education management',
  },
  {
    role: 'CEO',
    emoji: '👩‍💼',
    gradient: 'linear-gradient(135deg, #c9a84c, #ffd700)',
    ring: 'rgba(201,168,76,0.5)',
    bio: 'Driving excellence in home education across India',
  },
  {
    role: 'Managing Director',
    emoji: '👨‍🎓',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    ring: 'rgba(240,147,251,0.5)',
    bio: 'Operations expert ensuring quality at every touchpoint',
  },
  {
    role: 'Academic Head',
    emoji: '👩‍🏫',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    ring: 'rgba(67,233,123,0.5)',
    bio: 'Curriculum specialist with deep academic expertise',
  },
]
import styles from './About.module.css'

const highlights = [
  'Experienced & Verified Tutors',
  'Personalized Learning Plans',
  'Flexible Scheduling',
  'Affordable Pricing',
  'Regular Progress Reports',
  'All Boards Covered (CBSE, ICSE, State)'
]

const locations = [
  { city: 'Dwarka', area: 'New Delhi', sectors: 'Sector 1–23' },
  { city: 'Janakpuri', area: 'New Delhi', sectors: 'All Blocks' },
  { city: 'Uttam Nagar', area: 'New Delhi', sectors: 'East & West' },
  { city: 'Palam', area: 'New Delhi', sectors: 'All Areas' },
  { city: 'Vikaspuri', area: 'New Delhi', sectors: 'All Blocks' },
  { city: 'Nawada', area: 'New Delhi', sectors: 'All Areas' },
  { city: 'Noida', area: 'Uttar Pradesh', sectors: 'Sector 1–62' },
  { city: 'Gurgaon', area: 'Haryana', sectors: 'All Sectors' },
]

const milestones = [
  { icon: Users, value: '5000+', label: 'Students' },
  { icon: Award, value: '200+', label: 'Tutors' },
  { icon: BookOpen, value: '10+', label: 'Cities' },
  { icon: Star, value: '95%', label: 'Success' },
]

export default function About() {
  return (
    <section id="about" className={styles.about}>
      {/* Floating educational symbols */}
      <div className={styles.bgSymbols}>
        {['∑', 'π', '∞', 'Δ', '√', 'λ', 'θ', 'E=mc²', 'DNA', 'ABC'].map((s, i) => (
          <span key={i} className={styles.sym} style={{ left: `${i * 10 + 2}%`, top: `${(i * 17 + 5) % 85}%`, animationDelay: `${i * 0.5}s` }}>{s}</span>
        ))}
      </div>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>

        {/* ── Hero heading ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>🎓 Who We Are</span>
          <h1 className={styles.title}>About <span className={styles.gold}>Simrit Gyan</span> Pvt Ltd</h1>
          <p className={styles.tagline}>Bridging the gap between students and excellence — one home at a time</p>
        </motion.div>

        {/* ── Story + highlights ── */}
        <div className={styles.storyGrid}>
          <motion.div
            className={styles.storyText}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.storyTitle}>Our <span className={styles.gold}>Story</span></h2>
            <p>Simrit Gyan Pvt Ltd is a leading home tuition company dedicated to providing quality education at the comfort of your home. We understand that every student is unique and requires personalized attention to excel academically.</p>
            <p>Our team of experienced and qualified tutors are passionate about teaching and committed to helping students achieve their full potential. We serve students across multiple cities in India, offering flexible scheduling and customized lesson plans tailored to each student's learning style and pace.</p>

            <div className={styles.highlights}>
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className={styles.highlightItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CheckCircle size={20} className={styles.checkIcon} />
                  <span>{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Milestones card */}
          <motion.div
            className={styles.milestonesCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.cardGlow}></div>
            <h3 className={styles.milestonesTitle}>Our Milestones</h3>
            <div className={styles.milestonesGrid}>
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  className={styles.milestone}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={styles.milestoneIcon}>
                    <m.icon size={22} />
                  </div>
                  <div className={styles.milestoneValue}>{m.value}</div>
                  <div className={styles.milestoneLabel}>{m.label}</div>
                </motion.div>
              ))}
            </div>

            <div className={styles.missionBox}>
              <h4>Our Mission</h4>
              <p>"To make quality education accessible to every student at their doorstep, nurturing academic excellence and building confident learners."</p>
            </div>
          </motion.div>
        </div>

        {/* ── Locations ── */}
        <motion.div
          className={styles.locationsSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.locHeader}>
            <span className={styles.badge}>📍 Where We Operate</span>
            <h2 className={styles.locTitle}>We Serve Across <span className={styles.gold}>Multiple Locations</span></h2>
            <p className={styles.locSubtitle}>Our tutors are available across these cities and areas</p>
          </div>

          <div className={styles.locGrid}>
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                className={styles.locCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className={styles.locGlow}></div>
                <div className={styles.locIcon}>
                  <MapPin size={20} />
                </div>
                <h4 className={styles.locCity}>{loc.city}</h4>
                <p className={styles.locArea}>{loc.area}</p>
                <span className={styles.locSectors}>{loc.sectors}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.moreCities}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>+ More cities being added regularly</span>
          </motion.div>
        </motion.div>

        {/* ── Team Section ── */}
        <motion.div
          className={styles.teamSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.teamHeader}>
            <span className={styles.badge}>👥 Leadership</span>
            <h2 className={styles.teamTitle}>Meet Our <span className={styles.gold}>Team</span></h2>
            <p className={styles.teamSubtitle}>The passionate minds behind Simrit Gyan's success</p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -10 }}
              >
                {/* Outer ring */}
                <div className={styles.ringWrapper}>
                  <div className={styles.ringOuter} style={{ borderColor: member.ring, boxShadow: `0 0 30px ${member.ring}` }}>
                    <div className={styles.ringInner} style={{ background: member.gradient }}>
                      <span className={styles.memberEmoji}>{member.emoji}</span>
                    </div>
                  </div>
                  {/* Rotating dashed ring */}
                  <div className={styles.ringDash} style={{ borderColor: member.ring }}></div>
                </div>

                <div className={styles.memberInfo}>
                  <span className={styles.memberRole} style={{ backgroundImage: member.gradient }}>{member.role}</span>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <div className={styles.memberLinks}>
                    <motion.a href="#" className={styles.memberLink} style={{ background: member.gradient }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                      <Linkedin size={16} />
                    </motion.a>
                    <motion.a href="#" className={styles.memberLink} style={{ background: member.gradient }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                      <Mail size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
