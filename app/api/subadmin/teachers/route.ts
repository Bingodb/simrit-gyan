import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Teacher } from '@/lib/models'

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
  const teachers = await Teacher.find({ location: sub.location }).lean()
  return NextResponse.json(teachers)
}

export async function POST(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { phone, password, name, subject } = await req.json()
  if (!phone || !password || !name || !subject)
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  if (!/^\d{10}$/.test(phone))
    return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })

  await connectDB()
  const exists = await Teacher.findOne({ phone })
  if (exists) return NextResponse.json({ error: 'Phone already registered' }, { status: 409 })

  const teacher = await Teacher.create({ phone, password, name, subject, location: sub.location, createdBy: sub.phone })
  return NextResponse.json({ ok: true, teacher })
}

export async function DELETE(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { phone } = await req.json()
  await connectDB()
  await Teacher.deleteOne({ phone, location: sub.location })
  return NextResponse.json({ ok: true })
}
