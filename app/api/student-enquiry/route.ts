import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { StudentEnquiry } from '@/lib/models'
import { getLocationForArea } from '@/lib/area-mapping'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, studentClass, subject, city, area, message } = body

    if (!name || !phone || !studentClass || !subject || !city || !area)
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })

    if (!/^\d{10}$/.test(phone))
      return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })

    await connectDB()
    
    // Map the area to the correct location/sub-admin
    const mappedArea = getLocationForArea(area)
    
    // Check for duplicate submissions (same phone within last 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000)
    const recentEnquiry = await StudentEnquiry.findOne({
      phone,
      createdAt: { $gte: twoMinutesAgo }
    })
    
    if (recentEnquiry) {
      // Return success but don't create duplicate
      console.log('Duplicate submission prevented for phone:', phone)
      return NextResponse.json({ ok: true, id: recentEnquiry._id, duplicate: true })
    }
    
    const enquiry = await StudentEnquiry.create({ 
      name, 
      phone, 
      studentClass, 
      subject, 
      city, 
      area: mappedArea, // Use mapped location instead of raw area
      message: message || '' 
    })
    
    return NextResponse.json({ ok: true, id: enquiry._id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
