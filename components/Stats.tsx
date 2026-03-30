'use client'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Users, TrendingUp, GraduationCap, MapPin } from 'lucide-react'
import styles from './Stats.module.css'

const stats = [
  { value: 5000, suffix: '+', label: 'Students Taught', icon: Users, gradient: 'linear-gradient(135deg, #667eea, #764ba2)', glow: 'rgba(102,126,234,0.3)' },
  { value: 95, suffix: '%', label: 'Success Rate', icon: TrendingUp, gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', glow: 'rgba(240,147,251,0.3)' },
  { value: 200, suffix: '+', label: 'Expert Tutors', icon: GraduationCap, gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', glow: 'rgba(79,172,254,0.3)' },
  { value: 10, suffix: '+', label: 'Cities Covered', icon: MapPin, gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)', glow: 'rgba(67,233,123,0.3)' }
]

function Counter({ end, suffix, inView }: { end: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <>{count}{suffix}</>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>✦ Our Impact</span>
          <h2 className={styles.title}>Numbers That <span className={styles.highlight}>Speak</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className={styles.glowBg} style={{ background: stat.glow }}></div>

              <div className={styles.iconRow}>
                <div className={styles.iconBox} style={{ background: stat.gradient }}>
                  <stat.icon size={22} color="#fff" />
                </div>
                <div className={styles.pulse} style={{ background: stat.glow }}></div>
              </div>

              <div className={styles.value} style={{ backgroundImage: stat.gradient }}>
                <Counter end={stat.value} suffix={stat.suffix} inView={inView} />
              </div>

              <p className={styles.label}>{stat.label}</p>

              <div className={styles.bar}>
                <motion.div
                  className={styles.barFill}
                  style={{ background: stat.gradient }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.4, duration: 1.2, ease: 'easeOut' }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
