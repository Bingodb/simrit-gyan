'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    name: 'Ritu Sharma',
    role: 'Parent, Class 10 CBSE',
    initials: 'RS',
    rating: 5,
    text: 'My daughter\'s maths score improved from 45 to 89 in just 3 months! The tutor was patient and methodical. Best decision we made.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    name: 'Amit Kumar',
    role: 'Parent, Class 12 Science',
    initials: 'AK',
    rating: 5,
    text: 'Simrit Gyan found us the perfect science tutor for board exam prep. My son is now confident about his NEET preparation. Thank you!',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    name: 'Priya Verma',
    role: 'Parent, Class 8 ICSE',
    initials: 'PV',
    rating: 5,
    text: 'I was struggling to find a good female English tutor for my daughter. Simrit Gyan arranged one within 2 days. Very professional service!',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
  }
]

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>Testimonials</span>
          <h2 className={styles.title}>What Parents <span className={styles.highlight}>Say</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.stars}>
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <Star key={idx} size={18} fill="#ffd700" color="#ffd700" />
                ))}
              </div>

              <p className={styles.text}>{testimonial.text}</p>

              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: testimonial.gradient }}>
                  {testimonial.initials}
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.name}>{testimonial.name}</h4>
                  <p className={styles.role}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
