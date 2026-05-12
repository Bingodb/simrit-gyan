'use client'
import { motion } from 'framer-motion'
import { Zap, Shield, Sparkles, Rocket, Globe, Lock } from 'lucide-react'
import styles from './Features.module.css'

const features = [
  {
    icon: Shield,
    title: 'Verified Tutors',
    desc: 'Background verified, ID checked, and qualification confirmed tutors only.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    glow: 'rgba(102, 126, 234, 0.4)'
  },
  {
    icon: Sparkles,
    title: 'Personalized Learning',
    desc: 'One-on-one attention tailored to each student\'s learning speed and style.',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    glow: 'rgba(240, 147, 251, 0.4)'
  },
  {
    icon: Rocket,
    title: 'Free Replacement',
    desc: 'Not satisfied? Get a free tutor replacement — no questions asked.',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    glow: 'rgba(79, 172, 254, 0.4)'
  },
  {
    icon: Zap,
    title: 'Free Demo Class',
    desc: 'Try before you commit. Experience teaching quality with a free trial.',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    glow: 'rgba(67, 233, 123, 0.4)'
  },
  {
    icon: Globe,
    title: 'Flexible Timings',
    desc: 'Choose class timings that suit your schedule — morning, evening or weekend.',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    glow: 'rgba(250, 112, 154, 0.4)'
  },
  {
    icon: Lock,
    title: 'Progress Reports',
    desc: 'Regular feedback & progress tracking shared with parents monthly.',
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
            Why Simrit Gyan
          </motion.span>
          <h2 className={styles.title}>Why Parents <span className={styles.highlight}>Trust Us</span></h2>
          <p className={styles.subtitle}>Get a verified home tutor at your doorstep with complete peace of mind</p>
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
