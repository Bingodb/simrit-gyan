import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { TutorApplication } from '@/lib/models'

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  return `data:${file.type};base64,${base64}`
}

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

    let subjects: string[] = []
    let timeSlots: string[] = []
    try { subjects = JSON.parse(get('subjects')) } catch { subjects = [] }
    try { timeSlots = JSON.parse(get('timeSlots')) } catch { timeSlots = [] }

    const resumeFiles = fd.getAll('resume') as File[]
    const certFiles = fd.getAll('certificates') as File[]
    const photoFile = fd.get('photo') as File | null
    const idproofFile = fd.get('idproof') as File | null

    const docNames = {
      resume:       await Promise.all(resumeFiles.map(fileToBase64)),
      certificates: await Promise.all(certFiles.map(fileToBase64)),
      photo:        photoFile ? await fileToBase64(photoFile) : '',
      idproof:      idproofFile ? await fileToBase64(idproofFile) : '',
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Tutor application error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
