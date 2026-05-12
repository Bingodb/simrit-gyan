'use client'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import styles from './TutorsHero.module.css'

export default function TutorsHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gradient1}></div>
      <div className={styles.gradient2}></div>
      
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.content}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={styles.badge}
          >
            <Users size={16} />
            <span>Our Tutors</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.title}
          >
            Verified <span className={styles.gradientText}>Expert Tutors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.subtitle}
          >
            All our tutors are carefully selected, verified, and trained to deliver the best learning experience.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
