'use client'
import { motion } from 'framer-motion'
import { Calculator, FlaskConical, BookOpen, Trophy, Monitor, TrendingUp } from 'lucide-react'
import styles from './Services.module.css'

const services = [
  {
    icon: Calculator,
    title: 'Mathematics',
    desc: 'Expert tutors for all levels from basic arithmetic to advanced calculus',
    tag: 'Most Popular',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    glow: 'rgba(102,126,234,0.25)',
    symbol: '∑'
  },
  {
    icon: FlaskConical,
    title: 'Science',
    desc: 'Physics, Chemistry, Biology — comprehensive coverage with experiments',
    tag: 'Lab Ready',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    glow: 'rgba(240,147,251,0.25)',
    symbol: '⚗'
  },
  {
    icon: BookOpen,
    title: 'Languages',
    desc: 'English, Hindi and regional language tutoring for fluency and grammar',
    tag: 'Communication',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    glow: 'rgba(79,172,254,0.25)',
    symbol: 'Aa'
  },
  {
    icon: Trophy,
    title: 'Competitive Exams',
    desc: 'JEE, NEET, Board exam preparation with proven strategies',
    tag: 'High Demand',
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    glow: 'rgba(247,151,30,0.25)',
    symbol: '🏆'
  },
  {
    icon: Monitor,
    title: 'Computer Science',
    desc: 'Programming, IT subjects and digital literacy for modern students',
    tag: 'Tech Skills',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    glow: 'rgba(67,233,123,0.25)',
    symbol: '</>'
  },
  {
    icon: TrendingUp,
    title: 'All Subjects',
    desc: 'Complete academic support for all grades from Class 1 to 12',
    tag: 'Full Package',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    glow: 'rgba(250,112,154,0.25)',
    symbol: '★'
  }
]

export default function Services() {
  return (
    <section className={styles.services} id="services">
      {/* Educational SVG background */}
      <div className={styles.bgPattern}>
        {['∫', 'π', 'E=mc²', '∑', 'DNA', 'H₂O', 'ABC', '∞', 'Δ', 'λ', 'θ', '√', 'F=ma', 'pH', 'sin', 'cos'].map((sym, i) => (
          <span key={i} className={styles.floatSym} style={{
            left: `${(i * 6.5) % 100}%`,
            top: `${(i * 13 + 5) % 90}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: i % 3 === 0 ? '1.4rem' : '1rem'
          }}>{sym}</span>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            📚 What We Teach
          </motion.span>
          <h2 className={styles.title}>
            Our <span className={styles.highlight}>Subjects</span>
          </h2>
          <p className={styles.subtitle}>Comprehensive tutoring for all academic needs across every grade</p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -12 }}
            >
              <div className={styles.cardGlow} style={{ background: service.glow }}></div>

              {/* Top row */}
              <div className={styles.cardTop}>
                <div className={styles.iconBox} style={{ background: service.gradient }}>
                  <service.icon size={26} color="#fff" />
                </div>
                <span className={styles.tag} style={{ background: service.glow, color: '#fff' }}>
                  {service.tag}
                </span>
              </div>

              {/* Big symbol watermark */}
              <div className={styles.symbol}>{service.symbol}</div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>

              <motion.div
                className={styles.learnMore}
                style={{ backgroundImage: service.gradient }}
                whileHover={{ x: 5 }}
              >
                Explore →
              </motion.div>

              {/* Bottom gradient line */}
              <div className={styles.bottomLine} style={{ background: service.gradient }}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
