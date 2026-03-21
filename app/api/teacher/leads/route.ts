import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models'

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sg_teacher_session')?.value
  if (!raw) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { location } = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'))
    await connectDB()
    const leads = await Lead.find({ location }).sort({ _id: -1 }).lean()
    return NextResponse.json(leads)
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
  }
}
