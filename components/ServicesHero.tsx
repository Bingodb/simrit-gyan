'use client'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import styles from './ServicesHero.module.css'

export default function ServicesHero() {
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
            <BookOpen size={16} />
            <span>Our Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.title}
          >
            Tuition <span className={styles.gradientText}>Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.subtitle}
          >
            Comprehensive home tuition solutions for every academic need — from primary school to competitive exam preparation.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
