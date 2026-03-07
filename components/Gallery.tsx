'use client'
import { motion } from 'framer-motion'
import styles from './Gallery.module.css'

const images = [
  { id: 1, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
  { id: 7, color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 8, color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }
]

export default function Gallery() {
  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Success Stories</h2>
          <p className={styles.subtitle}>Our students' achievements and milestones</p>
        </motion.div>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className={styles.item}
              style={{ background: img.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className={styles.overlay}>
                <span>Achievement {img.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}