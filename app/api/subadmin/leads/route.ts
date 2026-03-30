import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models'

async function getSubSession() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sg_sub_session')?.value
  if (!raw) return null
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf-8')) } catch { return null }
}

export async function GET() {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const leads = await Lead.find({ location: sub.location }).sort({ _id: -1 }).lean()
  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { studentName, parentPhone, studentClass, subject, address, note } = await req.json()
  if (!studentName || !parentPhone || !studentClass || !subject || !address)
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })

  await connectDB()

  // Prevent duplicate — same phone in same location
  const existing = await Lead.findOne({ parentPhone, location: sub.location })
  if (existing) return NextResponse.json({ error: 'duplicate' }, { status: 409 })

  const lead = await Lead.create({
    studentName, parentPhone, class: studentClass,
    subject, address, note: note || '',
    location: sub.location, createdBy: sub.phone,
  })
  return NextResponse.json({ ok: true, lead })
}

export async function DELETE(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await connectDB()
  await Lead.deleteOne({ _id: id, location: sub.location })
  return NextResponse.json({ ok: true })
}
