'use client'
import { motion } from 'framer-motion'
import { Code, Palette, Smartphone, Cloud, Database, TrendingUp } from 'lucide-react'
import styles from './Services.module.css'

const services = [
  { icon: Code, title: 'Mathematics', desc: 'Expert tutors for all levels from basic to advanced', color: '#667eea' },
  { icon: Palette, title: 'Science', desc: 'Physics, Chemistry, Biology - comprehensive coverage', color: '#f093fb' },
  { icon: Smartphone, title: 'Languages', desc: 'English, Hindi and regional language tutoring', color: '#4facfe' },
  { icon: Cloud, title: 'Competitive Exams', desc: 'JEE, NEET, Board exam preparation', color: '#43e97b' },
  { icon: Database, title: 'Computer Science', desc: 'Programming and IT subject expertise', color: '#fa709a' },
  { icon: TrendingUp, title: 'All Subjects', desc: 'Complete academic support for all grades', color: '#fee140' }
]

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Our Subjects</h2>
          <p className={styles.subtitle}>Comprehensive tutoring for all academic needs</p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              className={styles.service}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.serviceInner}>
                <div className={styles.iconWrapper} style={{ background: service.color }}>
                  <service.icon size={36} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <motion.button
                  className={styles.learnMore}
                  whileHover={{ x: 5 }}
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}