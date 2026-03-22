'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import {
  Users, GraduationCap, MapPin, TrendingUp, LogOut,
  Plus, Trash2, Eye, EyeOff, Phone, Activity,
  FileText, ClipboardList, BookOpen, ChevronDown, ChevronUp, Bell
} from 'lucide-react'

type SubAdmin = { phone: string; password: string; location: string; name: string; createdAt: string }
type Lead = { _id: string; studentName: string; parentPhone: string; class: string; subject: string; address: string; location: string; status: string; createdAt: string; note: string }
type Teacher = { _id: string; phone: string; name: string; subject: string; location: string; createdAt: string }
type Application = { _id: string; fullName: string; phone: string; email: string; qualification: string; experience: string; subjects: string[]; location: string; status: string; createdAt: string; teachingMode: string; preferredClass: string; motivation: string; fieldOfStudy: string; address: string; hoursPerWeek: string; timeSlots: string[]; hourlyRate: string }
type Enquiry = { _id: string; name: string; phone: string; studentClass: string; subject: string; city: string; area: string; message: string; status: string; createdAt: string }

const LOCATIONS = ['Hauz Khas', 'Gurgaon', 'Connaught Place', 'Uttam Nagar']
const LOC_COLORS: Record<string, string> = {
  'Hauz Khas': '#667eea', 'Gurgaon': '#43e97b',
  'Connaught Place': '#f7971e', 'Uttam Nagar': '#f093fb',
}
const STATUS_COLORS: Record<string, string> = {
  new: '#667eea', contacted: '#f7971e', assigned: '#43e97b', closed: '#f5576c',
  pending: '#f7971e', reviewed: '#667eea', approved: '#43e97b', rejected: '#f5576c',
}

export default function Dashboard() {
  const router = useRouter()
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'subadmins' | 'activities'>('overview')

  // Sub admin form
  const [showForm, setShowForm] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ phone: '', password: '', location: LOCATIONS[0], name: '' })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Activities
  const [leads, setLeads] = useState<Lead[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [actTab, setActTab] = useState<'leads' | 'teachers' | 'applications' | 'enquiries'>('enquiries')
  const [filterLoc, setFilterLoc] = useState('all')
  const [expandedApp, setExpandedApp] = useState<string | null>(null)
  const [activitiesLoaded, setActivitiesLoaded] = useState(false)

  const fetchSubAdmins = async () => {
    const res = await fetch('/api/admin/subadmins')
    if (res.ok) setSubAdmins(await res.json())
  }

  const fetchActivities = async () => {
    const res = await fetch('/api/admin/activities')
    if (res.ok) {
      const d = await res.json()
      setLeads(d.leads || [])
      setTeachers(d.teachers || [])
      setApplications(d.applications || [])
      setEnquiries(d.enquiries || [])
      setActivitiesLoaded(true)
    }
  }

  useEffect(() => { fetchSubAdmins(); fetchActivities() }, [])

  useEffect(() => {
    if (activeTab === 'activities' && !activitiesLoaded) fetchActivities()
  }, [activeTab, activitiesLoaded])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(''); setFormSuccess(''); setLoading(true)
    const res = await fetch('/api/admin/subadmins', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      setFormSuccess('Sub admin created!')
      setForm({ phone: '', password: '', location: LOCATIONS[0], name: '' })
      setShowForm(false); fetchSubAdmins()
    } else { const d = await res.json(); setFormError(d.error || 'Failed') }
  }

  const handleDelete = async (phone: string) => {
    if (!confirm('Delete this sub admin?')) return
    await fetch('/api/admin/subadmins', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
    fetchSubAdmins()
  }

  const byLocation = LOCATIONS.map(loc => ({
    location: loc, admins: subAdmins.filter(s => s.location === loc), color: LOC_COLORS[loc] || '#667eea',
  }))

  // Filtered by location
  const filteredLeads = filterLoc === 'all' ? leads : leads.filter(l => l.location === filterLoc)
  const filteredTeachers = filterLoc === 'all' ? teachers : teachers.filter(t => t.location === filterLoc)
  const filteredApps = filterLoc === 'all' ? applications : applications.filter(a => a.location === filterLoc)
  const filteredEnquiries = filterLoc === 'all' ? enquiries : enquiries.filter(e => e.area === filterLoc)

  const tabs = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'activities', label: 'Activities', icon: Activity },
    { key: 'subadmins', label: 'Sub Admins', icon: Users },
  ] as const

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoBox}>SG</div>
          <span>Simrit Gyan</span>
        </div>
        <nav className={styles.sidebarNav}>
          {tabs.map(t => (
            <button key={t.key} className={`${styles.navItem} ${activeTab === t.key ? styles.active : ''}`}
              onClick={() => setActiveTab(t.key)}>
              <t.icon size={18} /> {t.label}
            </button>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={18} /> Logout</button>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeTab === 'overview' ? 'Dashboard' : activeTab === 'activities' ? 'All Activities' : 'Sub Admin Management'}
            </h1>
            <p className={styles.pageSubtitle}>Welcome back, Super Admin</p>
          </div>
          <div className={styles.topbarRight}>
            <button className={styles.tabBtnMobile}
              onClick={() => setActiveTab(activeTab === 'overview' ? 'activities' : activeTab === 'activities' ? 'subadmins' : 'overview')}>
              <Activity size={18} />
            </button>
            <button className={styles.logoutMobile} onClick={handleLogout}><LogOut size={18} /></button>
          </div>
        </header>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            <div className={styles.statsGrid}>
              {[
                { label: 'Student Enquiries', value: enquiries.length || '—', icon: Bell, color: '#43e97b' },
                { label: 'Active Teachers', value: teachers.length || '—', icon: GraduationCap, color: '#f093fb' },
                { label: 'Locations', value: LOCATIONS.length, icon: MapPin, color: '#667eea' },
                { label: 'Tutor Applications', value: applications.length || '—', icon: ClipboardList, color: '#f7971e' },
              ].map((s, i) => (
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

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Locations Overview</h2>
              <div className={styles.locGrid}>
                {byLocation.map(({ location, admins, color }) => (
                  <div key={location} className={styles.locCard} style={{ borderColor: color + '33' }}>
                    <div className={styles.locDot} style={{ background: color }} />
                    <div className={styles.locInfo}>
                      <p className={styles.locName}>{location}</p>
                      <p className={styles.locCount}>
                        {admins.length} sub admin{admins.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
                        {leads.filter(l => l.location === location).length} leads &nbsp;·&nbsp;
                        {teachers.filter(t => t.location === location).length} teachers
                      </p>
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

        {/* ── ACTIVITIES ── */}
        {activeTab === 'activities' && (
          <section className={styles.section}>
            {/* Location filter */}
            <div className={styles.actHeader}>
              <div className={styles.actTabs}>
                {([['enquiries', Bell, 'Enquiries'], ['leads', FileText, 'Leads'], ['teachers', GraduationCap, 'Teachers'], ['applications', ClipboardList, 'Applications']] as const).map(([key, Icon, label]) => (
                  <button key={key} className={`${styles.actTab} ${actTab === key ? styles.actTabActive : ''}`}
                    onClick={() => setActTab(key)}>
                    <Icon size={15} /> {label}
                    <span className={styles.actCount}>
                      {key === 'enquiries' ? filteredEnquiries.length : key === 'leads' ? filteredLeads.length : key === 'teachers' ? filteredTeachers.length : filteredApps.length}
                    </span>
                  </button>
                ))}
              </div>
              <div className={styles.locFilter}>
                <MapPin size={14} />
                <select value={filterLoc} onChange={e => setFilterLoc(e.target.value)}>
                  <option value="all">All Locations</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {/* ── Enquiries ── */}
            {actTab === 'enquiries' && (
              <div className={styles.actList}>
                {filteredEnquiries.length === 0
                  ? <div className={styles.empty}><Bell size={32} /><p>No student enquiries found.</p></div>
                  : filteredEnquiries.map(enq => {
                    const c = LOC_COLORS[enq.area] || '#43e97b'
                    return (
                      <div key={enq._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>
                          {enq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.actInfo}>
                          <p className={styles.actName}>{enq.name}</p>
                          <p className={styles.actMeta}><Phone size={11} /> {enq.phone} · {enq.studentClass} · {enq.subject}</p>
                          <p className={styles.actMeta}><MapPin size={11} /> {enq.city}, {enq.area}</p>
                          {enq.message && <p className={styles.actMeta} style={{ fontStyle: 'italic' }}>{enq.message}</p>}
                        </div>
                        <div className={styles.actRight}>
                          <span className={styles.locPill} style={{ background: c + '18', color: c }}>{enq.area}</span>
                          <span className={styles.statusPill} style={{ background: (STATUS_COLORS[enq.status] || c) + '18', color: STATUS_COLORS[enq.status] || c }}>{enq.status}</span>
                          <span className={styles.actDate}>{enq.createdAt}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* ── Leads ── */}
            {actTab === 'leads' && (
              <div className={styles.actList}>
                {filteredLeads.length === 0
                  ? <div className={styles.empty}><BookOpen size={32} /><p>No leads found.</p></div>
                  : filteredLeads.map(lead => {
                    const c = LOC_COLORS[lead.location] || '#667eea'
                    return (
                      <div key={lead._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>
                          {lead.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.actInfo}>
                          <p className={styles.actName}>{lead.studentName}</p>
                          <p className={styles.actMeta}>Class {lead.class} · {lead.subject} · <Phone size={11} /> {lead.parentPhone}</p>
                          <p className={styles.actMeta}>{lead.address}</p>
                        </div>
                        <div className={styles.actRight}>
                          <span className={styles.locPill} style={{ background: c + '18', color: c }}>{lead.location}</span>
                          <span className={styles.statusPill} style={{ background: (STATUS_COLORS[lead.status] || c) + '18', color: STATUS_COLORS[lead.status] || c }}>{lead.status}</span>
                          <span className={styles.actDate}>{lead.createdAt}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* ── Teachers ── */}
            {actTab === 'teachers' && (
              <div className={styles.actList}>
                {filteredTeachers.length === 0
                  ? <div className={styles.empty}><GraduationCap size={32} /><p>No teachers found.</p></div>
                  : filteredTeachers.map(t => {
                    const c = LOC_COLORS[t.location] || '#667eea'
                    return (
                      <div key={t._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.actInfo}>
                          <p className={styles.actName}>{t.name}</p>
                          <p className={styles.actMeta}><Phone size={11} /> {t.phone} · {t.subject}</p>
                        </div>
                        <div className={styles.actRight}>
                          <span className={styles.locPill} style={{ background: c + '18', color: c }}>{t.location}</span>
                          <span className={styles.actDate}>{t.createdAt}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* ── Applications ── */}
            {actTab === 'applications' && (
              <div className={styles.actList}>
                {filteredApps.length === 0
                  ? <div className={styles.empty}><ClipboardList size={32} /><p>No applications found.</p></div>
                  : filteredApps.map(app => {
                    const c = LOC_COLORS[app.location] || '#667eea'
                    const isOpen = expandedApp === app._id
                    return (
                      <div key={app._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.appRow} onClick={() => setExpandedApp(isOpen ? null : app._id)}>
                          <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>
                            {app.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div className={styles.actInfo}>
                            <p className={styles.actName}>{app.fullName}</p>
                            <p className={styles.actMeta}><Phone size={11} /> {app.phone} · {app.qualification} · {app.experience}</p>
                            <p className={styles.actMeta}>{app.subjects?.join(', ')}</p>
                          </div>
                          <div className={styles.actRight}>
                            <span className={styles.locPill} style={{ background: c + '18', color: c }}>{app.location}</span>
                            <span className={styles.statusPill} style={{ background: (STATUS_COLORS[app.status] || c) + '18', color: STATUS_COLORS[app.status] || c }}>{app.status}</span>
                            <span className={styles.actDate}>{app.createdAt}</span>
                            {isOpen ? <ChevronUp size={15} className={styles.chevron} /> : <ChevronDown size={15} className={styles.chevron} />}
                          </div>
                        </div>
                        {isOpen && (
                          <div className={styles.appExpanded}>
                            <div className={styles.appGrid}>
                              <div><span>Email</span><p>{app.email}</p></div>
                              <div><span>Address</span><p>{app.address}</p></div>
                              <div><span>Field of Study</span><p>{app.fieldOfStudy}</p></div>
                              <div><span>Preferred Class</span><p>{app.preferredClass}</p></div>
                              <div><span>Teaching Mode</span><p>{app.teachingMode}</p></div>
                              <div><span>Hours/Week</span><p>{app.hoursPerWeek}</p></div>
                              {app.timeSlots?.length > 0 && <div><span>Time Slots</span><p>{app.timeSlots.join(', ')}</p></div>}
                              {app.hourlyRate && <div><span>Expected Rate</span><p>₹{app.hourlyRate}/hr</p></div>}
                              <div className={styles.fullCol}><span>Motivation</span><p>{app.motivation}</p></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            )}
          </section>
        )}

        {/* ── SUB ADMINS ── */}
        {activeTab === 'subadmins' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>All Sub Admins</h2>
              <button className={styles.addBtn} onClick={() => { setShowForm(!showForm); setFormError(''); setFormSuccess('') }}>
                <Plus size={16} /> {showForm ? 'Cancel' : 'Add Sub Admin'}
              </button>
            </div>

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

            {byLocation.map(({ location, admins, color }) => (
              <div key={location} className={styles.locationGroup}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupDot} style={{ background: color }} />
                  <h3 className={styles.groupTitle}>{location}</h3>
                  <span className={styles.groupCount}>{admins.length}</span>
                </div>
                {admins.length === 0
                  ? <p className={styles.emptyMsg}>No sub admins for this location yet.</p>
                  : (
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
                            <button className={styles.deleteBtn} onClick={() => handleDelete(sa.phone)}><Trash2 size={15} /></button>
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
