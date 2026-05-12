'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './HauzKhasComponents.module.css'

const reviews = [
  {
    name: 'Neha Kapoor',
    area: 'Hauz Khas Enclave',
    rating: 5,
    text: 'Excellent service! Got a physics tutor for my daughter within 24 hours. The tutor is IIT graduate and teaches exceptionally well. Highly recommend!'
  },
  {
    name: 'Amit Malhotra',
    area: 'Green Park',
    rating: 5,
    text: 'Very professional service. The chemistry tutor they sent for my son\'s NEET preparation is outstanding. His concepts are now crystal clear.'
  },
  {
    name: 'Ritu Sharma',
    area: 'Safdarjung Enclave',
    rating: 5,
    text: 'Best home tuition in South Delhi! Female tutor for my daughter, very punctual and patient. My daughter\'s grades improved from C to A. Thank you Simrit Gyan!'
  }
]

export default function HauzKhasReviews() {
  return (
    <section className={styles.reviews}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Hauz Khas Reviews</span>
          <h2>What Hauz Khas Parents Say About Us</h2>
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
