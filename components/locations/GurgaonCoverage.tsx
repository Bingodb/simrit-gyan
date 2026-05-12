'use client'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import styles from './GurgaonComponents.module.css'

const areas = [
  'DLF Phase 1', 'DLF Phase 2', 'DLF Phase 3', 'DLF Phase 4', 'DLF Phase 5', 'Sohna Road',
  'Golf Course Road', 'MG Road', 'Cyber City', 'Sector 14', 'Sector 15', 'Sector 23',
  'Sector 31', 'Sector 38', 'Sector 40', 'Sector 45', 'Sector 46', 'Sector 49',
  'Sector 50', 'Sector 51', 'Sector 52', 'Sector 56', 'Sector 57', 'Sector 65',
  'Sector 70', 'Sector 82', 'Sushant Lok', 'South City 1', 'South City 2', 'Nirvana Country',
  'Palam Vihar', 'Mayfield Garden', 'Ardee City', 'Greenwood City', 'Suncity', 'Tulip Violet',
  'Vatika City'
]

export default function GurgaonCoverage() {
  return (
    <section className={styles.coverage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Gurgaon Coverage</span>
          <h2>Home Tutors Available in All Gurgaon Areas</h2>
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
