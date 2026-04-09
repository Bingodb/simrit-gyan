'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './JoinAsTutor.module.css'

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
  'History', 'Geography', 'Political Science', 'Economics', 'Accountancy',
  'Business Studies', 'Computer Science', 'General Knowledge', 'Social Studies',
  'Sanskrit', 'Others', 'All Subjects'
]

const TIME_SLOTS = [
  'Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)',
  'Evening (6 PM - 10 PM)', 'Weekends Only'
]

const LOCATIONS = ['Hauz Khas', 'Gurgaon', 'Connaught Place', 'Uttam Nagar']

const INIT = {
  fullName: '', email: '', phone: '', address: '', location: '',
  qualification: '', fieldOfStudy: '',
  experience: '', preferredClass: '', prevExperience: '',
  teachingMode: '', hoursPerWeek: '',
  motivation: '', hourlyRate: '',
}

export default function JoinAsTutor() {
  const [form, setForm] = useState(INIT)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // File state — track selected files so names display correctly
  const [files, setFiles] = useState<{
    resume: FileList | null
    certificates: FileList | null
    photo: File | null
    idproof: File | null
  }>({ resume: null, certificates: null, photo: null, idproof: null })

  const fileLabel = (f: FileList | File | null) => {
    if (!f) return 'No file chosen'
    if (f instanceof FileList) return f.length > 1 ? `${f.length} files selected` : f[0]?.name || 'No file chosen'
    return f.name
  }

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  // Compress an image file to a small JPEG data URL (max ~300KB)
  const compressImage = (file: File): Promise<Blob> =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new window.Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let { width, height } = img
          const MAX = 900
          if (width > MAX || height > MAX) {
            if (width > height) { height = Math.round(height * MAX / width); width = MAX }
            else { width = Math.round(width * MAX / height); height = MAX }
          }
          canvas.width = width; canvas.height = height
          canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
          canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.65)
        }
        img.src = e.target!.result as string
      }
      reader.readAsDataURL(file)
    })

  const prepareFile = async (file: File): Promise<Blob> => {
    if (file.type.startsWith('image/')) return compressImage(file)
    return file
  }

  const toggleSubject = (s: string) =>
    setSelectedSubjects(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])

  const toggleSlot = (s: string) =>
    setSelectedSlots(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the terms and conditions.'); return }
    if (selectedSubjects.length === 0) { setError('Please select at least one subject.'); return }
    if (!files.resume) { setError('Please upload your Resume/CV.'); return }
    if (!files.certificates) { setError('Please upload your Educational Certificates.'); return }
    if (!files.photo) { setError('Please upload your Profile Photo.'); return }
    if (!files.idproof) { setError('Please upload your ID Proof.'); return }

    setError(''); setLoading(true)

    // Compress images client-side before sending to stay within MongoDB 16MB doc limit
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    fd.append('subjects', JSON.stringify(selectedSubjects))
    fd.append('timeSlots', JSON.stringify(selectedSlots))
    for (const f of Array.from(files.resume!)) fd.append('resume', await prepareFile(f), f.name)
    for (const f of Array.from(files.certificates!)) fd.append('certificates', await prepareFile(f), f.name)
    fd.append('photo', await prepareFile(files.photo!), files.photo!.name)
    fd.append('idproof', await prepareFile(files.idproof!), files.idproof!.name)

    const res = await fetch('/api/tutor-application', { method: 'POST', body: fd })
    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      setForm(INIT)
      setSelectedSubjects([]); setSelectedSlots([]); setAgreed(false)
      setFiles({ resume: null, certificates: null, photo: null, idproof: null })
    } else {
      const d = await res.json()
      setError(d.error || 'Submission failed. Please try again.')
    }
  }

  if (success) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div className={styles.successBox} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className={styles.successIcon}>✓</div>
            <h2>Application Submitted!</h2>
            <p>Thank you for applying to Simrit Gyan. Our team will review your application and get back to you within 24–48 hours.</p>
            <button className={styles.submitBtn} onClick={() => setSuccess(false)}>Submit Another</button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.hero} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className={styles.heroTitle}>Ready to Join Our Team?</h1>
          <p className={styles.heroSubtitle}>Fill out the application form below and we'll get back to you within 24 hours</p>
        </motion.div>

        <motion.form className={styles.form} onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>

          {/* Personal Information */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input type="text" placeholder="Enter your full name" value={form.fullName}
                  onChange={e => set('fullName', e.target.value)} required />
              </div>
              <div className={styles.field}>
                <label>Email Address *</label>
                <input type="email" placeholder="Enter your email" value={form.email}
                  onChange={e => set('email', e.target.value)} required />
              </div>
            </div>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Phone Number *</label>
                <input type="tel" placeholder="10-digit phone number" value={form.phone} maxLength={10}
                  onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} required />
              </div>
              <div className={styles.field}>
                <label>Preferred Location *</label>
                <select value={form.location} onChange={e => set('location', e.target.value)} required>
                  <option value="">Select your area</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Address *</label>
              <textarea placeholder="Enter your complete address" rows={3} value={form.address}
                onChange={e => set('address', e.target.value)} required />
            </div>
          </div>

          <div className={styles.divider} />

          {/* Educational Background */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Educational Background</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Highest Qualification *</label>
                <select value={form.qualification} onChange={e => set('qualification', e.target.value)} required>
                  <option value="">Select qualification</option>
                  {["12th Pass","Diploma","Bachelor's Degree","Master's Degree","B.Ed","M.Ed","PhD"].map(q =>
                    <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>Field of Study *</label>
                <input type="text" placeholder="e.g., Mathematics, Physics, English" value={form.fieldOfStudy}
                  onChange={e => set('fieldOfStudy', e.target.value)} required />
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Teaching Experience */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Teaching Experience</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Years of Experience *</label>
                <select value={form.experience} onChange={e => set('experience', e.target.value)} required>
                  <option value="">Select experience</option>
                  {["Fresher (0 years)","Less than 1 year","1-2 years","3-5 years","5-10 years","10+ years"].map(x =>
                    <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>Preferred Classes *</label>
                <select value={form.preferredClass} onChange={e => set('preferredClass', e.target.value)} required>
                  <option value="">Select classes</option>
                  {["Class 1-5 (Primary)","Class 6-8 (Middle)","Class 9-10 (Secondary)","Class 11-12 (Senior Secondary)","Competitive Exams (JEE/NEET)","All Classes"].map(c =>
                    <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Subject Expertise *</label>
              <div className={styles.checkboxGrid}>
                {SUBJECTS.map(s => (
                  <label key={s} className={styles.checkboxLabel}>
                    <input type="checkbox" checked={selectedSubjects.includes(s)} onChange={() => toggleSubject(s)} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <label>Previous Teaching Experience</label>
              <textarea placeholder="Describe your previous experience, achievements and specializations"
                rows={4} value={form.prevExperience} onChange={e => set('prevExperience', e.target.value)} />
            </div>
          </div>

          <div className={styles.divider} />

          {/* Availability */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Availability & Preferences</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Teaching Mode *</label>
                <select value={form.teachingMode} onChange={e => set('teachingMode', e.target.value)} required>
                  <option value="">Select mode</option>
                  {["Home Tuition (At Student's Home)","Online Teaching","Both"].map(m =>
                    <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>Available Hours per Week *</label>
                <select value={form.hoursPerWeek} onChange={e => set('hoursPerWeek', e.target.value)} required>
                  <option value="">Select hours</option>
                  {["Less than 10 hours","10-20 hours","20-30 hours","30-40 hours","Full Time (40+ hours)"].map(h =>
                    <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label>Preferred Time Slots</label>
              <div className={styles.checkboxRow}>
                {TIME_SLOTS.map(slot => (
                  <label key={slot} className={styles.checkboxLabel}>
                    <input type="checkbox" checked={selectedSlots.includes(slot)} onChange={() => toggleSlot(slot)} />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Additional */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Additional Information</h2>
            <div className={styles.field}>
              <label>Why do you want to join Simrit Gyan? *</label>
              <textarea placeholder="Tell us about your motivation and teaching philosophy"
                rows={4} value={form.motivation} onChange={e => set('motivation', e.target.value)} required />
            </div>
            <div className={styles.field}>
              <label>Expected Hourly Rate (₹)</label>
              <input type="number" placeholder="Enter expected hourly rate in ₹" min="0"
                value={form.hourlyRate} onChange={e => set('hourlyRate', e.target.value)} />
            </div>
          </div>

          <div className={styles.divider} />

          {/* Documents */}
          <div className={styles.section_block}>
            <h2 className={styles.sectionTitle}>Documents</h2>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label>Resume/CV Upload *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="resume" accept=".jpg,.png,.pdf" multiple
                    onChange={e => setFiles(f => ({ ...f, resume: e.target.files }))} />
                  <label htmlFor="resume" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose Files</span>
                    <span className={styles.fileName}>{fileLabel(files.resume)}</span>
                  </label>
                </div>
                <p className={styles.fileHint}>JPG, PNG or PDF — Max 1MB per file</p>
              </div>
              <div className={styles.field}>
                <label>Educational Certificates *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="certificates" accept=".jpg,.png,.pdf" multiple
                    onChange={e => setFiles(f => ({ ...f, certificates: e.target.files }))} />
                  <label htmlFor="certificates" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose Files</span>
                    <span className={styles.fileName}>{fileLabel(files.certificates)}</span>
                  </label>
                </div>
                <p className={styles.fileHint}>JPG, PNG or PDF — Max 1MB per file</p>
              </div>
              <div className={styles.field}>
                <label>Profile Photo *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="photo" accept=".jpg,.png"
                    onChange={e => setFiles(f => ({ ...f, photo: e.target.files?.[0] ?? null }))} />
                  <label htmlFor="photo" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose File</span>
                    <span className={styles.fileName}>{fileLabel(files.photo)}</span>
                  </label>
                </div>
                <p className={styles.fileHint}>Professional photo (JPG, PNG) — Max 1MB</p>
              </div>
              <div className={styles.field}>
                <label>ID Proof *</label>
                <div className={styles.fileInput}>
                  <input type="file" id="idproof" accept=".jpg,.png"
                    onChange={e => setFiles(f => ({ ...f, idproof: e.target.files?.[0] ?? null }))} />
                  <label htmlFor="idproof" className={styles.fileLabel}>
                    <span className={styles.fileBtn}>Choose File</span>
                    <span className={styles.fileName}>{fileLabel(files.idproof)}</span>
                  </label>
                </div>
                <p className={styles.fileHint}>Aadhar, PAN or Driving License (JPG, PNG) — Max 1MB</p>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Agreement */}
          <div className={styles.agreement}>
            <label className={styles.agreeLabel}>
              <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} required />
              <span>
                I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a> of Simrit Gyan Pvt Ltd.
                I confirm that all information provided is accurate and complete. *
              </span>
            </label>
          </div>

          {error && <p style={{ color: '#f5576c', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

          <div className={styles.submitWrapper}>
            <motion.button type="submit" className={styles.submitBtn}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={loading}>
              {loading ? 'Submitting...' : 'Apply Now'}
            </motion.button>
            <p className={styles.submitNote}>* Required fields. Your application will be reviewed within 24–48 hours.</p>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
