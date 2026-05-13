'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './DelhiComponents.module.css'

const faqs = [
  {
    question: 'Do you have tutors in all areas of Delhi?',
    answer: 'Yes! We have 630+ tutors across all major Delhi areas including South Delhi (Hauz Khas, Green Park, Malviya Nagar), West Delhi (Uttam Nagar, Janakpuri, Dwarka Mor), and Central Delhi (Rajinder Nagar, Karol Bagh, Patel Nagar).'
  },
  {
    question: 'How quickly can I get a tutor in Delhi?',
    answer: 'Standard placement is within 24 hours. For urgent requirements, we can arrange a tutor within 4-6 hours in most Delhi areas.'
  },
  {
    question: 'Are your tutors verified?',
    answer: 'Yes, all tutors undergo background verification, ID checks, and qualification verification. We also check teaching experience and references.'
  },
  {
    question: 'What are the fees for home tuition in Delhi?',
    answer: 'Fees range from ₹3,000/month for primary classes to ₹25,000/month for JEE/NEET preparation, depending on class and subject.'
  },
  {
    question: 'Is there a free demo class?',
    answer: 'Yes! We provide a completely free demo class at your home in Delhi. You pay only if you\'re satisfied with the tutor.'
  }
]

export default function DelhiFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
          <h2>Home Tuition in Delhi — FAQs</h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                className={`${styles.faqQuestion} ${openIndex === i ? styles.active : ''}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.question}</span>
                <ChevronDown size={20} className={styles.chevron} />
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
