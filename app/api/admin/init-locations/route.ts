import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Location } from '@/lib/models'

const ADMIN_SECRET = 'sg-admin-secret-2026'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('sg_admin_session')?.value === ADMIN_SECRET
}

// POST - Initialize default locations if none exist
export async function POST() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  
  const count = await Location.countDocuments()
  if (count > 0) {
    return NextResponse.json({ message: 'Locations already exist', count })
  }

  const defaultLocations = [
    { name: 'DELHI', color: '#ec0e0e', active: true },
    { name: 'South Delhi', color: '#eb15ef', active: true },
    { name: 'South West Delhi', color: '#ff570f', active: true },
    { name: 'Central Delhi', color: '#00ffaa', active: true },
    { name: 'Gurgaon', color: '#00ff62', active: true },
  ]

  await Location.insertMany(defaultLocations)
  
  return NextResponse.json({ 
    message: 'Default locations initialized', 
    count: defaultLocations.length 
  })
}
