'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'
import { ShieldCheck } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    })
    setLoading(false)
    if (res.ok) router.push('/admin/dashboard')
    else setError('Invalid credentials. Please try again.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <button className={styles.backBtn} onClick={() => router.push('/admin')}>← Back</button>
        <div className={styles.logo}><ShieldCheck size={28} /></div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>Full access · All locations</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="id">Admin ID</label>
            <input id="id" type="text" value={id} onChange={e => setId(e.target.value)}
              placeholder="Enter admin ID" required autoComplete="username" />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter password" required autoComplete="current-password" />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In as Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}
