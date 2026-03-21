'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './teacher-dashboard.module.css'
import { MapPin, LogOut, Phone, User, BookOpen, Search, Filter } from 'lucide-react'

type SessionInfo = { phone: string; name: string; location: string; subject: string }
type Lead = {
  _id?: string; id?: string; studentName: string; parentPhone: string; class: string
  subject: string; address: string; location: string; status: string
  createdAt: string; note: string
}

const STATUS_COLORS: Record<string, string> = {
  new: '#667eea',
  contacted: '#f7971e',
  assigned: '#43e97b',
  closed: '#f5576c',
}

const LOC_COLORS: Record<string, string> = {
  'Hauz Khas': '#667eea',
  'Gurgaon': '#43e97b',
  'Connaught Place': '#f7971e',
  'Uttam Nagar': '#f093fb',
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [info, setInfo] = useState<SessionInfo | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetch('/api/teacher/session').then(r => r.json()).then(d => { if (d.phone) setInfo(d) })
    fetch('/api/teacher/leads').then(r => r.json()).then(d => { if (Array.isArray(d)) setLeads(d) })
  }, [])

  const handleLogout = async () => {
    await fetch('/api/teacher/logout', { method: 'POST' })
    router.push('/teacher/login')
  }

  const color = info ? (LOC_COLORS[info.location] || '#43e97b') : '#43e97b'

  const filtered = leads.filter(l => {
    const matchSearch = l.studentName.toLowerCase().includes(search.toLowerCase()) ||
      l.parentPhone.includes(search) || l.subject.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoBox} style={{ background: color }}>SG</div>
          <span>Simrit Gyan</span>
        </div>
        <nav className={styles.sidebarNav}>
          <div className={`${styles.navItem} ${styles.active}`} style={{ background: color + '18', color }}>
            <BookOpen size={18} /> Student Leads
          </div>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Student Leads</h1>
            <p className={styles.pageSubtitle}>{info ? `${info.name} · ${info.location}` : 'Loading...'}</p>
          </div>
          <button className={styles.logoutMobile} onClick={handleLogout}><LogOut size={18} /></button>
        </header>

        {info && (
          <>
            {/* Profile strip */}
            <div className={styles.profileStrip} style={{ borderColor: color + '44', background: color + '0d' }}>
              <div className={styles.stripAvatar} style={{ background: color + '22', color }}>
                {info.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.stripInfo}>
                <span className={styles.stripName}>{info.name}</span>
                <span className={styles.stripMeta}><Phone size={12} />{info.phone} &nbsp;·&nbsp; <MapPin size={12} />{info.location} &nbsp;·&nbsp; {info.subject}</span>
              </div>
              <div className={styles.stripStats}>
                <div className={styles.stripStat}>
                  <span className={styles.stripStatVal}>{leads.length}</span>
                  <span className={styles.stripStatLabel}>Total Leads</span>
                </div>
                <div className={styles.stripStat}>
                  <span className={styles.stripStatVal} style={{ color: STATUS_COLORS.new }}>
                    {leads.filter(l => l.status === 'new').length}
                  </span>
                  <span className={styles.stripStatLabel}>New</span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input placeholder="Search by name, phone, subject…" value={search}
                  onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
              </div>
              <div className={styles.filterGroup}>
                <Filter size={15} />
                {['all', 'new', 'contacted', 'assigned', 'closed'].map(s => (
                  <button key={s} className={`${styles.filterBtn} ${filterStatus === s ? styles.filterActive : ''}`}
                    style={filterStatus === s ? { background: (STATUS_COLORS[s] || color) + '22', color: STATUS_COLORS[s] || color, borderColor: STATUS_COLORS[s] || color } : {}}
                    onClick={() => setFilterStatus(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads */}
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <User size={40} />
                <p>{leads.length === 0 ? 'No leads assigned to your location yet.' : 'No leads match your search.'}</p>
              </div>
            ) : (
              <div className={styles.leadsGrid}>
                {filtered.map(lead => (
                  <div key={lead._id || lead.id} className={styles.leadCard} style={{ borderLeftColor: STATUS_COLORS[lead.status] || color }}>
                    <div className={styles.leadTop}>
                      <div className={styles.leadAvatar} style={{ background: color + '22', color }}>
                        {lead.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.leadInfo}>
                        <p className={styles.leadName}>{lead.studentName}</p>
                        <p className={styles.leadClass}>Class {lead.class} · {lead.subject}</p>
                      </div>
                      <span className={styles.statusBadge}
                        style={{ background: (STATUS_COLORS[lead.status] || '#667eea') + '22', color: STATUS_COLORS[lead.status] || '#667eea' }}>
                        {lead.status}
                      </span>
                    </div>

                    <div className={styles.leadDetails}>
                      <div className={styles.detailRow}>
                        <Phone size={13} />
                        <span>{lead.parentPhone}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <MapPin size={13} />
                        <span>{lead.address}</span>
                      </div>
                      {lead.note && (
                        <div className={styles.leadNote}>{lead.note}</div>
                      )}
                    </div>

                    <div className={styles.leadFooter}>
                      <span className={styles.leadDate}>Added: {lead.createdAt}</span>
                      <span className={styles.leadLoc} style={{ background: color + '18', color }}>{lead.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
