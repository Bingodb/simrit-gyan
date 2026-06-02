'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, CheckCircle, Phone, MessageCircle } from 'lucide-react'
import styles from './DelhiHero.module.css'

const DELHI_AREAS = [
  // South Delhi areas
  { name: 'Hauz Khas', region: 'South Delhi' },
  { name: 'Saket', region: 'South Delhi' },
  { name: 'Greater Kailash', region: 'South Delhi' },
  { name: 'Malviya Nagar', region: 'South Delhi' },
  { name: 'Lajpat Nagar', region: 'South Delhi' },
  { name: 'Defence Colony', region: 'South Delhi' },
  { name: 'Green Park', region: 'South Delhi' },
  { name: 'Nehru Place', region: 'South Delhi' },
  { name: 'Vasant Kunj', region: 'South Delhi' },
  
  // South West Delhi areas
  { name: 'Uttam Nagar', region: 'South West Delhi' },
  { name: 'Dwarka', region: 'South West Delhi' },
  { name: 'Janakpuri', region: 'South West Delhi' },
  { name: 'Vikaspuri', region: 'South West Delhi' },
  { name: 'Palam', region: 'South West Delhi' },
  { name: 'Nawada', region: 'South West Delhi' },
  { name: 'Tilak Nagar', region: 'South West Delhi' },
  { name: 'Rajouri Garden', region: 'South West Delhi' },
  
  // Central Delhi areas
  { name: 'Rajinder Nagar', region: 'Central Delhi' },
  { name: 'Patel Nagar', region: 'Central Delhi' },
  { name: 'Connaught Place', region: 'Central Delhi' },
  { name: 'Paharganj', region: 'Central Delhi' },
  { name: 'Chandni Chowk', region: 'Central Delhi' },
  { name: 'Kashmere Gate', region: 'Central Delhi' },
  
  // DELHI (Karol Bagh area)
  { name: 'Karol Bagh', region: 'DELHI' },
  { name: 'Rajendra Place', region: 'DELHI' },
  { name: 'Ramesh Nagar', region: 'DELHI' },
  
  // Fallback
  { name: 'Other Delhi Area', region: 'Central Delhi' },
]

export default function DelhiHero() {
  const [formData, setFormData] = useState({
    studentName: '',
    mobile: '',
    studentClass: '',
    subject: '',
    area: '',
    tutorPreference: 'No Preference'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Submit to API
    const res = await fetch('/api/student-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.studentName,
        phone: formData.mobile,
        studentClass: formData.studentClass,
        subject: formData.subject,
        city: 'Delhi',
        area: formData.area,
        message: `Tutor Preference: ${formData.tutorPreference}`
      }),
    })
    
    if (res.ok) {
      setSubmitted(true)
    }
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
            <span>Delhi NCR</span>
          </motion.div>

          <motion.div
            className={styles.rating}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Star size={16} fill="#ffd700" color="#ffd700" />
            <span>4.8★ · 850+ Reviews · Trusted in Delhi</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Best Home Tuition in Delhi — All Areas Covered
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            630+ verified home tutors across South Delhi, West Delhi, Central Delhi. Class 1-12, JEE, NEET. Free demo at your doorstep.
          </motion.p>

          <motion.div
            className={styles.features}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.feature}>
              <CheckCircle size={18} />
              <span>Hauz Khas, Green Park, Malviya Nagar</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={18} />
              <span>Uttam Nagar, Janakpuri, Dwarka Mor</span>
            </div>
            <div className={styles.feature}>
              <CheckCircle size={18} />
              <span>Rajinder Nagar, Karol Bagh, Patel Nagar</span>
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
            <a href="https://wa.me/918800535421" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
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
                  <h3>Book Free Demo in Delhi</h3>
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
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Competitive Exams (JEE/NEET)">Competitive Exams (JEE/NEET)</option>
                    <option value="Other">Other</option>
                  </select>

                  <select name="subject" value={formData.subject} onChange={handleChange} required>
                    <option value="">Subject *</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Science">Science</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Accountancy">Accountancy</option>
                    <option value="Economics">Economics</option>
                    <option value="All Subjects">All Subjects</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <select name="area" value={formData.area} onChange={handleChange} required>
                  <option value="">Your Area in Delhi *</option>
                  {DELHI_AREAS.map(area => (
                    <option key={area.name} value={area.name}>
                      {area.name} ({area.region})
                    </option>
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
              <p>Our Delhi counselor will call you within 30 minutes.</p>
              <a href="tel:+917503219801" className={styles.callBtn}>
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
