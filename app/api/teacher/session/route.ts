import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sg_teacher_session')?.value
  if (!raw) return NextResponse.json({}, { status: 401 })
  try {
    return NextResponse.json(JSON.parse(Buffer.from(raw, 'base64').toString('utf-8')))
  } catch {
    return NextResponse.json({}, { status: 400 })
  }
}
