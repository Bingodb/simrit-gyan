'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './RajinderNagarComponents.module.css'

const reviews = [
  {
    name: 'Anita Kapoor',
    area: 'Old Rajinder Nagar',
    rating: 5,
    text: 'Excellent service! Got a physics tutor for my son within 24 hours. The tutor is from IIT and teaches with great clarity. Highly recommend!'
  },
  {
    name: 'Vikram Singh',
    area: 'Karol Bagh',
    rating: 5,
    text: 'Very professional service. The maths tutor they sent for my daughter is outstanding. Her confidence has improved tremendously.'
  },
  {
    name: 'Deepa Sharma',
    area: 'Patel Nagar',
    rating: 5,
    text: 'Best home tuition in Central Delhi! Female tutor for my daughter, very punctual and dedicated. My daughter\'s grades improved significantly. Thank you Simrit Gyan!'
  }
]

export default function RajinderNagarReviews() {
  return (
    <section className={styles.reviews}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Rajinder Nagar Reviews</span>
          <h2>What Rajinder Nagar Parents Say About Us</h2>
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
