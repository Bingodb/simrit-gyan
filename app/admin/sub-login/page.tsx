'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'
import { Users } from 'lucide-react'

export default function SubAdminLogin() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/sub-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    })
    setLoading(false)
    if (res.ok) router.push('/admin/sub-dashboard')
    else setError('Invalid phone number or password.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <button className={styles.backBtn} onClick={() => router.push('/admin')}>← Back</button>
        <div className={styles.logo} style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)' }}>
          <Users size={28} />
        </div>
        <h1 className={styles.title}>Sub Admin Login</h1>
        <p className={styles.subtitle}>Use your phone number as ID</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="phone">Phone Number (ID)</label>
            <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="10-digit phone number" required maxLength={10} />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter password" required autoComplete="current-password" />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn}
            style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In as Sub Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}
