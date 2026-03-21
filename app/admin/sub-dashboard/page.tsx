'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './sub-dashboard.module.css'
import { MapPin, LogOut, Phone, Users, BookOpen, Plus, Trash2, Eye, EyeOff, User, FileText } from 'lucide-react'

type SessionInfo = { phone: string; location: string; name: string }
type Teacher = { phone: string; name: string; subject: string; location: string; createdAt: string }
type Lead = {
  _id?: string; id?: string; studentName: string; parentPhone: string; class: string
  subject: string; address: string; status: string; createdAt: string; note: string
}

const LOC_COLORS: Record<string, string> = {
  'Hauz Khas': '#667eea', 'Gurgaon': '#43e97b',
  'Connaught Place': '#f7971e', 'Uttam Nagar': '#f093fb',
}

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Hindi', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'All Subjects']
const CLASSES = ['1','2','3','4','5','6','7','8','9','10','11','12']

export default function SubDashboard() {
  const router = useRouter()
  const [info, setInfo] = useState<SessionInfo | null>(null)
  const [tab, setTab] = useState<'teachers' | 'leads'>('leads')

  // Teachers state
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [tForm, setTForm] = useState({ phone: '', password: '', name: '', subject: SUBJECTS[0] })
  const [tError, setTError] = useState('')
  const [tSuccess, setTSuccess] = useState('')
  const [tLoading, setTLoading] = useState(false)

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([])
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [lForm, setLForm] = useState({ studentName: '', parentPhone: '', studentClass: '1', subject: SUBJECTS[0], address: '', note: '' })
  const [lError, setLError] = useState('')
  const [lSuccess, setLSuccess] = useState('')
  const [lLoading, setLLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/sub-session').then(r => r.json()).then(d => { if (d.phone) setInfo(d) })
    fetchTeachers()
    fetchLeads()
  }, [])

  const fetchTeachers = () => fetch('/api/subadmin/teachers').then(r => r.json()).then(d => { if (Array.isArray(d)) setTeachers(d) })
  const fetchLeads = () => fetch('/api/subadmin/leads').then(r => r.json()).then(d => { if (Array.isArray(d)) setLeads(d) })

  const handleLogout = async () => {
    await fetch('/api/admin/sub-logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault()
    setTError(''); setTSuccess(''); setTLoading(true)
    const res = await fetch('/api/subadmin/teachers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tForm),
    })
    setTLoading(false)
    if (res.ok) {
      setTSuccess('Teacher created!'); setTForm({ phone: '', password: '', name: '', subject: SUBJECTS[0] })
      setShowTeacherForm(false); fetchTeachers()
    } else { const d = await res.json(); setTError(d.error || 'Failed') }
  }

  const handleDeleteTeacher = async (phone: string) => {
    if (!confirm('Delete this teacher?')) return
    await fetch('/api/subadmin/teachers', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
    fetchTeachers()
  }

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setLError(''); setLSuccess(''); setLLoading(true)
    const res = await fetch('/api/subadmin/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lForm),
    })
    setLLoading(false)
    if (res.ok) {
      setLSuccess('Lead added!'); setLForm({ studentName: '', parentPhone: '', studentClass: '1', subject: SUBJECTS[0], address: '', note: '' })
      setShowLeadForm(false); fetchLeads()
    } else { const d = await res.json(); setLError(d.error || 'Failed') }
  }

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    await fetch('/api/subadmin/leads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchLeads()
  }

  // MongoDB returns _id, map it to id for consistency
  const mappedLeads = leads.map((l: Lead & { _id?: string }) => ({ ...l, id: l._id || l.id }))

  const color = info ? (LOC_COLORS[info.location] || '#667eea') : '#667eea'

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoBox} style={{ background: color }}>SG</div>
          <span>Simrit Gyan</span>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${tab === 'leads' ? styles.active : ''}`}
            style={tab === 'leads' ? { background: color + '18', color } : {}}
            onClick={() => setTab('leads')}>
            <FileText size={18} /> Student Leads
          </button>
          <button className={`${styles.navItem} ${tab === 'teachers' ? styles.active : ''}`}
            style={tab === 'teachers' ? { background: color + '18', color } : {}}
            onClick={() => setTab('teachers')}>
            <Users size={18} /> Teachers
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={18} /> Logout</button>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>{tab === 'leads' ? 'Student Leads' : 'Teachers'}</h1>
            <p className={styles.pageSubtitle}>{info ? `${info.name} · ${info.location}` : 'Loading...'}</p>
          </div>
          <div className={styles.topbarRight}>
            <button className={styles.tabBtnMobile}
              onClick={() => setTab(tab === 'leads' ? 'teachers' : 'leads')}
              style={{ background: color + '18', borderColor: color + '44', color }}>
              {tab === 'leads' ? <Users size={18} /> : <FileText size={18} />}
            </button>
            <button className={styles.logoutMobile} onClick={handleLogout}><LogOut size={18} /></button>
          </div>
        </header>

        {info && (
          <>
            {/* Location banner */}
            <div className={styles.locationBanner} style={{ borderColor: color + '44', background: color + '0d' }}>
              <div className={styles.bannerIcon} style={{ background: color + '22', color }}><MapPin size={22} /></div>
              <div>
                <p className={styles.bannerLabel}>Your Location</p>
                <p className={styles.bannerLocation} style={{ color }}>{info.location}</p>
              </div>
              <div className={styles.bannerStats}>
                <div className={styles.bStat}><span style={{ color }}>{leads.length}</span><small>Leads</small></div>
                <div className={styles.bStat}><span style={{ color }}>{teachers.length}</span><small>Teachers</small></div>
              </div>
            </div>

            {/* ── LEADS TAB ── */}
            {tab === 'leads' && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Student Leads</h2>
                  <button className={styles.addBtn} style={{ background: color }}
                    onClick={() => { setShowLeadForm(!showLeadForm); setLError(''); setLSuccess('') }}>
                    <Plus size={15} /> {showLeadForm ? 'Cancel' : 'Add Lead'}
                  </button>
                </div>

                {showLeadForm && (
                  <form onSubmit={handleCreateLead} className={styles.createForm} style={{ borderColor: color + '33' }}>
                    <h3 className={styles.formTitle}>New Student Lead</h3>
                    <div className={styles.formGrid}>
                      <div className={styles.formField}>
                        <label>Student Name</label>
                        <input type="text" placeholder="Full name" value={lForm.studentName}
                          onChange={e => setLForm({ ...lForm, studentName: e.target.value })} required />
                      </div>
                      <div className={styles.formField}>
                        <label>Parent Phone</label>
                        <input type="tel" placeholder="10-digit number" value={lForm.parentPhone} maxLength={10}
                          onChange={e => setLForm({ ...lForm, parentPhone: e.target.value.replace(/\D/g, '') })} required />
                      </div>
                      <div className={styles.formField}>
                        <label>Class</label>
                        <select value={lForm.studentClass} onChange={e => setLForm({ ...lForm, studentClass: e.target.value })}>
                          {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className={styles.formField}>
                        <label>Subject</label>
                        <select value={lForm.subject} onChange={e => setLForm({ ...lForm, subject: e.target.value })}>
                          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className={`${styles.formField} ${styles.fullWidth}`}>
                        <label>Address</label>
                        <input type="text" placeholder="Student address" value={lForm.address}
                          onChange={e => setLForm({ ...lForm, address: e.target.value })} required />
                      </div>
                      <div className={`${styles.formField} ${styles.fullWidth}`}>
                        <label>Note (optional)</label>
                        <input type="text" placeholder="Any additional info" value={lForm.note}
                          onChange={e => setLForm({ ...lForm, note: e.target.value })} />
                      </div>
                    </div>
                    {lError && <p className={styles.formError}>{lError}</p>}
                    {lSuccess && <p className={styles.formSuccess}>{lSuccess}</p>}
                    <button type="submit" className={styles.submitBtn} style={{ background: color }} disabled={lLoading}>
                      {lLoading ? 'Adding...' : 'Add Lead'}
                    </button>
                  </form>
                )}

                {lSuccess && !showLeadForm && <p className={styles.formSuccess}>{lSuccess}</p>}

                {leads.length === 0 ? (
                  <div className={styles.empty}><BookOpen size={36} /><p>No leads yet. Add your first student lead.</p></div>
                ) : (
                  <div className={styles.leadsList}>
                    {leads.map(lead => (
                      <div key={lead._id || lead.id} className={styles.leadCard} style={{ borderLeftColor: color }}>
                        <div className={styles.leadAvatar} style={{ background: color + '22', color }}>
                          {lead.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.leadInfo}>
                          <p className={styles.leadName}>{lead.studentName}</p>
                          <p className={styles.leadMeta}>Class {lead.class} · {lead.subject}</p>
                          <p className={styles.leadMeta}><Phone size={11} /> {lead.parentPhone} &nbsp;·&nbsp; {lead.address}</p>
                          {lead.note && <p className={styles.leadNote}>{lead.note}</p>}
                        </div>
                        <div className={styles.leadRight}>
                          <span className={styles.leadDate}>{lead.createdAt}</span>
                          <button className={styles.deleteBtn} onClick={() => handleDeleteLead(lead._id || lead.id || '')}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ── TEACHERS TAB ── */}
            {tab === 'teachers' && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Teachers — {info.location}</h2>
                  <button className={styles.addBtn} style={{ background: color }}
                    onClick={() => { setShowTeacherForm(!showTeacherForm); setTError(''); setTSuccess('') }}>
                    <Plus size={15} /> {showTeacherForm ? 'Cancel' : 'Add Teacher'}
                  </button>
                </div>

                {showTeacherForm && (
                  <form onSubmit={handleCreateTeacher} className={styles.createForm} style={{ borderColor: color + '33' }}>
                    <h3 className={styles.formTitle}>Create Teacher Account</h3>
                    <div className={styles.formGrid}>
                      <div className={styles.formField}>
                        <label>Full Name</label>
                        <input type="text" placeholder="Teacher name" value={tForm.name}
                          onChange={e => setTForm({ ...tForm, name: e.target.value })} required />
                      </div>
                      <div className={styles.formField}>
                        <label>Phone Number (Login ID)</label>
                        <div className={styles.phoneWrap}>
                          <Phone size={14} className={styles.phoneIcon} />
                          <input type="tel" placeholder="10-digit number" value={tForm.phone} maxLength={10}
                            onChange={e => setTForm({ ...tForm, phone: e.target.value.replace(/\D/g, '') })} required />
                        </div>
                      </div>
                      <div className={styles.formField}>
                        <label>Password</label>
                        <div className={styles.pwdWrap}>
                          <input type={showPwd ? 'text' : 'password'} placeholder="Set password"
                            value={tForm.password} onChange={e => setTForm({ ...tForm, password: e.target.value })} required />
                          <button type="button" onClick={() => setShowPwd(!showPwd)}>
                            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                      <div className={styles.formField}>
                        <label>Subject</label>
                        <select value={tForm.subject} onChange={e => setTForm({ ...tForm, subject: e.target.value })}>
                          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    {tError && <p className={styles.formError}>{tError}</p>}
                    {tSuccess && <p className={styles.formSuccess}>{tSuccess}</p>}
                    <button type="submit" className={styles.submitBtn} style={{ background: color }} disabled={tLoading}>
                      {tLoading ? 'Creating...' : 'Create Teacher'}
                    </button>
                  </form>
                )}

                {tSuccess && !showTeacherForm && <p className={styles.formSuccess}>{tSuccess}</p>}

                {teachers.length === 0 ? (
                  <div className={styles.empty}><User size={36} /><p>No teachers yet. Create the first one.</p></div>
                ) : (
                  <div className={styles.teacherList}>
                    {teachers.map(t => (
                      <div key={t.phone} className={styles.teacherCard} style={{ borderLeftColor: color }}>
                        <div className={styles.teacherAvatar} style={{ background: color + '22', color }}>
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.teacherInfo}>
                          <p className={styles.teacherName}>{t.name}</p>
                          <p className={styles.teacherMeta}><Phone size={11} /> {t.phone} &nbsp;·&nbsp; {t.subject}</p>
                          <p className={styles.teacherDate}>Added: {t.createdAt}</p>
                        </div>
                        <button className={styles.deleteBtn} onClick={() => handleDeleteTeacher(t.phone)}><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}
