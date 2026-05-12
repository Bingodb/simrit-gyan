'use client'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import styles from './Boards.module.css'

const boards = [
  { name: 'CBSE', icon: '📚' },
  { name: 'ICSE', icon: '📖' },
  { name: 'State Board', icon: '🏫' },
  { name: 'IB', icon: '🌍' },
  { name: 'Cambridge', icon: '🎓' }
]

export default function Boards() {
  return (
    <section className={styles.boards}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.title}>We Cover All Major Boards</h3>
          <div className={styles.boardList}>
            {boards.map((board, i) => (
              <motion.div
                key={i}
                className={styles.boardItem}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.icon}>{board.icon}</span>
                <span className={styles.name}>{board.name}</span>
                <CheckCircle size={18} className={styles.check} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
