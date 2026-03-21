import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { SubAdmin } from '@/lib/models'

export async function POST(req: Request) {
  const { phone, password } = await req.json()
  await connectDB()
  const sub = await SubAdmin.findOne({ phone, password }).lean() as { phone: string; name: string; location: string } | null

  if (!sub) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const payload = Buffer.from(JSON.stringify({ phone: sub.phone, location: sub.location, name: sub.name })).toString('base64')
  const cookieStore = await cookies()
  cookieStore.set('sg_sub_session', payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return NextResponse.json({ ok: true })
}
