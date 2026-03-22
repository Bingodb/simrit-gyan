import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { StudentEnquiry } from '@/lib/models'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, studentClass, subject, city, area, message } = body

    if (!name || !phone || !studentClass || !subject || !city || !area)
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })

    if (!/^\d{10}$/.test(phone))
      return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })

    await connectDB()
    const enquiry = await StudentEnquiry.create({ name, phone, studentClass, subject, city, area, message: message || '' })
    return NextResponse.json({ ok: true, id: enquiry._id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
