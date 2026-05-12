'use client'
import { motion } from 'framer-motion'
import { Users, GraduationCap, Clock, Shield, RefreshCw, FileText } from 'lucide-react'
import styles from './RajinderNagarComponents.module.css'

const features = [
  {
    icon: Users,
    title: 'Tutors in Your Area',
    desc: 'We have tutors living in almost every area of Central Delhi — from Rajinder Nagar to Connaught Place. Minimum travel time = maximum teaching time.'
  },
  {
    icon: GraduationCap,
    title: 'Top School Curriculum',
    desc: 'Tutors experienced with Modern School, Sardar Patel Vidyalaya, Convent of Jesus & Mary, St. Columba\'s & all Central Delhi schools.'
  },
  {
    icon: Clock,
    title: 'Same-Day Tutor in Central Delhi',
    desc: 'Need a tutor urgently? We\'ve placed tutors within 4-6 hours in Rajinder Nagar area — the fastest in Central Delhi. Standard placement within 24 hours.'
  },
  {
    icon: Shield,
    title: 'Background Verified Tutors',
    desc: 'Every tutor goes through ID check, address verification, qualification check & police verification before being assigned in Central Delhi homes.'
  },
  {
    icon: RefreshCw,
    title: 'Free Replacement Guarantee',
    desc: 'Not happy with the tutor? Get a free replacement — no questions asked. Your child\'s learning in Rajinder Nagar homes is our priority.'
  },
  {
    icon: FileText,
    title: 'Monthly Progress Reports',
    desc: 'Detailed monthly report covering topics taught, test scores, strengths & improvement areas — shared with Central Delhi parents via WhatsApp.'
  }
]

export default function RajinderNagarFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Why Rajinder Nagar Parents Choose Us</h2>
          <p className={styles.subtitle}>Central Delhi's #1 Rated Home Tuition Service</p>
          <p className={styles.subtext}>Serving Rajinder Nagar, Karol Bagh, Patel Nagar & all Central Delhi areas since 2019</p>
        </motion.div>

        <div className={styles.featureGrid}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
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
