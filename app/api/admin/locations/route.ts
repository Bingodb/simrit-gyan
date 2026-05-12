import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Location } from '@/lib/models'

const ADMIN_SECRET = 'sg-admin-secret-2026'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('sg_admin_session')?.value === ADMIN_SECRET
}

// GET - Fetch all locations
export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const locations = await Location.find({}).sort({ createdAt: -1 }).lean()
  return NextResponse.json(locations)
}

// POST - Create new location
export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { name, color } = await req.json()

  if (!name || !name.trim())
    return NextResponse.json({ error: 'Location name is required' }, { status: 400 })

  await connectDB()
  const exists = await Location.findOne({ name: name.trim() })
  if (exists) return NextResponse.json({ error: 'Location already exists' }, { status: 409 })

  const location = await Location.create({
    name: name.trim(),
    color: color || '#667eea',
    active: true
  })
  return NextResponse.json({ ok: true, location })
}

// PUT - Update location
export async function PUT(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, name, color, active } = await req.json()

  if (!id) return NextResponse.json({ error: 'Location ID required' }, { status: 400 })

  await connectDB()
  const location = await Location.findById(id)
  if (!location) return NextResponse.json({ error: 'Location not found' }, { status: 404 })

  if (name && name.trim()) {
    const exists = await Location.findOne({ name: name.trim(), _id: { $ne: id } })
    if (exists) return NextResponse.json({ error: 'Location name already exists' }, { status: 409 })
    location.name = name.trim()
  }
  
  if (color) location.color = color
  if (typeof active === 'boolean') location.active = active

  await location.save()
  return NextResponse.json({ ok: true, location })
}

// DELETE - Delete location
export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  
  if (!id) return NextResponse.json({ error: 'Location ID required' }, { status: 400 })
  
  await connectDB()
  await Location.deleteOne({ _id: id })
  return NextResponse.json({ ok: true })
}
