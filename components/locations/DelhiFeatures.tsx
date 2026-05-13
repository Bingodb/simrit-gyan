'use client'
import { motion } from 'framer-motion'
import { Users, Award, Clock, RefreshCw, Shield, TrendingUp } from 'lucide-react'
import styles from './DelhiComponents.module.css'

const features = [
  {
    icon: Users,
    title: 'Tutors in Your Area',
    desc: 'We have tutors living in almost every area of Delhi — from Hauz Khas to Uttam Nagar. Minimum travel time = maximum teaching time.'
  },
  {
    icon: Award,
    title: 'Verified & Experienced',
    desc: 'Every tutor is background-verified, ID-checked, and has proven teaching experience. Only the top 10% make it through our selection.'
  },
  {
    icon: Clock,
    title: 'Same-Day Tutor in Delhi',
    desc: 'Need a tutor urgently? We\'ve placed tutors within 4-6 hours in Delhi — the fastest in NCR. Standard placement within 24 hours.'
  },
  {
    icon: RefreshCw,
    title: 'Free Replacement Guarantee',
    desc: 'Not happy with the tutor? Get a free replacement — no questions asked. Your child\'s learning in Delhi homes is our priority.'
  },
  {
    icon: Shield,
    title: 'Safe & Trustworthy',
    desc: 'All tutors undergo police verification and reference checks. Parents in Delhi trust us because we prioritize safety first.'
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    desc: 'Our Delhi students consistently show 20-30% grade improvement within 3 months. Regular progress tracking and parent updates.'
  },
]

export default function DelhiFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Why Delhi Parents Choose Us</h2>
          <p className={styles.subtitle}>Delhi's #1 Rated Home Tuition Service</p>
          <p className={styles.subtext}>Serving South, West & Central Delhi since 2019</p>
        </motion.div>

        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.featureIcon}>
                <feature.icon size={28} />
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
