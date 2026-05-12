'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './GurgaonComponents.module.css'

const reviews = [
  {
    name: 'Priya Sharma',
    area: 'DLF Phase 3',
    rating: 5,
    text: 'Excellent service! Got a maths tutor for my son within 24 hours. The tutor is very experienced and my son\'s grades have improved significantly.'
  },
  {
    name: 'Rajesh Kumar',
    area: 'Sector 56',
    rating: 5,
    text: 'Very professional. The tutor they sent for my daughter\'s NEET preparation is outstanding. Highly recommend Simrit Gyan for Gurgaon parents.'
  },
  {
    name: 'Anjali Verma',
    area: 'Golf Course Road',
    rating: 5,
    text: 'Best home tuition service in Gurgaon! Female tutor for my daughter, very punctual and teaches really well. Thank you Simrit Gyan!'
  }
]

export default function GurgaonReviews() {
  return (
    <section className={styles.reviews}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Gurgaon Reviews</span>
          <h2>What Gurgaon Parents Say About Us</h2>
        </motion.div>

        <div className={styles.reviewGrid}>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className={styles.reviewCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className={styles.reviewStars}>
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="#ffd700" color="#ffd700" />
                ))}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.reviewAuthor}>
                <strong>{review.name}</strong>
                <span>{review.area}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
