'use client'
import { motion } from 'framer-motion'
import { Star, Award } from 'lucide-react'
import styles from './TutorsShowcase.module.css'

const tutors = [
  {
    name: 'Rajesh Mishra',
    qualification: 'M.Sc Mathematics, B.Ed',
    rating: 4.9,
    reviews: 127,
    subjects: ['Maths', 'Class 9-12', 'CBSE'],
    experience: '8 years experience. Specializes in making complex maths concepts simple. Board exam expert.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    verified: true
  },
  {
    name: 'Dr. Sunita Patel',
    qualification: 'Ph.D Chemistry',
    rating: 4.8,
    reviews: 89,
    subjects: ['Chemistry', 'NEET', 'Class 11-12'],
    experience: '12 years experience. Former college professor. NEET chemistry specialist with 90%+ selection rate.',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    verified: true
  },
  {
    name: 'Vikram Singh',
    qualification: 'B.Tech IIT Delhi',
    rating: 5.0,
    reviews: 64,
    subjects: ['Physics', 'JEE', 'Class 11-12'],
    experience: '5 years experience. IIT graduate with a passion for teaching physics through real-world applications.',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    verified: true
  },
  {
    name: 'Anjali Gupta',
    qualification: 'M.A English, CTET',
    rating: 4.9,
    reviews: 95,
    subjects: ['English', 'All Classes', 'ICSE/CBSE'],
    experience: '10 years experience. Expert in grammar, writing skills & literature. Makes English fun and easy.',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    verified: true
  },
  {
    name: 'Mohammed Farhan',
    qualification: 'M.Sc Biology',
    rating: 4.7,
    reviews: 73,
    subjects: ['Biology', 'NEET', 'Class 9-12'],
    experience: '7 years experience. Diagram-based teaching method. NEET Biology expert with proven track record.',
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    verified: true
  },
  {
    name: 'Neha Agarwal',
    qualification: 'B.Com, M.Com, CA Inter',
    rating: 4.8,
    reviews: 56,
    subjects: ['Accounts', 'Commerce', 'Class 11-12'],
    experience: '6 years experience. Makes accounting concepts practical with real business examples. Board exam specialist.',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    verified: true
  },
  {
    name: 'Priya Sharma',
    qualification: 'M.Sc Physics, B.Ed',
    rating: 4.9,
    reviews: 82,
    subjects: ['Physics', 'Class 9-12', 'CBSE'],
    experience: '9 years experience. Focuses on conceptual clarity and problem-solving techniques.',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    verified: true
  },
  {
    name: 'Amit Kumar',
    qualification: 'B.Tech Computer Science',
    rating: 4.8,
    reviews: 68,
    subjects: ['Computer Science', 'Coding', 'Class 9-12'],
    experience: '6 years experience. Expert in programming languages and software development.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    verified: true
  }
]

export default function TutorsShowcase() {
  return (
    <section className={styles.tutors}>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.verificationBadge}>
            <Award size={20} />
            <span>Our 5-Step Verification Process</span>
          </div>
          <p className={styles.verificationText}>
            Every tutor goes through — ID Verification → Qualification Check → Demo Class Evaluation → Background Check → Continuous Performance Monitoring
          </p>
        </motion.div>

        <div className={styles.grid}>
          {tutors.map((tutor, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.cardGlow} style={{ background: tutor.gradient.replace('linear-gradient(135deg,', 'radial-gradient(circle,').replace(')', ', transparent)') }}></div>

              <div className={styles.avatar} style={{ background: tutor.gradient }}>
                <span className={styles.initials}>{tutor.name.split(' ').map(n => n[0]).join('')}</span>
                {tutor.verified && (
                  <div className={styles.verifiedBadge}>✓</div>
                )}
              </div>

              <h3 className={styles.name}>{tutor.name}</h3>
              <p className={styles.qualification}>{tutor.qualification}</p>

              <div className={styles.rating}>
                <div className={styles.stars}>
                  <Star size={16} fill="#ffd700" color="#ffd700" />
                  <span className={styles.ratingValue}>{tutor.rating}</span>
                </div>
                <span className={styles.reviews}>({tutor.reviews} reviews)</span>
              </div>

              <div className={styles.subjects}>
                {tutor.subjects.map((subject, idx) => (
                  <span key={idx} className={styles.subjectTag} style={{ 
                    background: tutor.gradient.includes('667eea') ? 'rgba(102,126,234,0.15)' : 
                               tutor.gradient.includes('f093fb') ? 'rgba(240,147,251,0.15)' :
                               tutor.gradient.includes('4facfe') ? 'rgba(79,172,254,0.15)' :
                               tutor.gradient.includes('43e97b') ? 'rgba(67,233,123,0.15)' :
                               tutor.gradient.includes('f7971e') ? 'rgba(247,151,30,0.15)' :
                               tutor.gradient.includes('fa709a') ? 'rgba(250,112,154,0.15)' : 'rgba(161,140,209,0.15)',
                    color: '#fff'
                  }}>
                    {subject}
                  </span>
                ))}
              </div>

              <p className={styles.experience}>{tutor.experience}</p>

              <motion.a
                href="#join-form"
                className={styles.btn}
                style={{ backgroundImage: tutor.gradient }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Demo with {tutor.name.split(' ')[0]}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.ctaBox}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Are You a Qualified Tutor?</h3>
          <p>Join Simrit Gyan and connect with students who need your expertise. Flexible schedule, great earnings, and full support.</p>
          <motion.a
            href="#join-form"
            className={styles.ctaBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join as Tutor
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
