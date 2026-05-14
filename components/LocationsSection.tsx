'use client'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import styles from './LocationsSection.module.css'

const locations = [
  {
    name: 'Delhi',
    subtitle: 'All Delhi Areas',
    areas: 'South Delhi, South West Delhi, Central Delhi, Karol Bagh & 40+ areas',
    tutors: '650+',
    link: '/locations/delhi',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    name: 'Gurgaon',
    subtitle: 'Gurugram, Haryana',
    areas: 'DLF, Sohna Road, Golf Course Road, All Sectors',
    tutors: '300+',
    link: '/locations/gurgaon',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
]

export default function LocationsSection() {
  return (
    <section className={styles.locations}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>📍 Our Locations</span>
          <h2 className={styles.title}>
            Find Tutors in <span className={styles.highlight}>Your City</span>
          </h2>
          <p className={styles.subtitle}>Verified home tutors available across multiple cities in India</p>
        </motion.div>

        <div className={styles.grid}>
          {locations.map((location, i) => (
            <motion.a
              key={i}
              href={location.link}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardGlow} style={{ background: location.gradient.replace('linear-gradient(135deg,', 'radial-gradient(circle,').replace(')', ', transparent)') }}></div>
              
              <div className={styles.iconBox} style={{ background: location.gradient }}>
                <MapPin size={32} color="#fff" />
              </div>

              <h3 className={styles.locationName}>{location.name}</h3>
              <p className={styles.locationSubtitle}>{location.subtitle}</p>
              
              <div className={styles.locationInfo}>
                <p className={styles.areas}>{location.areas}</p>
                <div className={styles.tutorCount}>
                  <span className={styles.count}>{location.tutors}</span>
                  <span className={styles.label}>Verified Tutors</span>
                </div>
              </div>

              <div className={styles.viewBtn} style={{ backgroundImage: location.gradient }}>
                View Details
                <ArrowRight size={18} />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          className={styles.moreLocations}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          More cities coming soon! Contact us for tutor availability in your area.
        </motion.p>
      </div>
    </section>
  )
}
