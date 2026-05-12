'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './UttamNagarComponents.module.css'

const faqs = [
  {
    question: 'Do you have tutors in all areas of Uttam Nagar and West Delhi?',
    answer: 'Yes! We have 250+ tutors across all major West Delhi areas including Uttam Nagar, Janakpuri, Dwarka Mor, Tilak Nagar, Vikaspuri, and Paschim Vihar.'
  },
  {
    question: 'How quickly can I get a tutor in Uttam Nagar?',
    answer: 'Standard placement is within 24 hours. For urgent requirements, we can arrange a tutor within 4-6 hours in most Uttam Nagar and West Delhi areas.'
  },
  {
    question: 'Are tutors familiar with West Delhi schools?',
    answer: 'Yes, our tutors are experienced with DAV, Kendriya Vidyalaya, Ryan International, St. Mary\'s, Salwan Public School and all major West Delhi schools.'
  },
  {
    question: 'What are the fees for home tuition in Uttam Nagar?',
    answer: 'Fees range from ₹3,000/month for primary classes to ₹20,000/month for JEE/NEET preparation, depending on class and subject.'
  },
  {
    question: 'Is there a free demo class?',
    answer: 'Yes! We provide a completely free demo class at your home in Uttam Nagar. You pay only if you\'re satisfied with the tutor.'
  }
]

export default function UttamNagarFAQ() {
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
          <h2>Home Tuition in Uttam Nagar — FAQs</h2>
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
