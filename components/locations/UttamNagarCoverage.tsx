'use client'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import styles from './UttamNagarComponents.module.css'

const areas = [
  'Uttam Nagar East', 'Uttam Nagar West', 'Nawada', 'Dwarka Mor', 'Bindapur',
  'Janakpuri', 'Janakpuri East', 'Janakpuri West', 'Janakpuri Block A-D',
  'Vikaspuri', 'Tilak Nagar', 'Subhash Nagar', 'Tagore Garden', 'Rajouri Garden',
  'Moti Nagar', 'Kirti Nagar', 'Ramesh Nagar', 'Shadipur', 'Patel Nagar',
  'Patel Nagar East', 'Patel Nagar West', 'Punjabi Bagh', 'Punjabi Bagh East',
  'Punjabi Bagh West', 'Paschim Vihar', 'Paschim Vihar East', 'Paschim Vihar West',
  'Mayapuri', 'Naraina', 'Naraina Vihar', 'Rajapuri', 'Hari Nagar', 'Nangloi',
  'Mundka', 'Ghevra', 'Kakrola', 'Dabri'
]

export default function UttamNagarCoverage() {
  return (
    <section className={styles.coverage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>West Delhi Coverage</span>
          <h2>Home Tutors Available in All Uttam Nagar & West Delhi Areas</h2>
        </motion.div>

        <div className={styles.areaGrid}>
          {areas.map((area, i) => (
            <motion.div
              key={i}
              className={styles.areaCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -5 }}
            >
              <MapPin size={18} />
              <span>{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
