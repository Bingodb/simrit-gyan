import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sg_sub_session')?.value
  if (!raw) return NextResponse.json({}, { status: 401 })

  try {
    const data = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({}, { status: 400 })
  }
}
