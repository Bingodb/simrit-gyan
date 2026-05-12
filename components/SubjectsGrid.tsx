'use client'
import { motion } from 'framer-motion'
import { Calculator, FlaskConical, BookOpen, Globe, Code, Palette, Music, Languages } from 'lucide-react'
import styles from './SubjectsGrid.module.css'

const subjects = [
  { icon: Calculator, name: 'Mathematics', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { icon: FlaskConical, name: 'Physics', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { icon: FlaskConical, name: 'Chemistry', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { icon: FlaskConical, name: 'Biology', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { icon: BookOpen, name: 'English', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { icon: BookOpen, name: 'Hindi', gradient: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { icon: Globe, name: 'Social Science', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { icon: Calculator, name: 'Accounts', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { icon: Calculator, name: 'Economics', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { icon: Code, name: 'Computer Science', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { icon: Languages, name: 'Sanskrit', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { icon: Languages, name: 'French', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { icon: Languages, name: 'German', gradient: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { icon: Languages, name: 'Spanish', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { icon: Palette, name: 'Drawing/Painting', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { icon: Music, name: 'Music', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' }
]

const categories = ['All', 'Class 1-5', 'Class 6-10', 'Class 11-12', 'Competitive']

export default function SubjectsGrid() {
  return (
    <section className={styles.subjects}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Subjects</span>
          <h2 className={styles.title}>Subjects We <span className={styles.highlight}>Cover</span></h2>
          <p className={styles.subtitle}>Expert home tutors available for all subjects across all classes and boards.</p>
        </motion.div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={i}
              className={`${styles.filterBtn} ${i === 0 ? styles.active : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className={styles.grid}>
          {subjects.map((subject, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className={styles.iconBox} style={{ background: subject.gradient }}>
                <subject.icon size={24} color="#fff" />
              </div>
              <h4 className={styles.name}>{subject.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
