'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './teacher-login.module.css'
import { GraduationCap } from 'lucide-react'

export default function TeacherLogin() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/teacher/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    })
    setLoading(false)
    if (res.ok) router.push('/teacher/dashboard')
    else setError('Invalid phone number or password.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <a href="/" className={styles.backBtn}>← Back to site</a>

        <div className={styles.iconBox}>
          <GraduationCap size={30} />
        </div>
        <h1 className={styles.title}>Teacher Login</h1>
        <p className={styles.subtitle}>Access your student leads</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="phone">Phone Number (ID)</label>
            <input id="phone" type="tel" value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="10-digit phone number" maxLength={10} required />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password" required autoComplete="current-password" />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
