import mongoose, { Schema, models } from 'mongoose'

// ── Sub Admin ──
const SubAdminSchema = new Schema({
  phone:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  name:      { type: String, required: true },
  location:  { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
})

// ── Teacher ──
const TeacherSchema = new Schema({
  phone:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  name:      { type: String, required: true },
  subject:   { type: String, required: true },
  location:  { type: String, required: true },
  createdBy: { type: String, required: true }, // sub-admin phone
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
})

// ── Lead ──
const LeadSchema = new Schema({
  studentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  class:       { type: String, required: true },
  subject:     { type: String, required: true },
  address:     { type: String, required: true },
  note:        { type: String, default: '' },
  location:    { type: String, required: true },
  status:      { type: String, default: 'new', enum: ['new', 'contacted', 'assigned', 'closed'] },
  createdBy:   { type: String, required: true }, // sub-admin phone
  createdAt:   { type: String, default: () => new Date().toISOString().split('T')[0] },
})

export const SubAdmin = models.SubAdmin || mongoose.model('SubAdmin', SubAdminSchema)
export const Teacher  = models.Teacher  || mongoose.model('Teacher',  TeacherSchema)
export const Lead     = models.Lead     || mongoose.model('Lead',      LeadSchema)
