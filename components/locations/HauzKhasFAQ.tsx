'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './HauzKhasComponents.module.css'

const faqs = [
  {
    question: 'Do you have tutors in all areas of Hauz Khas and South Delhi?',
    answer: 'Yes! We have 200+ tutors across all major South Delhi areas including Hauz Khas Village, Green Park, Safdarjung, IIT Area, Malviya Nagar, Saket, and Greater Kailash.'
  },
  {
    question: 'How quickly can I get a tutor in Hauz Khas?',
    answer: 'Standard placement is within 24 hours. For urgent requirements, we can arrange a tutor within 4-6 hours in most Hauz Khas and South Delhi areas.'
  },
  {
    question: 'Are tutors familiar with South Delhi schools?',
    answer: 'Yes, our tutors are experienced with DPS, Sanskriti, Vasant Valley, Springdales, Modern School, Amity, Bal Bharati and all major South Delhi schools.'
  },
  {
    question: 'What are the fees for home tuition in Hauz Khas?',
    answer: 'Fees range from ₹3,000/month for primary classes to ₹20,000/month for JEE/NEET preparation, depending on class and subject.'
  },
  {
    question: 'Is there a free demo class?',
    answer: 'Yes! We provide a completely free demo class at your home in Hauz Khas. You pay only if you\'re satisfied with the tutor.'
  }
]

export default function HauzKhasFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>FAQ</span>
          <h2>Home Tuition in Hauz Khas — FAQs</h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className={`${styles.faqQuestion} ${openIndex === i ? styles.active : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
