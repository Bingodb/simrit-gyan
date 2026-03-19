'use client'
import { motion } from 'framer-motion'
import { Zap, Shield, Sparkles, Rocket, Globe, Lock } from 'lucide-react'
import styles from './Features.module.css'

const features = [
  {
    icon: Zap,
    title: 'Quick Response',
    desc: 'Fast tutor matching within 24 hours of your request',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    glow: 'rgba(102, 126, 234, 0.4)'
  },
  {
    icon: Shield,
    title: 'Verified Tutors',
    desc: 'Background-checked and highly qualified educators',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    glow: 'rgba(240, 147, 251, 0.4)'
  },
  {
    icon: Sparkles,
    title: 'Personalized Learning',
    desc: 'Customized teaching methods tailored for each student',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    glow: 'rgba(79, 172, 254, 0.4)'
  },
  {
    icon: Rocket,
    title: 'Academic Growth',
    desc: 'Proven track record of outstanding student success',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    glow: 'rgba(67, 233, 123, 0.4)'
  },
  {
    icon: Globe,
    title: 'Multi-City Coverage',
    desc: 'Available across all major cities and areas',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    glow: 'rgba(250, 112, 154, 0.4)'
  },
  {
    icon: Lock,
    title: 'Safe & Secure',
    desc: 'Fully trusted and safe home tuition environment',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    glow: 'rgba(161, 140, 209, 0.4)'
  }
]

export default function Features() {
  return (
    <section className={styles.features} id="features">
      {/* Background orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            ✦ Our Advantages
          </motion.span>
          <h2 className={styles.title}>Why Choose <span className={styles.highlight}>Simrit Gyan?</span></h2>
          <p className={styles.subtitle}>Everything your child needs to excel academically</p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              {/* Glow effect on hover */}
              <div className={styles.cardGlow} style={{ background: feature.glow }}></div>

              <div className={styles.iconWrapper} style={{ background: feature.gradient }}>
                <feature.icon size={30} color="#fff" />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
              </div>

              <div className={styles.cardNumber}>0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
