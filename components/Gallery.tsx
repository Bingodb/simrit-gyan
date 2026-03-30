'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './Gallery.module.css'

type GalleryImg = { _id: string; url: string; caption: string; size: number }

const FALLBACK = [
  { _id: '1', url: '', caption: 'Achievement 1', size: 1, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { _id: '2', url: '', caption: 'Achievement 2', size: 1, color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { _id: '3', url: '', caption: 'Achievement 3', size: 1, color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { _id: '4', url: '', caption: 'Achievement 4', size: 1, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { _id: '5', url: '', caption: 'Achievement 5', size: 1, color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { _id: '6', url: '', caption: 'Achievement 6', size: 1, color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
]

export default function Gallery() {
  const [images, setImages] = useState<(GalleryImg & { color?: string })[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/subadmin/gallery')
      .then(r => r.json())
      .then(d => { setImages(Array.isArray(d) && d.length > 0 ? d : FALLBACK); setLoaded(true) })
      .catch(() => { setImages(FALLBACK); setLoaded(true) })
  }, [])

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
          <p className={styles.subtitle}>Our students&apos; achievements and milestones</p>
        </motion.div>

        <div className={styles.grid}>
          {(loaded ? images : FALLBACK).map((img, i) => (
            <motion.div
              key={img._id}
              className={styles.item}
              style={{
                background: img.url ? 'transparent' : (img.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
                gridColumn: img.size === 2 ? 'span 2' : 'span 1',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
            >
              {img.url && (
                <img
                  src={img.url}
                  alt={img.caption || `Gallery image ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              <div className={styles.overlay}>
                <span>{img.caption || `Achievement ${i + 1}`}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
