'use client'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import styles from './LocationsSection.module.css'

const locations = [
  {
    name: 'DELHI',
    subtitle: 'Central Delhi',
    areas: 'Karol Bagh, Connaught Place, Paharganj & nearby areas',
    tutors: '150+',
    link: '/locations/delhi',
    gradient: 'linear-gradient(135deg, #ec0e0e, #ff4444)'
  },
  {
    name: 'South Delhi',
    subtitle: 'South Delhi',
    areas: 'Hauz Khas, Saket, Greater Kailash, Malviya Nagar & more',
    tutors: '200+',
    link: '/locations/south-delhi',
    gradient: 'linear-gradient(135deg, #eb15ef, #ff6bff)'
  },
  {
    name: 'South West Delhi',
    subtitle: 'South West Delhi',
    areas: 'Uttam Nagar, Dwarka, Janakpuri, Vikaspuri & more',
    tutors: '180+',
    link: '/locations/south-west-delhi',
    gradient: 'linear-gradient(135deg, #ff570f, #ff8844)'
  },
  {
    name: 'Central Delhi',
    subtitle: 'Central Delhi',
    areas: 'Rajinder Nagar, Patel Nagar, Karol Bagh & nearby',
    tutors: '120+',
    link: '/locations/central-delhi',
    gradient: 'linear-gradient(135deg, #00ffaa, #44ffcc)'
  },
  {
    name: 'Gurgaon',
    subtitle: 'Gurugram, Haryana',
    areas: 'DLF, Sohna Road, Golf Course Road, All Sectors',
    tutors: '300+',
    link: '/locations/gurgaon',
    gradient: 'linear-gradient(135deg, #00ff62, #44ff88)'
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
