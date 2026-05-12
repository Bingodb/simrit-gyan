'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './FAQ.module.css'

const faqs = [
  {
    question: 'How do I book a free demo class?',
    answer: 'Simply fill our registration form or call/WhatsApp us. We\'ll match you with a suitable tutor and arrange a free demo class at your preferred time.'
  },
  {
    question: 'Are your tutors verified?',
    answer: 'Yes! Every tutor goes through our 5-step verification process — ID check, qualification verification, demo evaluation, background check, and ongoing performance monitoring.'
  },
  {
    question: 'What if I\'m not satisfied with the tutor?',
    answer: 'We offer free tutor replacement. If you\'re not happy with the assigned tutor, just let us know and we\'ll arrange a new one at no extra cost.'
  },
  {
    question: 'What subjects and classes do you cover?',
    answer: 'We cover all subjects from Class 1 to 12 across CBSE, ICSE, State Board, IB and Cambridge. We also provide NEET, JEE, and Olympiad preparation.'
  },
  {
    question: 'How much does home tuition cost?',
    answer: 'Our fees start from ₹2,500/month for primary classes and vary based on class, subject, and location. Contact us for exact pricing for your needs.'
  },
  {
    question: 'Can I choose a female tutor?',
    answer: 'Absolutely! We have many qualified female tutors available. Just mention your preference during registration and we\'ll match accordingly.'
  },
  {
    question: 'Do you provide online classes too?',
    answer: 'Yes, we offer both home tuition and online classes. You can choose whichever mode suits you best.'
  },
  {
    question: 'What areas do you cover?',
    answer: 'We currently operate in 50+ cities across India. Contact us with your location and we\'ll check tutor availability in your area.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>
            Frequently Asked <span className={styles.highlight}>Questions</span>
          </h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.icon}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
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
