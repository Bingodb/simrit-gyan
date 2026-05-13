'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './DelhiComponents.module.css'

const reviews = [
  {
    name: 'Anita Kapoor',
    area: 'Hauz Khas',
    rating: 5,
    text: 'Excellent service! Got a physics tutor for my son within 24 hours. The tutor is from IIT and teaches with great clarity. Highly recommend!'
  },
  {
    name: 'Sunita Gupta',
    area: 'Uttam Nagar',
    rating: 5,
    text: 'Very professional service. The tutor they sent is experienced and my daughter\'s maths has improved significantly in just 2 months.'
  },
  {
    name: 'Rajesh Sharma',
    area: 'Rajinder Nagar',
    rating: 5,
    text: 'Best home tuition service in Delhi! My son was struggling with chemistry, now he\'s scoring 90+. Thank you Simrit Gyan!'
  },
  {
    name: 'Priya Malhotra',
    area: 'Green Park',
    rating: 5,
    text: 'The free demo class was very helpful. We liked the tutor and continued. My daughter is now much more confident in her studies.'
  },
]

export default function DelhiReviews() {
  return (
    <section className={styles.reviews}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Delhi Reviews</span>
          <h2>What Delhi Parents Say About Us</h2>
        </motion.div>

        <div className={styles.reviewsGrid}>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className={styles.reviewCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.stars}>
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={16} fill="#ffd700" color="#ffd700" />
                ))}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.reviewer}>
                <div className={styles.reviewerAvatar}>{review.name.charAt(0)}</div>
                <div>
                  <p className={styles.reviewerName}>{review.name}</p>
                  <p className={styles.reviewerArea}>{review.area}, Delhi</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
