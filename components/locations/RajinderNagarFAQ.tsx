'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './RajinderNagarComponents.module.css'

const faqs = [
  {
    question: 'Do you have tutors in all areas of Rajinder Nagar and Central Delhi?',
    answer: 'Yes! We have 180+ tutors across all major Central Delhi areas including Rajinder Nagar, Karol Bagh, Patel Nagar, Connaught Place, and surrounding localities.'
  },
  {
    question: 'How quickly can I get a tutor in Rajinder Nagar?',
    answer: 'Standard placement is within 24 hours. For urgent requirements, we can arrange a tutor within 4-6 hours in most Rajinder Nagar and Central Delhi areas.'
  },
  {
    question: 'Are tutors familiar with Central Delhi schools?',
    answer: 'Yes, our tutors are experienced with Modern School, Sardar Patel Vidyalaya, Convent of Jesus & Mary, St. Columba\'s and all major Central Delhi schools.'
  },
  {
    question: 'What are the fees for home tuition in Rajinder Nagar?',
    answer: 'Fees range from ₹3,000/month for primary classes to ₹20,000/month for JEE/NEET preparation, depending on class and subject.'
  },
  {
    question: 'Is there a free demo class?',
    answer: 'Yes! We provide a completely free demo class at your home in Rajinder Nagar. You pay only if you\'re satisfied with the tutor.'
  }
]

export default function RajinderNagarFAQ() {
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
          <h2>Home Tuition in Rajinder Nagar — FAQs</h2>
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
