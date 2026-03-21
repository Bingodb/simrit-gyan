'use client'
import { useRouter } from 'next/navigation'
import styles from './admin.module.css'
import { ShieldCheck, Users } from 'lucide-react'

export default function AdminLanding() {
  const router = useRouter()
  return (
    <div className={styles.page}>
      <div className={styles.landingCard}>
        <div className={styles.logo}>SG</div>
        <h1 className={styles.title}>Simrit Gyan</h1>
        <p className={styles.subtitle}>Management Portal — Choose your login</p>

        <div className={styles.roleGrid}>
          <button className={styles.roleBtn} onClick={() => router.push('/admin/login')}>
            <div className={styles.roleIcon} style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)' }}>
              <ShieldCheck size={28} />
            </div>
            <span className={styles.roleLabel}>Admin Login</span>
            <span className={styles.roleDesc}>Full access · All locations</span>
          </button>

          <button className={styles.roleBtn} onClick={() => router.push('/admin/sub-login')}>
            <div className={styles.roleIcon} style={{ background: 'linear-gradient(135deg,#f093fb,#f5576c)' }}>
              <Users size={28} />
            </div>
            <span className={styles.roleLabel}>Sub Admin Login</span>
            <span className={styles.roleDesc}>Location access · Phone ID</span>
          </button>
        </div>
      </div>
    </div>
  )
}
