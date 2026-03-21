import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { Teacher } from '@/lib/models'

export async function POST(req: Request) {
  const { phone, password } = await req.json()
  await connectDB()
  const teacher = await Teacher.findOne({ phone, password }).lean() as { phone: string; name: string; location: string; subject: string } | null

  if (!teacher) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const payload = Buffer.from(JSON.stringify({
    phone: teacher.phone, name: teacher.name,
    location: teacher.location, subject: teacher.subject,
  })).toString('base64')

  const cookieStore = await cookies()
  cookieStore.set('sg_teacher_session', payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return NextResponse.json({ ok: true })
}
