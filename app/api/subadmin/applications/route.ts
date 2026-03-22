import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { TutorApplication } from '@/lib/models'

async function getSubSession() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sg_sub_session')?.value
  if (!raw) return null
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf-8')) } catch { return null }
}

// GET — list applications for sub-admin's location
export async function GET() {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const apps = await TutorApplication.find({ location: sub.location }).sort({ _id: -1 }).lean()
  return NextResponse.json(apps)
}

// PATCH — update application status
export async function PATCH(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, status } = await req.json()
  await connectDB()
  await TutorApplication.updateOne({ _id: id, location: sub.location }, { $set: { status } })
  return NextResponse.json({ ok: true })
}

// DELETE — remove application
export async function DELETE(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await connectDB()
  await TutorApplication.deleteOne({ _id: id, location: sub.location })
  return NextResponse.json({ ok: true })
}
