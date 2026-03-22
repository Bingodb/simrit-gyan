'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, User, BookOpen, MapPin, MessageSquare, Sparkles } from 'lucide-react'
import styles from './NeedATutor.module.css'

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12', 'Competitive Exams (JEE/NEET)', 'Other']

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
  'Hindi', 'Science', 'Social Studies', 'Computer Science', 'Accountancy',
  'Economics', 'All Subjects', 'Other']

const AREAS = ['Hauz Khas', 'Gurgaon', 'Connaught Place', 'Uttam Nagar']

export default function NeedATutor() {
  const [form, setForm] = useState({
    name: '', phone: '', studentClass: '', subject: '', city: '', area: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/student-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      setSuccess(true)
      setForm({ name: '', phone: '', studentClass: '', subject: '', city: '', area: '', message: '' })
    } else {
      const d = await res.json()
      setError(d.error || 'Something went wrong. Please try again.')
    }
  }

  if (success) {
    return (
      <section className={styles.page}>
        <div className={styles.successWrap}>
          <motion.div className={styles.successBox} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className={styles.successIcon}>✓</div>
            <h2>Request Submitted!</h2>
            <p>We've received your request. Our team will contact you within 24 hours to match you with the perfect tutor.</p>
            <button className={styles.submitBtn} onClick={() => setSuccess(false)}>Submit Another Request</button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        {/* Left — info */}
        <motion.div className={styles.left}
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <span className={styles.badge}><Sparkles size={14} /> Find Your Perfect Tutor</span>
          <h1 className={styles.heading}>Get a Home Tutor<br /><span className={styles.green}>Near You</span></h1>
          <p className={styles.subtext}>Fill in your details and we'll connect you with a verified, experienced tutor in your area within 24 hours.</p>

          <div className={styles.features}>
            {[
              { icon: '✓', text: 'Verified & background-checked tutors' },
              { icon: '✓', text: 'Personalized 1-on-1 sessions at home' },
              { icon: '✓', text: 'Free demo class before you commit' },
              { icon: '✓', text: 'Flexible timings to suit your schedule' },
            ].map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <span className={styles.featureTick}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <div className={styles.locationTags}>
            {AREAS.map(a => (
              <span key={a} className={styles.locTag}><MapPin size={12} />{a}</span>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div className={styles.right}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Request a Tutor</h2>
            <p className={styles.formSubtitle}>Free consultation · No commitment</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Name */}
              <div className={styles.field}>
                <label><User size={14} /> Student Name *</label>
                <input type="text" placeholder="Enter student's full name"
                  value={form.name} onChange={e => set('name', e.target.value)} required />
              </div>

              {/* Phone */}
              <div className={styles.field}>
                <label><Phone size={14} /> Mobile Number *</label>
                <input type="tel" placeholder="10-digit mobile number"
                  value={form.phone} maxLength={10}
                  onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} required />
              </div>

              {/* Class + Subject */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label><BookOpen size={14} /> Class *</label>
                  <select value={form.studentClass} onChange={e => set('studentClass', e.target.value)} required>
                    <option value="">Select class</option>
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label><BookOpen size={14} /> Subject *</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)} required>
                    <option value="">Select subject</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* City + Area */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label><MapPin size={14} /> City *</label>
                  <input type="text" placeholder="e.g. New Delhi"
                    value={form.city} onChange={e => set('city', e.target.value)} required />
                </div>
                <div className={styles.field}>
                  <label><MapPin size={14} /> Area *</label>
                  <select value={form.area} onChange={e => set('area', e.target.value)} required>
                    <option value="">Select area</option>
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label><MessageSquare size={14} /> Additional Requirements</label>
                <textarea placeholder="Any specific requirements, preferred timing, etc."
                  rows={3} value={form.message} onChange={e => set('message', e.target.value)} />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <motion.button type="submit" className={styles.submitBtn}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}>
                {loading ? 'Submitting...' : 'Find My Tutor →'}
              </motion.button>

              <p className={styles.note}>We'll call you within 24 hours · 100% Free</p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
