'use client'
import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import styles from './HauzKhasComponents.module.css'

export default function HauzKhasCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Give Your Child the Best Home Tutor in Hauz Khas</h2>
          <p>200+ verified tutors · All South Delhi areas · Free demo class · No obligation</p>
          
          <div className={styles.ctaButtons}>
            <motion.a
              href="#booking-form"
              className={styles.ctaPrimaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Demo
            </motion.a>
            <motion.a
              href="tel:+918287015044"
              className={styles.ctaSecondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} />
              +91 8287015044
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <motion.a
        href="tel:+918287015044"
        className={styles.floatingCall}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Phone size={24} />
        <span>Call Now</span>
        <small>+91 8287015044</small>
      </motion.a>

      <motion.a
        href="https://wa.me/918287015044"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsapp}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle size={24} />
        <span>WhatsApp</span>
        <small>Quick Reply</small>
      </motion.a>
    </section>
  )
}
