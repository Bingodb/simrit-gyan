'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>
            Ready to Transform Your Child's <span className={styles.highlight}>Education?</span>
          </h2>
          <p className={styles.subtitle}>
            Book a FREE demo class today and see the difference personalized home tuition makes. No commitment required.
          </p>

          <div className={styles.buttons}>
            <motion.a
              href="/contact"
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Book Free Demo</span>
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="https://wa.me/918800535421"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
