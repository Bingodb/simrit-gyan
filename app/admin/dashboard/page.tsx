'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import {
  Users, GraduationCap, MapPin, TrendingUp, LogOut,
  Plus, Trash2, Eye, EyeOff, Phone, Activity,
  FileText, ClipboardList, BookOpen, ChevronDown, ChevronUp, Bell, Menu, X, Edit2
} from 'lucide-react'

type SubAdmin = { phone: string; password: string; location: string; name: string; createdAt: string }
type Lead = { _id: string; studentName: string; parentPhone: string; class: string; subject: string; address: string; location: string; status: string; createdAt: string; note: string }
type Teacher = { _id: string; phone: string; name: string; subject: string; location: string; createdAt: string }
type Application = { _id: string; fullName: string; phone: string; email: string; qualification: string; experience: string; subjects: string[]; location: string; status: string; createdAt: string; teachingMode: string; preferredClass: string; motivation: string; fieldOfStudy: string; address: string; hoursPerWeek: string; timeSlots: string[]; hourlyRate: string }
type Enquiry = { _id: string; name: string; phone: string; studentClass: string; subject: string; city: string; area: string; message: string; status: string; createdAt: string }
type LocationType = { _id: string; name: string; color: string; active: boolean; createdAt: string }

const STATUS_COLORS: Record<string, string> = {
  new: '#667eea', contacted: '#f7971e', assigned: '#43e97b', closed: '#f5576c',
  pending: '#f7971e', reviewed: '#667eea', approved: '#43e97b', rejected: '#f5576c',
}

export default function Dashboard() {
  const router = useRouter()
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([])
  const [locations, setLocations] = useState<LocationType[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'subadmins' | 'activities' | 'locations'>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({ phone: '', password: '', location: '', name: '' })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Location management
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [locationForm, setLocationForm] = useState({ name: '', color: '#667eea' })
  const [locationError, setLocationError] = useState('')
  const [locationSuccess, setLocationSuccess] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [editingLocation, setEditingLocation] = useState<LocationType | null>(null)

  // Edit state
  const [editingSubAdmin, setEditingSubAdmin] = useState<SubAdmin | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editForm, setEditForm] = useState({ oldPhone: '', newPhone: '', password: '', name: '', location: '' })
  const [editShowPwd, setEditShowPwd] = useState(false)
  const [editError, setEditError] = useState('')
  const [editSuccess, setEditSuccess] = useState('')
  const [editLoading, setEditLoading] = useState(false)

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

  const fetchLocations = async () => {
    const res = await fetch('/api/admin/locations')
    if (res.ok) {
      const locs = await res.json()
      
      // If no locations exist, initialize defaults
      if (locs.length === 0) {
        await fetch('/api/admin/init-locations', { method: 'POST' })
        // Fetch again after initialization
        const res2 = await fetch('/api/admin/locations')
        if (res2.ok) {
          const locs2 = await res2.json()
          setLocations(locs2)
          if (locs2.length > 0 && !form.location) {
            setForm(prev => ({ ...prev, location: locs2[0].name }))
          }
        }
      } else {
        setLocations(locs)
        // Set first location as default if form location is empty
        if (locs.length > 0 && !form.location) {
          setForm(prev => ({ ...prev, location: locs[0].name }))
        }
      }
    }
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

  useEffect(() => { fetchSubAdmins(); fetchActivities(); fetchLocations() }, [])
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

  const handleEdit = (subAdmin: SubAdmin) => {
    setEditingSubAdmin(subAdmin)
    setEditForm({
      oldPhone: subAdmin.phone,
      newPhone: subAdmin.phone,
      password: '',
      name: subAdmin.name,
      location: subAdmin.location
    })
    setShowEditForm(true)
    setEditError('')
    setEditSuccess('')
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditError(''); setEditSuccess(''); setEditLoading(true)
    
    const res = await fetch('/api/admin/subadmins', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    
    setEditLoading(false)
    if (res.ok) {
      setEditSuccess('Sub admin updated successfully!')
      setTimeout(() => {
        setShowEditForm(false)
        setEditingSubAdmin(null)
        fetchSubAdmins()
      }, 1500)
    } else {
      const d = await res.json()
      setEditError(d.error || 'Failed to update')
    }
  }

  // Location Management
  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocationError(''); setLocationSuccess(''); setLocationLoading(true)
    
    const res = await fetch('/api/admin/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationForm),
    })
    
    setLocationLoading(false)
    if (res.ok) {
      setLocationSuccess('Location created!')
      setLocationForm({ name: '', color: '#667eea' })
      setShowLocationForm(false)
      fetchLocations()
    } else {
      const d = await res.json()
      setLocationError(d.error || 'Failed to create location')
    }
  }

  const handleEditLocation = (location: LocationType) => {
    setEditingLocation(location)
    setLocationForm({ name: location.name, color: location.color })
    setShowLocationForm(true)
    setLocationError('')
    setLocationSuccess('')
  }

  const handleUpdateLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLocation) return
    
    setLocationError(''); setLocationSuccess(''); setLocationLoading(true)
    
    const res = await fetch('/api/admin/locations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingLocation._id, ...locationForm }),
    })
    
    setLocationLoading(false)
    if (res.ok) {
      setLocationSuccess('Location updated!')
      setTimeout(() => {
        setShowLocationForm(false)
        setEditingLocation(null)
        setLocationForm({ name: '', color: '#667eea' })
        fetchLocations()
      }, 1500)
    } else {
      const d = await res.json()
      setLocationError(d.error || 'Failed to update location')
    }
  }

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('Delete this location? This may affect sub-admins assigned to it.')) return
    
    await fetch('/api/admin/locations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchLocations()
  }

  const cancelLocationForm = () => {
    setShowLocationForm(false)
    setEditingLocation(null)
    setLocationForm({ name: '', color: '#667eea' })
    setLocationError('')
    setLocationSuccess('')
  }

  const byLocation = locations.filter(loc => loc.active).map(loc => ({
    location: loc.name, admins: subAdmins.filter(s => s.location === loc.name), color: loc.color,
  }))

  // Add sub-admins with locations not in the database (orphaned locations)
  const orphanedSubAdmins = subAdmins.filter(sa => 
    !locations.some(loc => loc.name === sa.location)
  )
  
  // Group orphaned sub-admins by their location
  const orphanedLocations = Array.from(new Set(orphanedSubAdmins.map(sa => sa.location)))
    .map(locName => ({
      location: locName,
      admins: orphanedSubAdmins.filter(sa => sa.location === locName),
      color: '#888888', // Gray color for orphaned locations
    }))

  // Combine active locations with orphaned locations
  const allLocationGroups = [...byLocation, ...orphanedLocations]

  const LOCATION_NAMES = locations.filter(loc => loc.active).map(loc => loc.name)
  const LOC_COLORS: Record<string, string> = locations.reduce((acc, loc) => {
    acc[loc.name] = loc.color
    return acc
  }, {} as Record<string, string>)

  const filteredLeads = filterLoc === 'all' ? leads : leads.filter(l => l.location === filterLoc)
  const filteredTeachers = filterLoc === 'all' ? teachers : teachers.filter(t => t.location === filterLoc)
  const filteredApps = filterLoc === 'all' ? applications : applications.filter(a => a.location === filterLoc)
  const filteredEnquiries = filterLoc === 'all' ? enquiries : enquiries.filter(e => e.area === filterLoc)

  const tabs = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'activities', label: 'Activities', icon: Activity },
    { key: 'subadmins', label: 'Sub Admins', icon: Users },
    { key: 'locations', label: 'Locations', icon: MapPin },
  ] as const

  const switchTab = (key: typeof activeTab) => {
    setActiveTab(key)
    setSidebarOpen(false)
  }

  return (
    <div className={styles.page}>
      {/* Overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <div className={styles.logoBox}>SG</div>
            <span>Simrit Gyan</span>
          </div>
          <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className={styles.sidebarNav}>
          {tabs.map(t => (
            <button key={t.key} className={`${styles.navItem} ${activeTab === t.key ? styles.active : ''}`}
              onClick={() => switchTab(t.key)}>
              <t.icon size={18} /> {t.label}
            </button>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={18} /> Logout</button>
      </aside>

      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
            <div>
              <h1 className={styles.pageTitle}>
                {activeTab === 'overview' ? 'Dashboard' : activeTab === 'activities' ? 'All Activities' : activeTab === 'locations' ? 'Locations' : 'Sub Admins'}
              </h1>
              <p className={styles.pageSubtitle}>Welcome back, Super Admin</p>
            </div>
          </div>
          <button className={styles.logoutMobile} onClick={handleLogout}><LogOut size={18} /></button>
        </header>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <>
            <div className={styles.statsGrid}>
              {[
                { label: 'Student Enquiries', value: enquiries.length || '—', icon: Bell, color: '#43e97b' },
                { label: 'Active Teachers', value: teachers.length || '—', icon: GraduationCap, color: '#f093fb' },
                { label: 'Locations', value: locations.filter(l => l.active).length, icon: MapPin, color: '#667eea' },
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
                {allLocationGroups.map(({ location, admins, color }) => (
                  <div key={location} className={styles.locCard} style={{ borderColor: color + '33' }}>
                    <div className={styles.locDot} style={{ background: color }} />
                    <div className={styles.locInfo}>
                      <p className={styles.locName}>{location}</p>
                      <p className={styles.locCount}>
                        {admins.length} sub admin{admins.length !== 1 ? 's' : ''} · {leads.filter(l => l.location === location).length} leads · {teachers.filter(t => t.location === location).length} teachers
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
            <div className={styles.actHeader}>
              <div className={styles.actTabs}>
                {([['enquiries', Bell, 'Enquiries'], ['leads', FileText, 'Leads'], ['teachers', GraduationCap, 'Teachers'], ['applications', ClipboardList, 'Apps']] as const).map(([key, Icon, label]) => (
                  <button key={key} className={`${styles.actTab} ${actTab === key ? styles.actTabActive : ''}`}
                    onClick={() => setActTab(key)}>
                    <Icon size={14} /> {label}
                    <span className={styles.actCount}>
                      {key === 'enquiries' ? filteredEnquiries.length : key === 'leads' ? filteredLeads.length : key === 'teachers' ? filteredTeachers.length : filteredApps.length}
                    </span>
                  </button>
                ))}
              </div>
              <div className={styles.locFilter}>
                <MapPin size={13} />
                <select value={filterLoc} onChange={e => setFilterLoc(e.target.value)}>
                  <option value="all">All</option>
                  {LOCATION_NAMES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {actTab === 'enquiries' && (
              <div className={styles.actList}>
                {filteredEnquiries.length === 0 ? <div className={styles.empty}><Bell size={32} /><p>No enquiries found.</p></div>
                  : filteredEnquiries.map(enq => {
                    const c = LOC_COLORS[enq.area] || '#43e97b'
                    return (
                      <div key={enq._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>{enq.name.charAt(0).toUpperCase()}</div>
                        <div className={styles.actInfo}>
                          <p className={styles.actName}>{enq.name}</p>
                          <p className={styles.actMeta}><Phone size={11} /> {enq.phone} · {enq.studentClass} · {enq.subject}</p>
                          <p className={styles.actMeta}><MapPin size={11} /> {enq.city}, {enq.area}</p>
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

            {actTab === 'leads' && (
              <div className={styles.actList}>
                {filteredLeads.length === 0 ? <div className={styles.empty}><BookOpen size={32} /><p>No leads found.</p></div>
                  : filteredLeads.map(lead => {
                    const c = LOC_COLORS[lead.location] || '#667eea'
                    return (
                      <div key={lead._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>{lead.studentName.charAt(0).toUpperCase()}</div>
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

            {actTab === 'teachers' && (
              <div className={styles.actList}>
                {filteredTeachers.length === 0 ? <div className={styles.empty}><GraduationCap size={32} /><p>No teachers found.</p></div>
                  : filteredTeachers.map(t => {
                    const c = LOC_COLORS[t.location] || '#667eea'
                    return (
                      <div key={t._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>{t.name.charAt(0).toUpperCase()}</div>
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

            {actTab === 'applications' && (
              <div className={styles.actList}>
                {filteredApps.length === 0 ? <div className={styles.empty}><ClipboardList size={32} /><p>No applications found.</p></div>
                  : filteredApps.map(app => {
                    const c = LOC_COLORS[app.location] || '#667eea'
                    const isOpen = expandedApp === app._id
                    return (
                      <div key={app._id} className={styles.actCard} style={{ borderLeftColor: c }}>
                        <div className={styles.appRow} onClick={() => setExpandedApp(isOpen ? null : app._id)}>
                          <div className={styles.actAvatar} style={{ background: c + '18', color: c }}>{app.fullName.charAt(0).toUpperCase()}</div>
                          <div className={styles.actInfo}>
                            <p className={styles.actName}>{app.fullName}</p>
                            <p className={styles.actMeta}><Phone size={11} /> {app.phone} · {app.qualification}</p>
                            <p className={styles.actMeta}>{app.subjects?.join(', ')}</p>
                          </div>
                          <div className={styles.actRight}>
                            <span className={styles.locPill} style={{ background: c + '18', color: c }}>{app.location}</span>
                            <span className={styles.statusPill} style={{ background: (STATUS_COLORS[app.status] || c) + '18', color: STATUS_COLORS[app.status] || c }}>{app.status}</span>
                            <span className={styles.actDate}>{app.createdAt}</span>
                            {isOpen ? <ChevronUp size={14} className={styles.chevron} /> : <ChevronDown size={14} className={styles.chevron} />}
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
                <Plus size={15} /> {showForm ? 'Cancel' : 'Add Sub Admin'}
              </button>
            </div>
            {showForm && (
              <form onSubmit={handleCreate} className={styles.createForm}>
                <h3 className={styles.formTitle}>Create New Sub Admin</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className={styles.formField}>
                    <label>Phone (Login ID)</label>
                    <div className={styles.phoneInput}>
                      <Phone size={15} className={styles.phoneIcon} />
                      <input type="tel" placeholder="10-digit number" value={form.phone} maxLength={10} onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })} required />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Password</label>
                    <div className={styles.pwdInput}>
                      <input type={showPwd ? 'text' : 'password'} placeholder="Set a password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                      <button type="button" onClick={() => setShowPwd(!showPwd)}>{showPwd ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Location</label>
                    <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required>
                      {LOCATION_NAMES.length === 0 ? (
                        <option value="">No locations available</option>
                      ) : (
                        LOCATION_NAMES.map(l => <option key={l} value={l}>{l}</option>)
                      )}
                    </select>
                  </div>
                </div>
                {formError && <p className={styles.formError}>{formError}</p>}
                {formSuccess && <p className={styles.formSuccess}>{formSuccess}</p>}
                <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? 'Creating...' : 'Create Sub Admin'}</button>
              </form>
            )}
            {formSuccess && !showForm && <p className={styles.formSuccess}>{formSuccess}</p>}
            {allLocationGroups.map(({ location, admins, color }) => (
              <div key={location} className={styles.locationGroup}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupDot} style={{ background: color }} />
                  <h3 className={styles.groupTitle}>{location}</h3>
                  <span className={styles.groupCount}>{admins.length}</span>
                  {color === '#888888' && (
                    <span className={styles.orphanedBadge} title="This location is not in the database. Please add it or reassign sub-admins.">
                      ⚠️ Not in DB
                    </span>
                  )}
                </div>
                {admins.length === 0 ? <p className={styles.emptyMsg}>No sub admins yet.</p> : (
                  <div className={styles.adminCards}>
                    {admins.map(sa => (
                      <div key={sa.phone} className={styles.adminCard} style={{ borderLeftColor: color }}>
                        <div className={styles.adminAvatar} style={{ background: color + '22', color }}>{sa.name.charAt(0).toUpperCase()}</div>
                        <div className={styles.adminInfo}>
                          <p className={styles.adminName}>{sa.name}</p>
                          <p className={styles.adminPhone}><Phone size={12} /> {sa.phone}</p>
                          <p className={styles.adminDate}>Created: {sa.createdAt}</p>
                        </div>
                        <div className={styles.adminMeta}>
                          <span className={styles.adminLoc} style={{ background: color + '22', color }}>{sa.location}</span>
                          <button className={styles.editBtn} onClick={() => handleEdit(sa)} title="Edit"><Edit2 size={14} /></button>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(sa.phone)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ── LOCATIONS ── */}
        {activeTab === 'locations' && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Manage Locations</h2>
              <button className={styles.addBtn} onClick={() => { setShowLocationForm(!showLocationForm); setEditingLocation(null); setLocationForm({ name: '', color: '#667eea' }); setLocationError(''); setLocationSuccess('') }}>
                <Plus size={15} /> {showLocationForm ? 'Cancel' : 'Add Location'}
              </button>
            </div>

            {showLocationForm && (
              <form onSubmit={editingLocation ? handleUpdateLocation : handleCreateLocation} className={styles.createForm}>
                <h3 className={styles.formTitle}>{editingLocation ? 'Edit Location' : 'Create New Location'}</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label>Location Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Hauz Khas, Gurgaon"
                      value={locationForm.name}
                      onChange={e => setLocationForm({ ...locationForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label>Color</label>
                    <div className={styles.colorPicker}>
                      <input
                        type="color"
                        value={locationForm.color}
                        onChange={e => setLocationForm({ ...locationForm, color: e.target.value })}
                      />
                      <input
                        type="text"
                        value={locationForm.color}
                        onChange={e => setLocationForm({ ...locationForm, color: e.target.value })}
                        placeholder="#667eea"
                        pattern="^#[0-9A-Fa-f]{6}$"
                      />
                    </div>
                  </div>
                </div>
                {locationError && <p className={styles.formError}>{locationError}</p>}
                {locationSuccess && <p className={styles.formSuccess}>{locationSuccess}</p>}
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={cancelLocationForm}>Cancel</button>
                  <button type="submit" className={styles.submitBtn} disabled={locationLoading}>
                    {locationLoading ? (editingLocation ? 'Updating...' : 'Creating...') : (editingLocation ? 'Update Location' : 'Create Location')}
                  </button>
                </div>
              </form>
            )}

            {locationSuccess && !showLocationForm && <p className={styles.formSuccess}>{locationSuccess}</p>}

            <div className={styles.locationsList}>
              {locations.length === 0 ? (
                <div className={styles.empty}>
                  <MapPin size={32} />
                  <p>No locations yet. Add your first location to get started.</p>
                </div>
              ) : (
                locations.map(loc => (
                  <div key={loc._id} className={styles.locationCard} style={{ borderLeftColor: loc.color }}>
                    <div className={styles.locCardLeft}>
                      <div className={styles.locColorBox} style={{ background: loc.color }} />
                      <div className={styles.locCardInfo}>
                        <p className={styles.locCardName}>{loc.name}</p>
                        <p className={styles.locCardMeta}>
                          {subAdmins.filter(s => s.location === loc.name).length} sub admin(s) · 
                          {leads.filter(l => l.location === loc.name).length} leads · 
                          {teachers.filter(t => t.location === loc.name).length} teachers
                        </p>
                        <p className={styles.locCardDate}>Created: {loc.createdAt}</p>
                      </div>
                    </div>
                    <div className={styles.locCardActions}>
                      <span className={`${styles.locStatusBadge} ${loc.active ? styles.active : styles.inactive}`}>
                        {loc.active ? 'Active' : 'Inactive'}
                      </span>
                      <button className={styles.editBtn} onClick={() => handleEditLocation(loc)} title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteLocation(loc._id)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>

      {/* Edit Modal */}
      {showEditForm && editingSubAdmin && (
        <div className={styles.modalOverlay} onClick={() => setShowEditForm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Edit Sub Admin</h3>
              <button className={styles.modalClose} onClick={() => setShowEditForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleUpdate} className={styles.editForm}>
              <div className={styles.formField}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formField}>
                <label>Phone Number (Login ID)</label>
                <div className={styles.phoneInput}>
                  <Phone size={15} className={styles.phoneIcon} />
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={editForm.newPhone}
                    maxLength={10}
                    onChange={e => setEditForm({ ...editForm, newPhone: e.target.value.replace(/\D/g, '') })}
                    required
                  />
                </div>
                <small className={styles.fieldHint}>Current: {editForm.oldPhone}</small>
              </div>
              <div className={styles.formField}>
                <label>New Password (leave blank to keep current)</label>
                <div className={styles.pwdInput}>
                  <input
                    type={editShowPwd ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={editForm.password}
                    onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                  />
                  <button type="button" onClick={() => setEditShowPwd(!editShowPwd)}>
                    {editShowPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className={styles.formField}>
                <label>Location</label>
                <select value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} required>
                  {LOCATION_NAMES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              {editError && <p className={styles.formError}>{editError}</p>}
              {editSuccess && <p className={styles.formSuccess}>{editSuccess}</p>}
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowEditForm(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn} disabled={editLoading}>
                  {editLoading ? 'Updating...' : 'Update Sub Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
