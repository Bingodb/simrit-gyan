'use client'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import styles from './RajinderNagarComponents.module.css'

const areas = [
  'Rajinder Nagar', 'Old Rajinder Nagar', 'New Rajinder Nagar', 'Karol Bagh',
  'Patel Nagar', 'Patel Nagar East', 'Patel Nagar West', 'Dev Nagar',
  'Baljeet Nagar', 'Naraina Vihar', 'Jhandewalan', 'Aram Bagh',
  'Paharganj', 'Connaught Place', 'Rajendra Place', 'Shankar Road',
  'Gole Market', 'Mandir Marg', 'RK Ashram Marg', 'Desh Bandhu Gupta Road',
  'Ajmeri Gate', 'Kamla Market', 'Arya Samaj Road', 'Ranjit Nagar',
  'Moti Bagh', 'Sarojini Nagar', 'Chanakya Puri', 'Diplomatic Enclave',
  'Pandara Road', 'India Gate Area', 'Barakhamba Road', 'Kasturba Gandhi Marg',
  'Janpath', 'Parliament Street', 'Sansad Marg', 'Central Secretariat',
  'Khan Market'
]

export default function RajinderNagarCoverage() {
  return (
    <section className={styles.coverage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Central Delhi Coverage</span>
          <h2>Home Tutors Available in All Rajinder Nagar & Central Delhi Areas</h2>
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
