'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
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
            <Sparkles size={16} />
            <span>Premium Home Tuition Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.title}
          >
            Excellence in
            <span className={styles.gradientText}> Home Education</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.subtitle}
          >
            Professional home tutors across multiple cities, delivering personalized education that transforms students' academic journey
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={styles.buttons}
          >
            <motion.a
              href="/contact"
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Tutor
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="/services"
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className={styles.floatingCard}>
            <Image 
              src="/images/headone.jpg" 
              alt="Student Learning" 
              fill
              style={{ objectFit: 'cover' }}
              className={styles.cardImage}
            />
          </div>
          <div className={styles.floatingCard2}></div>
          <div className={styles.floatingCard3}></div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={styles.mouse}
        ></motion.div>
      </div>
    </section>
  )
}