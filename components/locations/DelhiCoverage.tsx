'use client'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import styles from './DelhiComponents.module.css'

const areas = [
  // South Delhi
  'Hauz Khas', 'Green Park', 'Safdarjung', 'IIT Area', 'Malviya Nagar',
  'Saket', 'Greater Kailash', 'Nehru Place', 'Lajpat Nagar', 'Defence Colony',
  
  // West Delhi
  'Uttam Nagar East', 'Uttam Nagar West', 'Nawada', 'Dwarka Mor', 'Bindapur',
  'Janakpuri', 'Janakpuri East', 'Janakpuri West', 'Vikaspuri', 'Tilak Nagar',
  'Subhash Nagar', 'Tagore Garden', 'Rajouri Garden', 'Paschim Vihar',
  
  // Central Delhi
  'Rajinder Nagar', 'Old Rajinder Nagar', 'New Rajinder Nagar', 'Karol Bagh',
  'Patel Nagar', 'Patel Nagar East', 'Patel Nagar West', 'Dev Nagar',
  'Baljeet Nagar', 'Naraina Vihar', 'Jhandewalan', 'Aram Bagh',
  'Paharganj', 'Connaught Place', 'Rajendra Place', 'Shankar Road',
  'Gole Market', 'Mandir Marg', 'RK Ashram Marg', 'Desh Bandhu Gupta Road',
]

export default function DelhiCoverage() {
  return (
    <section className={styles.coverage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Delhi Coverage</span>
          <h2>Home Tutors Available in All Delhi Areas</h2>
          <p>We cover 40+ areas across South, West, and Central Delhi</p>
        </motion.div>

        <div className={styles.areasGrid}>
          {areas.map((area, i) => (
            <motion.div
              key={i}
              className={styles.areaCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={14} className={styles.areaIcon} />
              <span>{area}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.moreAreas}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Don't see your area? Call us at <a href="tel:+917503219801">+91-7503219801</a> — we likely have tutors there too!
        </motion.p>
      </div>
    </section>
  )
}
