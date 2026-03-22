import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { TutorApplication } from '@/lib/models'

export async function POST(req: Request) {
  try {
    const fd = await req.formData()

    const get = (key: string) => (fd.get(key) as string) || ''

    const required = ['fullName', 'email', 'phone', 'address', 'location',
      'qualification', 'fieldOfStudy', 'experience', 'preferredClass',
      'teachingMode', 'hoursPerWeek', 'motivation']

    for (const field of required) {
      if (!get(field)) return NextResponse.json({ error: `${field} is required` }, { status: 400 })
    }

    // Parse JSON arrays sent as strings
    let subjects: string[] = []
    let timeSlots: string[] = []
    try { subjects = JSON.parse(get('subjects')) } catch { subjects = [] }
    try { timeSlots = JSON.parse(get('timeSlots')) } catch { timeSlots = [] }

    // Collect uploaded file names (we store names only — no file storage service needed for now)
    const resumeFiles = fd.getAll('resume') as File[]
    const certFiles = fd.getAll('certificates') as File[]
    const photoFile = fd.get('photo') as File | null
    const idproofFile = fd.get('idproof') as File | null

    const docNames = {
      resume: resumeFiles.map(f => f.name),
      certificates: certFiles.map(f => f.name),
      photo: photoFile?.name || '',
      idproof: idproofFile?.name || '',
    }

    await connectDB()
    const app = await TutorApplication.create({
      fullName:      get('fullName'),
      email:         get('email'),
      phone:         get('phone'),
      address:       get('address'),
      location:      get('location'),
      qualification: get('qualification'),
      fieldOfStudy:  get('fieldOfStudy'),
      experience:    get('experience'),
      preferredClass:get('preferredClass'),
      prevExperience:get('prevExperience'),
      teachingMode:  get('teachingMode'),
      hoursPerWeek:  get('hoursPerWeek'),
      motivation:    get('motivation'),
      hourlyRate:    get('hourlyRate'),
      subjects,
      timeSlots,
      docNames,
    })

    return NextResponse.json({ ok: true, id: app._id })
  } catch (err) {
    console.error('Tutor application error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
