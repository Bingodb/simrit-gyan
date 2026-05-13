'use client'
import { motion } from 'framer-motion'
import { CheckCircle, MapPin, Award, Users, BookOpen, Star, Linkedin, Mail } from 'lucide-react'

const coreValues = [
  {
    role: 'Our Mission',
    emoji: '🎯',
    gradient: 'linear-gradient(135deg, #c9a84c, #ffd700)',
    ring: 'rgba(201,168,76,0.5)',
    bio: 'To provide personalized, quality education to every student through verified home tutors, making learning effective and accessible.',
  },
  {
    role: 'Our Vision',
    emoji: '👁️',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    ring: 'rgba(240,147,251,0.5)',
    bio: 'To become India\'s most trusted home tuition platform where every student discovers the joy of learning and achieves academic excellence.',
  },
  {
    role: 'Our Values',
    emoji: '⭐',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    ring: 'rgba(67,233,123,0.5)',
    bio: 'Integrity, student-first approach, continuous improvement, and commitment to results drive everything we do at Simrit Gyan.',
  },
]

const team = [
  {
    name: 'Girish Vats',
    role: 'CEO & Founder',
    image: '/images/founder and ceo.jpg',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    ring: 'rgba(102,126,234,0.5)',
    bio: 'Visionary leader with 15+ years in education, Girish founded Simrit Gyan to revolutionize home tuition and make quality education accessible to every student.',
    linkedin: '#',
    email: 'girish@simritgyan.com'
  },
  {
    name: 'Anuj Jha',
    role: 'Managing Director',
    image: '/images/team/md.jpg',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    ring: 'rgba(240,147,251,0.5)',
    bio: 'Leading operations and strategic growth, Anuj ensures excellence and consistency across all our services nationwide.',
    linkedin: '#',
    email: 'anuj@simritgyan.com'
  },
  {
    name: 'Chetan Kohli',
    role: 'Head of Academics',
    image: '/images/team/hoa.jpg',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    ring: 'rgba(67,233,123,0.5)',
    bio: 'Former IIT professor with 20+ years of teaching experience, Chetan leads our curriculum and tutor training.',
    linkedin: '#',
    email: 'chetan@simritgyan.com'
  },
  {
    name: 'Sneha Patel',
    role: 'Head of Operations',
    image: '/images/team/hoo.jpg',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    ring: 'rgba(79,172,254,0.5)',
    bio: 'Sneha manages our nationwide operations, ensuring seamless tutor-student matching and service delivery.',
    linkedin: '#',
    email: 'sneha@simritgyan.com'
  },
]
import styles from './About.module.css'

const highlights = [
  'Verified Tutors - Background verified, ID checked, and qualification confirmed',
  'Personalized Learning - One-on-one attention tailored to each student',
  'Free Replacement - Not satisfied? Get a free tutor replacement',
  'Free Demo Class - Try before you commit',
  'Flexible Timings - Choose class timings that suit your schedule',
  'Progress Reports - Regular feedback & progress tracking shared with parents'
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
  { icon: Users, value: '1000+', label: 'Happy Students' },
  { icon: Award, value: '500+', label: 'Expert Tutors' },
  { icon: BookOpen, value: '50+', label: 'Cities Covered' },
  { icon: Star, value: '5+', label: 'Years Experience' },
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
            <p>Simrit Gyan was founded with a simple mission — to make quality education accessible to every student through personalized home tuition. We believe every child learns differently, and a one-size-fits-all classroom approach doesn't work for everyone.</p>
            <p>Our name comes from "Simrit" (consciousness/memory) and "Gyan" (knowledge), reflecting our belief that true learning happens when knowledge is internalized with understanding, not just memorization.</p>
            <p>We carefully select, verify, and train tutors who don't just teach subjects — they inspire students to love learning. With regular progress tracking and parent involvement, we ensure measurable results.</p>

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
              <p>To provide personalized, quality education to every student through verified home tutors, making learning effective and accessible.</p>
            </div>
          </motion.div>
        </div>

        {/* ── Mission, Vision, Values Section ── */}
        <motion.div
          className={styles.valuesSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.valuesHeader}>
            <span className={styles.badge}>Our Core Values</span>
            <h2 className={styles.valuesTitle}>What Drives <span className={styles.gold}>Us</span></h2>
            <p className={styles.valuesSubtitle}>The principles that guide everything we do at Simrit Gyan</p>
          </div>

          <div className={styles.valuesGrid}>
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.valueIcon} style={{ background: value.gradient }}>
                  <span className={styles.valueEmoji}>{value.emoji}</span>
                </div>

                <div className={styles.valueInfo}>
                  <h3 className={styles.valueRole}>{value.role}</h3>
                  <p className={styles.valueBio}>{value.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <span className={styles.badge}>👥 Meet Our Team</span>
            <h2 className={styles.teamTitle}>The People Behind <span className={styles.gold}>Simrit Gyan</span></h2>
            <p className={styles.teamSubtitle}>Passionate educators and professionals dedicated to transforming education</p>
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
                {/* Profile image with ring */}
                <div className={styles.ringWrapper}>
                  <div className={styles.ringOuter} style={{ borderColor: member.ring, boxShadow: `0 0 30px ${member.ring}` }}>
                    <div className={styles.ringInner} style={{ background: member.gradient }}>
                      <div className={styles.memberImage}>
                        {member.image.includes('founder and ceo') ? (
                          <img src={member.image} alt={member.name} className={styles.memberPhoto} />
                        ) : (
                          <span className={styles.memberInitial}>{member.name.charAt(0)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Rotating dashed ring */}
                  <div className={styles.ringDash} style={{ borderColor: member.ring }}></div>
                </div>

                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <span className={styles.memberRole} style={{ backgroundImage: member.gradient }}>{member.role}</span>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <div className={styles.memberLinks}>
                    <motion.a href={member.linkedin} className={styles.memberLink} style={{ background: member.gradient }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                      <Linkedin size={16} />
                    </motion.a>
                    <motion.a href={`mailto:${member.email}`} className={styles.memberLink} style={{ background: member.gradient }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
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
