'use client'
import { motion } from 'framer-motion'
import styles from './UttamNagarComponents.module.css'

const pricing = [
  { emoji: '🧒', title: 'Class 1-5', price: '₹3,000–5,000', period: 'per month · All subjects' },
  { emoji: '📚', title: 'Class 6-8', price: '₹4,000–7,000', period: 'per month · All subjects' },
  { emoji: '🔬', title: 'Class 9-10', price: '₹5,000–12,000', period: 'per month · Board prep', popular: true },
  { emoji: '🎯', title: 'Class 11-12 / JEE', price: '₹7,000–20,000', period: 'per month · Specialized' }
]

export default function UttamNagarPricing() {
  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Uttam Nagar Pricing</span>
          <h2>Home Tuition Fees in Uttam Nagar, West Delhi</h2>
          <p className={styles.subtitle}>Transparent pricing — no hidden charges. Pay only after the free demo.</p>
        </motion.div>

        <div className={styles.pricingGrid}>
          {pricing.map((plan, i) => (
            <motion.div
              key={i}
              className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}
              <div className={styles.pricingEmoji}>{plan.emoji}</div>
              <h3>{plan.title}</h3>
              <div className={styles.price}>{plan.price}</div>
              <p>{plan.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
