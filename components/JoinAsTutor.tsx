'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './JoinAsTutor.module.css'

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
  'History', 'Geography', 'Political Science', 'Economics', 'Accountancy',
  'Business Studies', 'Computer Science', 'General Knowledge', 'Social Studies',
  'Sanskrit', 'Others', 'All Subjects'
]

const timeSlots = [
  'Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)',
  'Evening (6 PM - 10 PM)', 'Weekends Only'
]

export default function JoinAsTutor() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [agreed, setAgreed] = useState(false)

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    )
  }

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for applying! We will review your application within 24-48 hours.')
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.heroTitle}>Ready to Join Our Team?</h1>
          <p className={styles.heroSubtitle}>Fill out the application form below and we'll get back to you within 24 hours</p>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Personal Information */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className={styles.field}>
                <label>Email Address *</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
            </div>
            <div className={styles.field}>
              <label>Phone Number *</label>
              <input type="tel" placeholder="Enter your phone number" required />
            </div>
            <div className={styles.field}>
              <label>Address *</label>
              <textarea placeholder="Enter your complete address" rows={3} required></textarea>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Educational Background */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Educational Background</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Highest Qualification *</label>
                <select required>
                  <option value="">Select your highest qualification</option>
                  <option>12th Pass</option>
                  <option>Diploma</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>B.Ed</option>
                  <option>M.Ed</option>
                  <option>PhD</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Field of Study *</label>
                <input type="text" placeholder="e.g., Mathematics, Physics, English, etc." required />
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Teaching Experience */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Teaching Experience</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Years of Teaching Experience *</label>
                <select required>
                  <option value="">Select experience</option>
                  <option>Fresher (0 years)</option>
                  <option>Less than 1 year</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Preferred Classes to Teach *</label>
                <select required>
                  <option value="">Select preferred classes</option>
                  <option>Class 1-5 (Primary)</option>
                  <option>Class 6-8 (Middle)</option>
                  <option>Class 9-10 (Secondary)</option>
                  <option>Class 11-12 (Senior Secondary)</option>
                  <option>Competitive Exams (JEE/NEET)</option>
                  <option>All Classes</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>Subject Expertise *</label>
              <div className={styles.checkboxGrid}>
                {subjects.map(subject => (
                  <label key={subject} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject)}
                      onChange={() => toggleSubject(subject)}
                    />
                    <span>{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Previous Teaching Experience</label>
              <textarea
                placeholder="Describe your previous teaching experience, achievements, and specializations"
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Availability & Preferences */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Availability & Preferences</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Preferred Teaching Mode *</label>
                <select required>
                  <option value="">Select teaching mode</option>
                  <option>Home Tuition (At Student's Home)</option>
                  <option>Online Teaching</option>
                  <option>Both</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Available Hours per Week *</label>
                <select required>
                  <option value="">Select hours</option>
                  <option>Less than 10 hours</option>
                  <option>10-20 hours</option>
                  <option>20-30 hours</option>
                  <option>30-40 hours</option>
                  <option>Full Time (40+ hours)</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>Preferred Time Slots</label>
              <div className={styles.checkboxRow}>
                {timeSlots.map(slot => (
                  <label key={slot} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedSlots.includes(slot)}
                      onChange={() => toggleSlot(slot)}
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Additional Information */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Additional Information</h2>
            <div className={styles.field}>
              <label>Why do you want to join Simrit Gyan? *</label>
              <textarea
                placeholder="Tell us about your motivation and teaching philosophy"
                rows={4}
                required
              ></textarea>
            </div>
            <div className={styles.field}>
              <label>Expected Hourly Rate (₹)</label>
              <input type="number" placeholder="Enter expected hourly rate in ₹" min="0" />
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Documents */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Documents</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Resume/CV Upload *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="resume" accept=".jpg,.png,.pdf" multiple required />
                  <label htmlFor="resume" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose Files</span>
                    <span className={styles.fileName}>No file chosen</span>
                  </label>
                </div>
                <p className={styles.fileHint}>Upload multiple images (JPG, PNG) - Max 1MB per file</p>
              </div>
              <div className={styles.field}>
                <label>Educational Certificates *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="certificates" accept=".jpg,.png,.pdf" multiple required />
                  <label htmlFor="certificates" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose Files</span>
                    <span className={styles.fileName}>No file chosen</span>
                  </label>
                </div>
                <p className={styles.fileHint}>Upload multiple images (JPG, PNG) - Max 1MB per file</p>
              </div>
              <div className={styles.field}>
                <label>Profile Photo *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="photo" accept=".jpg,.png" required />
                  <label htmlFor="photo" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose File</span>
                    <span className={styles.fileName}>No file chosen</span>
                  </label>
                </div>
                <p className={styles.fileHint}>Upload a professional photo (JPG, PNG) - Max 1MB</p>
              </div>
              <div className={styles.field}>
                <label>ID Proof *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="idproof" accept=".jpg,.png" required />
                  <label htmlFor="idproof" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose File</span>
                    <span className={styles.fileName}>No file chosen</span>
                  </label>
                </div>
                <p className={styles.fileHint}>Aadhar Card, PAN Card, or Driving License (JPG, PNG) - Max 1MB</p>
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Agreement */}
          <div className={styles.agreement}>
            <label className={styles.agreeLabel}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                required
              />
              <span>
                I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a> of Simrit Gyan Pvt Ltd. I confirm that all information provided is accurate and complete. *
              </span>
            </label>
          </div>

          <div className={styles.submitWrapper}>
            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
            <p className={styles.submitNote}>* Required fields. Your application will be reviewed within 24-48 hours.</p>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
