import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Lead, Teacher, TutorApplication, StudentEnquiry } from '@/lib/models'

const ADMIN_SECRET = 'sg-admin-secret-2026'

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get('sg_admin_session')?.value !== ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()

  const [leads, teachers, applications, enquiries] = await Promise.all([
    Lead.find({}).sort({ _id: -1 }).lean(),
    Teacher.find({}).sort({ _id: -1 }).lean(),
    TutorApplication.find({}).sort({ _id: -1 }).lean(),
    StudentEnquiry.find({}).sort({ _id: -1 }).lean(),
  ])

  return NextResponse.json({ leads, teachers, applications, enquiries })
}
