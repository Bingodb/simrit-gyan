'use client'
import { motion } from 'framer-motion'
import { Zap, Shield, Sparkles, Rocket, Globe, Lock } from 'lucide-react'
import styles from './Features.module.css'

const features = [
  { icon: Zap, title: 'Quick Response', desc: 'Fast tutor matching within 24 hours' },
  { icon: Shield, title: 'Verified Tutors', desc: 'Background-checked qualified educators' },
  { icon: Sparkles, title: 'Personalized Learning', desc: 'Customized teaching methods for each student' },
  { icon: Rocket, title: 'Academic Growth', desc: 'Proven track record of student success' },
  { icon: Globe, title: 'Multi-City Coverage', desc: 'Available across major cities' },
  { icon: Lock, title: 'Safe & Secure', desc: 'Trusted home tuition environment' }
]

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.subtitle}>Everything your child needs to excel</p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={styles.feature}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={styles.iconWrapper}>
                <feature.icon size={32} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}