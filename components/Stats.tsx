'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './Stats.module.css'

const stats = [
  { value: 5000, suffix: '+', label: 'Students Taught' },
  { value: 95, suffix: '%', label: 'Success Rate' },
  { value: 200, suffix: '+', label: 'Expert Tutors' },
  { value: 10, suffix: '+', label: 'Cities Covered' }
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end])

  return <span>{count}{suffix}</span>
}

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.gradient}></div>
      <div className={styles.container}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={styles.stat}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring' }}
          >
            <h3 className={styles.value}>
              <Counter end={stat.value} suffix={stat.suffix} />
            </h3>
            <p className={styles.label}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}