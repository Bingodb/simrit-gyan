'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent, Delhi',
    image: '👩‍💼',
    text: 'My daughter\'s grades improved dramatically! The tutor is patient, knowledgeable, and truly cares about her progress. Highly recommended!',
    rating: 5
  },
  {
    name: 'Rajesh Kumar',
    role: 'Parent, Mumbai',
    image: '👨‍💻',
    text: 'Excellent service! My son scored 95% in boards. The personalized attention and teaching methods are outstanding.',
    rating: 5
  },
  {
    name: 'Anjali Patel',
    role: 'Parent, Bangalore',
    image: '👩‍🎨',
    text: 'Best decision we made for our child\'s education. Professional tutors, flexible timing, and amazing results!',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Parent Testimonials</h2>
          <p className={styles.subtitle}>See what parents say about us</p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className={styles.testimonial}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.quoteIcon}>
                <Quote size={40} />
              </div>
              <div className={styles.stars}>
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={20} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
              <p className={styles.text}>{testimonial.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.image}</div>
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}