'use client'

import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for contacting Simrit Gyan! We will get back to you within 24 hours to schedule your free demo class.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>Get in Touch</h2>
        <p className={styles.subtitle}>Book a free demo class for your child today</p>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3>📍 Head Office</h3>
              <p>D-9, Nanhey Park, Uttam Nagar<br />New Delhi – 110059</p>
            </div>
            <div className={styles.infoCard}>
              <h3>📞 Phone</h3>
              <p>+91 98765 43210</p>
            </div>
            <div className={styles.infoCard}>
              <h3>✉️ Email</h3>
              <p>info@simritgyan.com</p>
            </div>
            <div className={styles.infoCard}>
              <h3>🕒 Working Hours</h3>
              <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Parent Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade/Class</option>
              <option value="primary">Primary (Class 1-5)</option>
              <option value="secondary">Secondary (Class 6-10)</option>
              <option value="senior">Senior Secondary (Class 11-12)</option>
              <option value="competitive">Competitive Exams (JEE/NEET)</option>
              <option value="other">Other</option>
            </select>
            <textarea
              name="message"
              placeholder="Subject Requirements & Preferred Timing"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              Book Free Demo Class
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
