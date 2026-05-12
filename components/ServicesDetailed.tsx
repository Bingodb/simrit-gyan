'use client'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Trophy, Briefcase, Rocket, Globe, CheckCircle } from 'lucide-react'
import styles from './ServicesDetailed.module.css'

const services = [
  {
    icon: BookOpen,
    badge: 'Class 1-5',
    title: 'Primary Home Tuition',
    desc: 'Build strong foundations in Maths, English, EVS & Hindi with patient, caring tutors who make learning fun for young minds.',
    features: [
      'All subjects covered',
      'Activity-based learning',
      'Female tutors available'
    ],
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    glow: 'rgba(102,126,234,0.25)'
  },
  {
    icon: GraduationCap,
    badge: 'Class 6-10',
    title: 'Secondary Home Tuition',
    desc: 'Strengthen core subjects and prepare for board exams with experienced tutors who focus on concept clarity and exam techniques.',
    features: [
      'Board exam preparation',
      'Subject-specific tutors',
      'Regular test series'
    ],
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    glow: 'rgba(240,147,251,0.25)'
  },
  {
    icon: Briefcase,
    badge: 'Class 11-12',
    title: 'Senior Secondary Tuition',
    desc: 'Specialized coaching for PCM/PCB/Commerce streams with focus on board exams and competitive entrance preparation.',
    features: [
      'Stream-specific experts',
      'Board + Competitive prep',
      'Previous year papers'
    ],
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    glow: 'rgba(79,172,254,0.25)'
  },
  {
    icon: Trophy,
    badge: 'Competitive',
    title: 'NEET Preparation',
    desc: 'Dedicated NEET coaching at home with medical-qualified tutors. Physics, Chemistry & Biology covered in depth.',
    features: [
      'Medical field tutors',
      'Mock test series',
      'Doubt clearing sessions'
    ],
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    glow: 'rgba(247,151,30,0.25)'
  },
  {
    icon: Rocket,
    badge: 'Competitive',
    title: 'JEE Preparation',
    desc: 'IIT/NIT-qualified tutors for JEE Main & Advanced. Master Physics, Chemistry & Mathematics with proven strategies.',
    features: [
      'IIT-ian tutors',
      'Problem-solving focus',
      'Full-length mock tests'
    ],
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    glow: 'rgba(67,233,123,0.25)'
  },
  {
    icon: Globe,
    badge: 'Special',
    title: 'Language & Hobby Classes',
    desc: 'Spoken English, Hindi, Sanskrit, French, German & more. Also painting, music, and coding classes at home.',
    features: [
      'Native language speakers',
      'Conversation practice',
      'Flexible scheduling'
    ],
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    glow: 'rgba(250,112,154,0.25)'
  }
]

export default function ServicesDetailed() {
  return (
    <section className={styles.services}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardGlow} style={{ background: service.glow }}></div>

              <div className={styles.header}>
                <div className={styles.iconBox} style={{ background: service.gradient }}>
                  <service.icon size={28} color="#fff" />
                </div>
                <span className={styles.badge} style={{ 
                  background: service.glow,
                  color: '#fff',
                  border: `1px solid ${service.glow}`
                }}>
                  {service.badge}
                </span>
              </div>

              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>

              <ul className={styles.features}>
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} style={{ color: service.gradient.includes('667eea') ? '#667eea' : service.gradient.includes('f093fb') ? '#f093fb' : service.gradient.includes('4facfe') ? '#4facfe' : service.gradient.includes('f7971e') ? '#f7971e' : service.gradient.includes('43e97b') ? '#43e97b' : '#fa709a' }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="/contact"
                className={styles.btn}
                style={{ backgroundImage: service.gradient }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
