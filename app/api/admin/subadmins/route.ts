import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { SubAdmin } from '@/lib/models'

const ADMIN_SECRET = 'sg-admin-secret-2026'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('sg_admin_session')?.value === ADMIN_SECRET
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const list = await SubAdmin.find({}).lean()
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { phone, password, location, name } = await req.json()

  if (!phone || !password || !location || !name)
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  if (!/^\d{10}$/.test(phone))
    return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })

  await connectDB()
  const exists = await SubAdmin.findOne({ phone })
  if (exists) return NextResponse.json({ error: 'Phone number already registered' }, { status: 409 })

  const sub = await SubAdmin.create({ phone, password, location, name })
  return NextResponse.json({ ok: true, sub })
}

export async function PUT(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { oldPhone, newPhone, password, name, location } = await req.json()

  if (!oldPhone) return NextResponse.json({ error: 'Old phone required' }, { status: 400 })
  
  await connectDB()
  const subAdmin = await SubAdmin.findOne({ phone: oldPhone })
  if (!subAdmin) return NextResponse.json({ error: 'Sub admin not found' }, { status: 404 })

  // Update fields
  if (newPhone && newPhone !== oldPhone) {
    if (!/^\d{10}$/.test(newPhone))
      return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })
    
    const exists = await SubAdmin.findOne({ phone: newPhone })
    if (exists) return NextResponse.json({ error: 'New phone number already exists' }, { status: 409 })
    
    subAdmin.phone = newPhone
  }
  
  if (password) subAdmin.password = password
  if (name) subAdmin.name = name
  if (location) subAdmin.location = location

  await subAdmin.save()
  return NextResponse.json({ ok: true, subAdmin })
}

export async function DELETE(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { phone } = await req.json()
  await connectDB()
  await SubAdmin.deleteOne({ phone })
  return NextResponse.json({ ok: true })
}
