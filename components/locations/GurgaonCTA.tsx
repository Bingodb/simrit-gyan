'use client'
import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import styles from './GurgaonComponents.module.css'

export default function GurgaonCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Give Your Child the Best Home Tutor in Gurgaon</h2>
          <p>300+ verified tutors · All sectors · Free demo class · No obligation</p>
          
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
              href="tel:+919599379705"
              className={styles.ctaSecondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} />
              +91 9599379705
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <motion.a
        href="tel:+919599379705"
        className={styles.floatingCall}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Phone size={24} />
        <span>Call Now</span>
        <small>+91 9599379705</small>
      </motion.a>

      <motion.a
        href="https://wa.me/919599379705"
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
