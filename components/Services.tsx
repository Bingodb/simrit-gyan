'use client'
import { motion } from 'framer-motion'
import { Calculator, FlaskConical, BookOpen, Trophy, Monitor, TrendingUp } from 'lucide-react'
import styles from './Services.module.css'

const services = [
  {
    icon: Calculator,
    title: 'Primary Home Tuition',
    desc: 'Build strong foundations in Maths, English, EVS & Hindi with patient, caring tutors who make learning fun for young minds.',
    tag: 'Class 1-5',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    glow: 'rgba(102,126,234,0.25)',
    symbol: '∑'
  },
  {
    icon: FlaskConical,
    title: 'Secondary Home Tuition',
    desc: 'Strengthen core subjects and prepare for board exams with experienced tutors who focus on concept clarity and exam techniques.',
    tag: 'Class 6-10',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    glow: 'rgba(240,147,251,0.25)',
    symbol: '⚗'
  },
  {
    icon: BookOpen,
    title: 'Senior Secondary Tuition',
    desc: 'Specialized coaching for PCM/PCB/Commerce streams with focus on board exams and competitive entrance preparation.',
    tag: 'Class 11-12',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    glow: 'rgba(79,172,254,0.25)',
    symbol: 'Aa'
  },
  {
    icon: Trophy,
    title: 'NEET Preparation',
    desc: 'Dedicated NEET coaching at home with medical-qualified tutors. Physics, Chemistry & Biology covered in depth.',
    tag: 'Competitive',
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    glow: 'rgba(247,151,30,0.25)',
    symbol: '🏆'
  },
  {
    icon: Monitor,
    title: 'JEE Preparation',
    desc: 'IIT/NIT-qualified tutors for JEE Main & Advanced. Master Physics, Chemistry & Mathematics with proven strategies.',
    tag: 'Competitive',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    glow: 'rgba(67,233,123,0.25)',
    symbol: '</>'
  },
  {
    icon: TrendingUp,
    title: 'Language & Hobby Classes',
    desc: 'Spoken English, Hindi, Sanskrit, French, German & more. Also painting, music, and coding classes at home.',
    tag: 'Special',
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
            Our Services
          </motion.span>
          <h2 className={styles.title}>
            Tuition <span className={styles.highlight}>Services</span>
          </h2>
          <p className={styles.subtitle}>Comprehensive home tuition solutions for every academic need — from primary school to competitive exam preparation.</p>
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
