import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Location } from '@/lib/models'

// GET - Fetch all active locations (public endpoint)
export async function GET() {
  try {
    await connectDB()
    const locations = await Location.find({ active: true }).select('name color active').sort({ name: 1 }).lean()
    return NextResponse.json(locations)
  } catch (error) {
    console.error('Error fetching locations:', error)
    // Return default locations as fallback
    return NextResponse.json([
      { name: 'DELHI', color: '#ec0e0e', active: true },
      { name: 'South Delhi', color: '#eb15ef', active: true },
      { name: 'South West Delhi', color: '#ff570f', active: true },
      { name: 'Central Delhi', color: '#00ffaa', active: true },
      { name: 'Gurgaon', color: '#00ff62', active: true },
    ])
  }
}
