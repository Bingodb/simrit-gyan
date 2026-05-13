'use client'
import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import styles from './DelhiComponents.module.css'

export default function DelhiCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Give Your Child the Best Home Tutor in Delhi</h2>
          <p>630+ verified tutors · All Delhi areas · Free demo class · No obligation</p>
          <div className={styles.ctaButtons}>
            <motion.a
              href="tel:+917503219801"
              className={styles.ctaBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={20} />
              Call +91-7503219801
            </motion.a>
            <motion.a
              href="https://wa.me/918800535421"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
