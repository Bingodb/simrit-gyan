import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { StudentEnquiry } from '@/lib/models'

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
  // Match by area (the location field students pick)
  const enquiries = await StudentEnquiry.find({ area: sub.location }).sort({ _id: -1 }).lean()
  return NextResponse.json(enquiries)
}

export async function PATCH(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, status } = await req.json()
  await connectDB()
  await StudentEnquiry.updateOne({ _id: id, area: sub.location }, { $set: { status } })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await connectDB()
  await StudentEnquiry.deleteOne({ _id: id, area: sub.location })
  return NextResponse.json({ ok: true })
}
