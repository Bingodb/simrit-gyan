'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './sub-dashboard.module.css'
import { MapPin, LogOut, Phone, Users, BookOpen, Plus, Trash2, Eye, EyeOff, User, FileText, ClipboardList, Bell, Menu, X, Image as ImageIcon, Upload, ZoomIn, ZoomOut } from 'lucide-react'

type SessionInfo = { phone: string; location: string; name: string }
type Teacher = { phone: string; name: string; subject: string; location: string; createdAt: string }
type Lead = {
  _id?: string; id?: string; studentName: string; parentPhone: string; class: string
  subject: string; address: string; status: string; createdAt: string; note: string
}
type Application = {
  _id: string; fullName: string; email: string; phone: string; address: string
  qualification: string; fieldOfStudy: string; experience: string; preferredClass: string
  subjects: string[]; teachingMode: string; hoursPerWeek: string; timeSlots: string[]
  motivation: string; hourlyRate: string; status: string; createdAt: string
}
type Enquiry = {
  _id: string; name: string; phone: string; studentClass: string; subject: string
  city: string; area: string; message: string; status: string; createdAt: string
}
type GalleryImg = { _id: string; url: string; caption: string; size: number; uploadedBy: string }

const LOC_COLORS: Record<string, string> = {
  'Hauz Khas': '#667eea', 'Gurgaon': '#43e97b',
  'Connaught Place': '#f7971e', 'Uttam Nagar': '#f093fb',
}

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Hindi', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'All Subjects']
const CLASSES = ['1','2','3','4','5','6','7','8','9','10','11','12']

export default function SubDashboard() {
  const router = useRouter()
  const [info, setInfo] = useState<SessionInfo | null>(null)
  const [tab, setTab] = useState<'teachers' | 'leads' | 'applications' | 'enquiries' | 'gallery'>('enquiries')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const switchTab = (t: typeof tab) => { setTab(t); setSidebarOpen(false) }

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

  // Applications state
  const [applications, setApplications] = useState<Application[]>([])
  const [expandedApp, setExpandedApp] = useState<string | null>(null)

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImg[]>([])
  const [gUploading, setGUploading] = useState(false)
  const [gCaption, setGCaption] = useState('')
  const [gError, setGError] = useState('')
  const [gSuccess, setGSuccess] = useState('')

  useEffect(() => {
    fetch('/api/admin/sub-session').then(r => r.json()).then(d => { if (d.phone) setInfo(d) })
    fetchTeachers()
    fetchLeads()
    fetchApplications()
    fetchEnquiries()
    fetchGallery()
  }, [])

  const fetchTeachers = () => fetch('/api/subadmin/teachers').then(r => r.json()).then(d => { if (Array.isArray(d)) setTeachers(d) })
  const fetchLeads = () => fetch('/api/subadmin/leads').then(r => r.json()).then(d => { if (Array.isArray(d)) setLeads(d) })
  const fetchApplications = () => fetch('/api/subadmin/applications').then(r => r.json()).then(d => { if (Array.isArray(d)) setApplications(d) })
  const fetchEnquiries = () => fetch('/api/subadmin/enquiries').then(r => r.json()).then(d => { if (Array.isArray(d)) setEnquiries(d) })
  const fetchGallery = () => fetch('/api/subadmin/gallery').then(r => r.json()).then(d => { if (Array.isArray(d)) setGalleryImages(d) })

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

  const handleUpdateAppStatus = async (id: string, status: string) => {
    await fetch('/api/subadmin/applications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    fetchApplications()
  }

  const handleDeleteApp = async (id: string) => {
    if (!confirm('Delete this application?')) return
    await fetch('/api/subadmin/applications', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchApplications()
  }

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    await fetch('/api/subadmin/enquiries', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    fetchEnquiries()
  }

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return
    await fetch('/api/subadmin/enquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchEnquiries()
  }

  const handleSendToLead = async (enq: Enquiry) => {
    const body = {
      studentName: enq.name,
      parentPhone: enq.phone,
      studentClass: enq.studentClass,
      subject: enq.subject,
      address: `${enq.city}, ${enq.area}`,
      note: enq.message || '',
    }
    const res = await fetch('/api/subadmin/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    // 200 = created, 409 = already exists — either way go to leads
    if (res.ok || res.status === 409) {
      fetchLeads()
      switchTab('leads')
    }
  }

  const handleUploadGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setGError(''); setGSuccess(''); setGUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const url = reader.result as string
      const res = await fetch('/api/subadmin/gallery', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, caption: gCaption, size: 1 }),
      })
      setGUploading(false)
      if (res.ok) { setGSuccess('Image uploaded!'); setGCaption(''); fetchGallery() }
      else { const d = await res.json(); setGError(d.error || 'Upload failed') }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleGallerySize = async (id: string, size: number) => {
    await fetch('/api/subadmin/gallery', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, size }),
    })
    fetchGallery()
  }

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete this image?')) return
    await fetch('/api/subadmin/gallery', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchGallery()
  }

  // MongoDB returns _id, map it to id for consistency
  const mappedLeads = leads.map((l: Lead & { _id?: string }) => ({ ...l, id: l._id || l.id }))
  const leadPhones = new Set(leads.map(l => l.parentPhone))

  const color = info ? (LOC_COLORS[info.location] || '#667eea') : '#667eea'

  return (
    <div className={styles.page}>
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <div className={styles.logoBox} style={{ background: color }}>SG</div>
            <span>Simrit Gyan</span>
          </div>
          <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${tab === 'enquiries' ? styles.active : ''}`}
            style={tab === 'enquiries' ? { background: color + '18', color } : {}}
            onClick={() => switchTab('enquiries')}>
            <Bell size={18} /> Enquiries
            {enquiries.filter(e => e.status === 'new').length > 0 && (
              <span className={styles.navBadge}>{enquiries.filter(e => e.status === 'new').length}</span>
            )}
          </button>
          <button className={`${styles.navItem} ${tab === 'leads' ? styles.active : ''}`}
            style={tab === 'leads' ? { background: color + '18', color } : {}}
            onClick={() => switchTab('leads')}>
            <FileText size={18} /> Student Leads
          </button>
          <button className={`${styles.navItem} ${tab === 'teachers' ? styles.active : ''}`}
            style={tab === 'teachers' ? { background: color + '18', color } : {}}
            onClick={() => switchTab('teachers')}>
            <Users size={18} /> Teachers
          </button>
          <button className={`${styles.navItem} ${tab === 'applications' ? styles.active : ''}`}
            style={tab === 'applications' ? { background: color + '18', color } : {}}
            onClick={() => switchTab('applications')}>
            <ClipboardList size={18} /> Applications
            {applications.filter(a => a.status === 'pending').length > 0 && (
              <span className={styles.navBadge}>{applications.filter(a => a.status === 'pending').length}</span>
            )}
          </button>
          <button className={`${styles.navItem} ${tab === 'gallery' ? styles.active : ''}`}
            style={tab === 'gallery' ? { background: color + '18', color } : {}}
            onClick={() => switchTab('gallery')}>
            <ImageIcon size={18} /> Gallery
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={18} /> Logout</button>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
            <div>
              <h1 className={styles.pageTitle}>{tab === 'leads' ? 'Student Leads' : tab === 'teachers' ? 'Teachers' : tab === 'applications' ? 'Applications' : tab === 'gallery' ? 'Gallery' : 'Enquiries'}</h1>
              <p className={styles.pageSubtitle}>{info ? `${info.name} · ${info.location}` : 'Loading...'}</p>
            </div>
          </div>
          <button className={styles.logoutMobile} onClick={handleLogout}><LogOut size={18} /></button>
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
                <div className={styles.bStat}><span style={{ color }}>{enquiries.length}</span><small>Enquiries</small></div>
                <div className={styles.bStat}><span style={{ color }}>{leads.length}</span><small>Leads</small></div>
                <div className={styles.bStat}><span style={{ color }}>{teachers.length}</span><small>Teachers</small></div>
                <div className={styles.bStat}><span style={{ color }}>{applications.filter(a => a.status === 'pending').length}</span><small>Pending</small></div>
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
            {/* ── APPLICATIONS TAB ── */}
            {tab === 'applications' && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Tutor Applications — {info.location}</h2>
                  <span className={styles.appCount}>{applications.length} total</span>
                </div>

                {applications.length === 0 ? (
                  <div className={styles.empty}><ClipboardList size={36} /><p>No applications yet for {info.location}.</p></div>
                ) : (
                  <div className={styles.appList}>
                    {applications.map(app => (
                      <div key={app._id} className={styles.appCard} style={{ borderLeftColor: color }}>
                        <div className={styles.appHeader} onClick={() => setExpandedApp(expandedApp === app._id ? null : app._id)}>
                          <div className={styles.appAvatar} style={{ background: color + '22', color }}>
                            {app.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div className={styles.appInfo}>
                            <p className={styles.appName}>{app.fullName}</p>
                            <p className={styles.appMeta}><Phone size={11} /> {app.phone} &nbsp;·&nbsp; {app.qualification} &nbsp;·&nbsp; {app.experience}</p>
                            <p className={styles.appSubjects}>{app.subjects.join(', ')}</p>
                          </div>
                          <div className={styles.appRight}>
                            <span className={styles.appDate}>{app.createdAt}</span>
                            <span className={`${styles.appStatus} ${styles['status_' + app.status]}`}>{app.status}</span>
                          </div>
                        </div>

                        {expandedApp === app._id && (
                          <div className={styles.appDetails}>
                            <div className={styles.appDetailGrid}>
                              <div><span>Email</span><p>{app.email}</p></div>
                              <div><span>Address</span><p>{app.address}</p></div>
                              <div><span>Field of Study</span><p>{app.fieldOfStudy}</p></div>
                              <div><span>Preferred Class</span><p>{app.preferredClass}</p></div>
                              <div><span>Teaching Mode</span><p>{app.teachingMode}</p></div>
                              <div><span>Hours/Week</span><p>{app.hoursPerWeek}</p></div>
                              {app.timeSlots.length > 0 && <div><span>Time Slots</span><p>{app.timeSlots.join(', ')}</p></div>}
                              {app.hourlyRate && <div><span>Expected Rate</span><p>₹{app.hourlyRate}/hr</p></div>}
                              <div className={styles.fullCol}><span>Motivation</span><p>{app.motivation}</p></div>
                            </div>
                            <div className={styles.appActions}>
                              {['pending','reviewed','approved','rejected'].map(s => (
                                <button key={s} className={`${styles.statusBtn} ${app.status === s ? styles.statusBtnActive : ''}`}
                                  style={app.status === s ? { background: color, borderColor: color } : {}}
                                  onClick={() => handleUpdateAppStatus(app._id, s)}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                              ))}
                              <button className={styles.deleteBtn} onClick={() => handleDeleteApp(app._id)}><Trash2 size={14} /></button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
            {/* ── ENQUIRIES TAB ── */}
            {tab === 'enquiries' && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Student Enquiries — {info.location}</h2>
                  <span className={styles.appCount}>{enquiries.length} total · {enquiries.filter(e => e.status === 'new').length} new</span>
                </div>

                {enquiries.length === 0 ? (
                  <div className={styles.empty}><Bell size={36} /><p>No student enquiries yet for {info.location}.</p></div>
                ) : (
                  <div className={styles.leadsList}>
                    {enquiries.map(enq => {
                      const statusColors: Record<string, string> = { new: '#43e97b', contacted: '#f7971e', assigned: '#667eea', closed: '#f5576c' }
                      const sc = statusColors[enq.status] || color
                      return (
                        <div key={enq._id} className={styles.leadCard} style={{ borderLeftColor: sc }}>
                          <div className={styles.leadAvatar} style={{ background: sc + '22', color: sc }}>
                            {enq.name.charAt(0).toUpperCase()}
                          </div>
                          <div className={styles.leadInfo}>
                            <p className={styles.leadName}>{enq.name}</p>
                            <p className={styles.leadMeta}><Phone size={11} /> {enq.phone} &nbsp;·&nbsp; {enq.studentClass} &nbsp;·&nbsp; {enq.subject}</p>
                            <p className={styles.leadMeta}><MapPin size={11} /> {enq.city}, {enq.area}</p>
                            {enq.message && <p className={styles.leadNote}>{enq.message}</p>}
                            <div className={styles.enqActions}>
                              {['new','contacted','assigned','closed'].map(s => (
                                <button key={s}
                                  className={`${styles.statusBtn} ${enq.status === s ? styles.statusBtnActive : ''}`}
                                  style={enq.status === s ? { background: sc, borderColor: sc, color: '#fff' } : {}}
                                  onClick={() => handleUpdateEnquiryStatus(enq._id, s)}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className={styles.leadRight}>
                            <span className={styles.leadDate}>{enq.createdAt}</span>
                            <span className={styles.appStatus} style={{ background: sc + '22', color: sc }}>{enq.status}</span>
                            <button className={styles.sendLeadBtn} title="Send to Leads"
                              onClick={() => handleSendToLead(enq)}
                              disabled={leadPhones.has(enq.phone)}
                              style={leadPhones.has(enq.phone) ? { opacity: 0.4, cursor: 'not-allowed' } : {}}>
                              <FileText size={13} /> {leadPhones.has(enq.phone) ? 'In Leads' : 'Lead'}
                            </button>
                            <button className={styles.deleteBtn} onClick={() => handleDeleteEnquiry(enq._id)}><Trash2 size={14} /></button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>
            )}
            {/* ── GALLERY TAB ── */}
            {tab === 'gallery' && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Gallery — {info.location}</h2>
                  <span className={styles.appCount}>{galleryImages.length} images</span>
                </div>

                {/* Upload area */}
                <div className={styles.galleryUploadBox} style={{ borderColor: color + '44' }}>
                  <div className={styles.formField} style={{ marginBottom: '0.75rem' }}>
                    <label>Caption (optional)</label>
                    <input type="text" placeholder="e.g. Student achievement, event photo..."
                      value={gCaption} onChange={e => setGCaption(e.target.value)} />
                  </div>
                  <label className={styles.uploadLabel} style={{ background: color }}>
                    <Upload size={15} />
                    {gUploading ? 'Uploading...' : 'Choose & Upload Image'}
                    <input type="file" accept="image/*" onChange={handleUploadGallery} disabled={gUploading} style={{ display: 'none' }} />
                  </label>
                  {gError && <p className={styles.formError} style={{ marginTop: '0.5rem' }}>{gError}</p>}
                  {gSuccess && <p className={styles.formSuccess} style={{ marginTop: '0.5rem' }}>{gSuccess}</p>}
                </div>

                {galleryImages.length === 0 ? (
                  <div className={styles.empty}><ImageIcon size={36} /><p>No images yet. Upload the first one.</p></div>
                ) : (
                  <div className={styles.galleryGrid}>
                    {galleryImages.map(img => (
                      <div key={img._id} className={styles.galleryCard}
                        style={{ gridColumn: img.size === 2 ? 'span 2' : 'span 1', gridRow: img.size === 2 ? 'span 2' : 'span 1' }}>
                        <img src={img.url} alt={img.caption || 'Gallery'} className={styles.galleryImg} />
                        <div className={styles.galleryCardOverlay}>
                          {img.caption && <p className={styles.galleryCaption}>{img.caption}</p>}
                          <div className={styles.galleryActions}>
                            <button title="Make smaller" className={styles.galBtn}
                              onClick={() => handleGallerySize(img._id, Math.max(0.5, img.size - 0.5))}
                              disabled={img.size <= 0.5}>
                              <ZoomOut size={14} />
                            </button>
                            <span className={styles.galSizeLabel}>{img.size}x</span>
                            <button title="Make larger" className={styles.galBtn}
                              onClick={() => handleGallerySize(img._id, Math.min(2, img.size + 0.5))}
                              disabled={img.size >= 2}>
                              <ZoomIn size={14} />
                            </button>
                            <button className={styles.deleteBtn} onClick={() => handleDeleteGallery(img._id)}><Trash2 size={14} /></button>
                          </div>
                        </div>
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
