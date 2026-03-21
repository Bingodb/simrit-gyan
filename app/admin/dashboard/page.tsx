'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import { Users, GraduationCap, MapPin, TrendingUp, LogOut, Plus, Trash2, Eye, EyeOff, Phone } from 'lucide-react'

type SubAdmin = { phone: string; password: string; location: string; name: string; createdAt: string }

const LOCATIONS = ['Hauz Khas', 'Gurgaon', 'Connaught Place', 'Uttam Nagar']

const stats = [
  { label: 'Total Students', value: '5,000+', icon: Users, color: '#667eea' },
  { label: 'Active Tutors', value: '200+', icon: GraduationCap, color: '#f093fb' },
  { label: 'Cities Covered', value: '10+', icon: MapPin, color: '#43e97b' },
  { label: 'Success Rate', value: '95%', icon: TrendingUp, color: '#f7971e' },
]

const LOC_COLORS: Record<string, string> = {
  'Hauz Khas': '#667eea',
  'Gurgaon': '#43e97b',
  'Connaught Place': '#f7971e',
  'Uttam Nagar': '#f093fb',
}

export default function Dashboard() {
  const router = useRouter()
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'subadmins'>('overview')
  const [showForm, setShowForm] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ phone: '', password: '', location: LOCATIONS[0], name: '' })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchSubAdmins = async () => {
    const res = await fetch('/api/admin/subadmins')
    if (res.ok) setSubAdmins(await res.json())
  }

  useEffect(() => { fetchSubAdmins() }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setLoading(true)
    const res = await fetch('/api/admin/subadmins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      setFormSuccess('Sub admin created successfully!')
      setForm({ phone: '', password: '', location: LOCATIONS[0], name: '' })
      setShowForm(false)
      fetchSubAdmins()
    } else {
      const d = await res.json()
      setFormError(d.error || 'Failed to create sub admin')
    }
  }

  const handleDelete = async (phone: string) => {
    if (!confirm('Delete this sub admin?')) return
    await fetch('/api/admin/subadmins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })
    fetchSubAdmins()
  }

  // Group sub-admins by location
  const byLocation = LOCATIONS.map(loc => ({
    location: loc,
    admins: subAdmins.filter(s => s.location === loc),
    color: LOC_COLORS[loc] || '#667eea',
  }))

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoBox}>SG</div>
          <span>Simrit Gyan</span>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}>
            <TrendingUp size={18} /> Overview
          </button>
          <button className={`${styles.navItem} ${activeTab === 'subadmins' ? styles.active : ''}`}
            onClick={() => setActiveTab('subadmins')}>
            <Users size={18} /> Sub Admins
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeTab === 'overview' ? 'Dashboard' : 'Sub Admin Management'}
            </h1>
            <p className={styles.pageSubtitle}>Welcome back, Super Admin</p>
          </div>
          <div className={styles.topbarRight}>
            <button className={styles.tabBtnMobile}
              onClick={() => setActiveTab(activeTab === 'overview' ? 'subadmins' : 'overview')}>
              {activeTab === 'overview' ? <Users size={18} /> : <TrendingUp size={18} />}
            </button>
            <button className={styles.logoutMobile} onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <>
            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: s.color + '22', color: s.color }}>
                    <s.icon size={22} />
                  </div>
                  <div>
                    <p className={styles.statValue}>{s.value}</p>
                    <p className={styles.statLabel}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Location summary */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Locations Overview</h2>
              <div className={styles.locGrid}>
                {byLocation.map(({ location, admins, color }) => (
                  <div key={location} className={styles.locCard} style={{ borderColor: color + '33' }}>
                    <div className={styles.locDot} style={{ background: color }} />
                    <div>
                      <p className={styles.locName}>{location}</p>
                      <p className={styles.locCount}>{admins.length} sub admin{admins.length !== 1 ? 's' : ''}</p>
                    </div>
                    <span className={styles.locBadge} style={{ background: color + '22', color }}>
                      {admins.length > 0 ? 'Active' : 'No Admin'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ── SUB ADMINS TAB ── */}
        {activeTab === 'subadmins' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>All Sub Admins</h2>
              <button className={styles.addBtn} onClick={() => { setShowForm(!showForm); setFormError(''); setFormSuccess('') }}>
                <Plus size={16} /> {showForm ? 'Cancel' : 'Add Sub Admin'}
              </button>
            </div>

            {/* Create form */}
            {showForm && (
              <form onSubmit={handleCreate} className={styles.createForm}>
                <h3 className={styles.formTitle}>Create New Sub Admin</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Rahul Sharma" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className={styles.formField}>
                    <label>Phone Number (Login ID)</label>
                    <div className={styles.phoneInput}>
                      <Phone size={16} className={styles.phoneIcon} />
                      <input type="tel" placeholder="10-digit number" value={form.phone} maxLength={10}
                        onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })} required />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Password</label>
                    <div className={styles.pwdInput}>
                      <input type={showPwd ? 'text' : 'password'} placeholder="Set a password"
                        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                      <button type="button" onClick={() => setShowPwd(!showPwd)}>
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Location</label>
                    <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                {formError && <p className={styles.formError}>{formError}</p>}
                {formSuccess && <p className={styles.formSuccess}>{formSuccess}</p>}
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Sub Admin'}
                </button>
              </form>
            )}

            {formSuccess && !showForm && <p className={styles.formSuccess}>{formSuccess}</p>}

            {/* Sub-admins grouped by location */}
            {byLocation.map(({ location, admins, color }) => (
              <div key={location} className={styles.locationGroup}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupDot} style={{ background: color }} />
                  <h3 className={styles.groupTitle}>{location}</h3>
                  <span className={styles.groupCount}>{admins.length}</span>
                </div>

                {admins.length === 0 ? (
                  <p className={styles.emptyMsg}>No sub admins for this location yet.</p>
                ) : (
                  <div className={styles.adminCards}>
                    {admins.map(sa => (
                      <div key={sa.phone} className={styles.adminCard} style={{ borderLeftColor: color }}>
                        <div className={styles.adminAvatar} style={{ background: color + '22', color }}>
                          {sa.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.adminInfo}>
                          <p className={styles.adminName}>{sa.name}</p>
                          <p className={styles.adminPhone}><Phone size={12} /> {sa.phone}</p>
                          <p className={styles.adminDate}>Created: {sa.createdAt}</p>
                        </div>
                        <div className={styles.adminMeta}>
                          <span className={styles.adminLoc} style={{ background: color + '22', color }}>{sa.location}</span>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(sa.phone)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
