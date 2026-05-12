import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Location } from '@/lib/models'

// GET - Fetch all active locations (public endpoint)
export async function GET() {
  try {
    await connectDB()
    const locations = await Location.find({ active: true }).select('name color').sort({ name: 1 }).lean()
    return NextResponse.json(locations)
  } catch (error) {
    console.error('Error fetching locations:', error)
    // Return default locations as fallback
    return NextResponse.json([
      { name: 'Hauz Khas', color: '#667eea' },
      { name: 'Gurgaon', color: '#43e97b' },
      { name: 'Connaught Place', color: '#f7971e' },
      { name: 'Uttam Nagar', color: '#f093fb' },
    ])
  }
}
