'use client'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import styles from './HauzKhasComponents.module.css'

const areas = [
  'Hauz Khas Village', 'Hauz Khas Enclave', 'Green Park', 'Green Park Extension',
  'Safdarjung Enclave', 'Safdarjung Development Area', 'Gulmohar Park', 'Sarvapriya Vihar',
  'Kalu Sarai', 'IIT Delhi Area', 'Katwaria Sarai', 'Ber Sarai', 'Munirka', 'Munirka Vihar',
  'RK Puram Sector 1-13', 'Vasant Vihar', 'Vasant Kunj', 'Malviya Nagar', 'Saket',
  'Greater Kailash I', 'Greater Kailash II', 'Nehru Place', 'Kalkaji', 'Govindpuri',
  'Chirag Delhi', 'Panchsheel Park', 'Panchsheel Enclave', 'Lado Sarai', 'Mehrauli',
  'Chattarpur', 'Sainik Farms', 'Pushp Vihar', 'Sheikh Sarai', 'Saidulajab',
  'Begumpur', 'Westend Greens'
]

export default function HauzKhasCoverage() {
  return (
    <section className={styles.coverage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>South Delhi Coverage</span>
          <h2>Home Tutors Available in All Hauz Khas & South Delhi Areas</h2>
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
