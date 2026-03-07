'use client'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Basic',
    price: '3999',
    period: 'month',
    features: ['2 Sessions per week', 'Single Subject', 'Progress Reports', 'Flexible Timing'],
    popular: false
  },
  {
    name: 'Standard',
    price: '6999',
    period: 'month',
    features: ['4 Sessions per week', 'Up to 3 Subjects', 'Weekly Progress Reports', 'Test Preparation', 'Parent-Teacher Meetings'],
    popular: true
  },
  {
    name: 'Premium',
    price: '12999',
    period: 'month',
    features: ['Daily Sessions', 'All Subjects', 'Daily Progress Tracking', 'Exam Preparation', 'Dedicated Tutor', '24/7 Support'],
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Affordable Pricing</h2>
          <p className={styles.subtitle}>Choose the perfect plan for your child's education</p>
        </motion.div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`${styles.plan} ${plan.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {plan.popular && (
                <div className={styles.badge}>
                  <Star size={16} />
                  Most Popular
                </div>
              )}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceWrapper}>
                <span className={styles.currency}>₹</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>/{plan.period}</span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature, j) => (
                  <li key={j}>
                    <Check size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}