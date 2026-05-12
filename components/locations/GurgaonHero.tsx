'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, CheckCircle, Phone, MessageCircle } from 'lucide-react'
import styles from './GurgaonHero.module.css'

const AREAS = [
  'DLF Phase 1', 'DLF Phase 2', 'DLF Phase 3', 'DLF Phase 4', 'DLF Phase 5',
  'Sohna Road', 'Golf Course Road', 'MG Road', 'Cyber City / DLF Cyberhub',
  'Sector 14', 'Sector 15', 'Sector 23', 'Sector 31', 'Sector 38', 'Sector 40',
  'Sector 45', 'Sector 46', 'Sector 49', 'Sector 50', 'Sector 51', 'Sector 52',
  'Sector 56', 'Sector 57', 'Sector 65-67', 'Sector 70-73', 'Sector 82-85',
  'Sushant Lok', 'South City 1 & 2', 'Nirvana Country', 'Palam Vihar', 'Other Gurgaon Area'
]

export default function GurgaonHero() {
  const [formData, setFormData] = useState({
    studentName: '',
    mobile: '',
    studentClass: '',
    subject: '',
    area: '',
    tutorPreference: 'No Preference'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would typically send the data to your API
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MapPin size={16} />
            <span>Gurgaon</span>
          </motion.div>

          <motion.div
            className={styles.rating}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Star size={16} fill="#ffd700" color="#ffd700" />
            <span>4.8★ · 434+ Reviews · Trusted in Gurgaon</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Best Home Tuition in Gurgaon — All Sectors Covered
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            300+ verified home tutors in Gurgaon for DLF, Sohna Road, Golf Course Road, Sector 1-57. Class 1-12, JEE, NEET. Free demo at your doorstep.
          </motion.p>

          <motion.div
            className={styles.features}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.feature}>
              <CheckCircle size={18} />
              <span>DLF, Sohna Rd, Golf Course Rd</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={18} />
              <span>Sector 1 to 57</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={18} />
              <span>Female Tutors Available</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a href="#booking-form" className={styles.primaryBtn}>
              Book Free Demo Class
            </a>
            <a href="https://wa.me/919599379705" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          id="booking-form"
        >
          {!submitted ? (
            <>
              <div className={styles.formHeader}>
                <MapPin size={20} className={styles.formIcon} />
                <div>
                  <h3>Book Free Demo in Gurgaon</h3>
                  <p>Get a tutor at your doorstep today</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Student Name *"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number *"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />

                <div className={styles.formRow}>
                  <select name="studentClass" value={formData.studentClass} onChange={handleChange} required>
                    <option value="">Class *</option>
                    <option value="Class 1-5">Class 1-5</option>
                    <option value="Class 6-8">Class 6-8</option>
                    <option value="Class 9-10">Class 9-10</option>
                    <option value="Class 11-12 Sci">Class 11-12 Sci</option>
                    <option value="Class 11-12 Com">Class 11-12 Com</option>
                    <option value="JEE/NEET">JEE/NEET</option>
                  </select>

                  <select name="subject" value={formData.subject} onChange={handleChange} required>
                    <option value="">Subject *</option>
                    <option value="All Subjects">All Subjects</option>
                    <option value="Maths">Maths</option>
                    <option value="Science">Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                    <option value="Accounts">Accounts</option>
                  </select>
                </div>

                <select name="area" value={formData.area} onChange={handleChange} required>
                  <option value="">Your Area in Gurgaon *</option>
                  {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>

                <select name="tutorPreference" value={formData.tutorPreference} onChange={handleChange}>
                  <option value="No Preference">Tutor Preference</option>
                  <option value="Male Tutor">Male Tutor</option>
                  <option value="Female Tutor">Female Tutor</option>
                  <option value="No Preference">No Preference</option>
                </select>

                <button type="submit" className={styles.submitBtn}>
                  Get Free Demo Class
                </button>
                <p className={styles.privacy}>🔒 100% secure & private</p>
              </form>
            </>
          ) : (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Enquiry Submitted!</h3>
              <p>Our Gurgaon counselor will call you within 30 minutes.</p>
              <a href="tel:+919599379705" className={styles.callBtn}>
                <Phone size={18} />
                Call Now
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
