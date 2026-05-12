'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './UttamNagarComponents.module.css'

const reviews = [
  {
    name: 'Sunita Gupta',
    area: 'Uttam Nagar East',
    rating: 5,
    text: 'Excellent service! Got a maths tutor for my son within 24 hours. The tutor is very experienced and my son\'s performance has improved significantly.'
  },
  {
    name: 'Rajesh Kumar',
    area: 'Janakpuri',
    rating: 5,
    text: 'Very professional service. The science tutor they sent for my daughter is outstanding. She now enjoys studying and her grades have improved.'
  },
  {
    name: 'Meena Sharma',
    area: 'Dwarka Mor',
    rating: 5,
    text: 'Best home tuition in West Delhi! Female tutor for my daughter, very punctual and teaches really well. Highly recommend Simrit Gyan!'
  }
]

export default function UttamNagarReviews() {
  return (
    <section className={styles.reviews}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Uttam Nagar Reviews</span>
          <h2>What Uttam Nagar Parents Say About Us</h2>
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
