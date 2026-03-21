import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_ID = 'simritgyan'
const ADMIN_PASSWORD = 'SIMRITGYAN'
const SESSION_TOKEN = 'sg_admin_session'
const SECRET = 'sg-admin-secret-2026'

export async function POST(req: Request) {
  const { id, password } = await req.json()

  if (id !== ADMIN_ID || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_TOKEN, SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })

  return NextResponse.json({ ok: true })
}
