'use client'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.column}
          >
            <h3 className={styles.logo}>SIMRIT GYAN</h3>
            <p className={styles.tagline}>Empowering students with quality home tuition across India</p>
            <div className={styles.social}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.socialIcon}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.column}
          >
            <h4>Quick Links</h4>
            <ul>
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'About', path: '/about' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.column}
          >
            <h4>Contact</h4>
            <ul className={styles.contact}>
              <li>
                <Mail size={18} />
                <span>info@simritgyan.com</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>Multiple Cities, India</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 Simrit Gyan Pvt Ltd. All rights reserved.</p>
          <div className={styles.legal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}