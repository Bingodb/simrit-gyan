import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { GalleryImage } from '@/lib/models'

async function getSubSession() {
  const cookieStore = await cookies()
  const raw = cookieStore.get('sg_sub_session')?.value
  if (!raw) return null
  try { return JSON.parse(Buffer.from(raw, 'base64').toString('utf-8')) } catch { return null }
}

// GET all gallery images (public — no auth needed)
export async function GET() {
  await connectDB()
  const images = await GalleryImage.find().sort({ _id: -1 }).lean()
  return NextResponse.json(images)
}

// POST upload a new image
export async function POST(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { url, caption, size } = await req.json()
  if (!url) return NextResponse.json({ error: 'No image data' }, { status: 400 })
  await connectDB()
  const img = await GalleryImage.create({
    url, caption: caption || '', size: size || 1,
    uploadedBy: sub.phone, location: sub.location,
  })
  return NextResponse.json(img)
}

// PATCH update size or caption
export async function PATCH(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, size, caption } = await req.json()
  await connectDB()
  const update: Record<string, unknown> = {}
  if (size !== undefined) update.size = size
  if (caption !== undefined) update.caption = caption
  await GalleryImage.updateOne({ _id: id, uploadedBy: sub.phone }, { $set: update })
  return NextResponse.json({ ok: true })
}

// DELETE remove an image
export async function DELETE(req: Request) {
  const sub = await getSubSession()
  if (!sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await connectDB()
  await GalleryImage.deleteOne({ _id: id, uploadedBy: sub.phone })
  return NextResponse.json({ ok: true })
}
