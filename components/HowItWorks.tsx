'use client'
import { motion } from 'framer-motion'
import { MessageSquare, UserCheck, BookOpen } from 'lucide-react'
import styles from './HowItWorks.module.css'

const steps = [
  {
    icon: MessageSquare,
    step: 'Step 01',
    title: 'Share Your Need',
    desc: 'Tell us the class, subject, board, and preferred timing. We\'ll find the perfect match.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    glow: 'rgba(102,126,234,0.3)'
  },
  {
    icon: UserCheck,
    step: 'Step 02',
    title: 'Get Matched Tutor',
    desc: 'We match you with a verified tutor based on your requirements. Try a FREE demo class.',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    glow: 'rgba(240,147,251,0.3)'
  },
  {
    icon: BookOpen,
    step: 'Step 03',
    title: 'Start Learning',
    desc: 'Begin regular classes at your home. Track progress with regular feedback & reports.',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    glow: 'rgba(67,233,123,0.3)'
  }
]

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Simple Process</span>
          <h2 className={styles.title}>How It <span className={styles.highlight}>Works</span></h2>
          <p className={styles.subtitle}>Get a verified home tutor at your doorstep in just 3 simple steps</p>
        </motion.div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardGlow} style={{ background: step.glow }}></div>
              
              <div className={styles.iconBox} style={{ background: step.gradient }}>
                <step.icon size={32} color="#fff" />
              </div>

              <span className={styles.step} style={{ backgroundImage: step.gradient }}>
                {step.step}
              </span>

              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>

              {i < steps.length - 1 && (
                <div className={styles.arrow}>→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
