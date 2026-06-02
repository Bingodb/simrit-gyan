import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Lead, Teacher, TutorApplication, StudentEnquiry, SubAdmin } from '@/lib/models'

const ADMIN_SECRET = 'sg-admin-secret-2026'

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get('sg_admin_session')?.value !== ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()

  // Fetch all data
  const [leads, teachers, applications, enquiries, subAdmins] = await Promise.all([
    Lead.find({}).sort({ _id: -1 }).lean(),
    Teacher.find({}).sort({ _id: -1 }).lean(),
    TutorApplication.find({}).sort({ _id: -1 }).lean(),
    StudentEnquiry.find({}).sort({ _id: -1 }).lean(),
    SubAdmin.find({}).select('location name phone').lean(),
  ])

  // Group data by location/sub-admin
  const byLocation: Record<string, any> = {}

  // Get unique locations from sub-admins
  const locations = Array.from(new Set(subAdmins.map(sa => sa.location)))

  locations.forEach(location => {
    const locationSubAdmins = subAdmins.filter(sa => sa.location === location)
    
    byLocation[location] = {
      location,
      subAdmins: locationSubAdmins,
      leads: leads.filter(l => l.location === location),
      teachers: teachers.filter(t => t.location === location),
      applications: applications.filter(a => a.location === location),
      enquiries: enquiries.filter(e => e.area === location), // area maps to location
      counts: {
        leads: leads.filter(l => l.location === location).length,
        teachers: teachers.filter(t => t.location === location).length,
        applications: applications.filter(a => a.location === location).length,
        enquiries: enquiries.filter(e => e.area === location).length,
      }
    }
  })

  // Also return totals for backward compatibility
  return NextResponse.json({ 
    leads, 
    teachers, 
    applications, 
    enquiries,
    byLocation, // New: organized by location
    summary: {
      totalLeads: leads.length,
      totalTeachers: teachers.length,
      totalApplications: applications.length,
      totalEnquiries: enquiries.length,
    }
  })
}
