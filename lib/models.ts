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
  createdBy: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
})

// ── Student Lead ──
const LeadSchema = new Schema({
  studentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  class:       { type: String, required: true },
  subject:     { type: String, required: true },
  address:     { type: String, required: true },
  note:        { type: String, default: '' },
  location:    { type: String, required: true },
  status:      { type: String, default: 'new', enum: ['new', 'contacted', 'assigned', 'closed'] },
  createdBy:   { type: String, required: true },
  createdAt:   { type: String, default: () => new Date().toISOString().split('T')[0] },
})

// ── Tutor Application (from public Join as Tutor form) ──
const TutorApplicationSchema = new Schema({
  // Personal
  fullName:      { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, required: true },
  address:       { type: String, required: true },
  location:      { type: String, required: true }, // which area they applied for
  // Education
  qualification: { type: String, required: true },
  fieldOfStudy:  { type: String, required: true },
  // Teaching
  experience:    { type: String, required: true },
  preferredClass:{ type: String, required: true },
  subjects:      { type: [String], default: [] },
  prevExperience:{ type: String, default: '' },
  // Availability
  teachingMode:  { type: String, required: true },
  hoursPerWeek:  { type: String, required: true },
  timeSlots:     { type: [String], default: [] },
  // Extra
  motivation:    { type: String, required: true },
  hourlyRate:    { type: String, default: '' },
  // Uploaded document filenames
  docNames: {
    resume:       { type: [String], default: [] },
    certificates: { type: [String], default: [] },
    photo:        { type: String, default: '' },
    idproof:      { type: String, default: '' },
  },
  // Status
  status:        { type: String, default: 'pending', enum: ['pending', 'reviewed', 'approved', 'rejected'] },
  createdAt:     { type: String, default: () => new Date().toISOString().split('T')[0] },
})

export const SubAdmin          = models.SubAdmin          || mongoose.model('SubAdmin',          SubAdminSchema)
export const Teacher           = models.Teacher           || mongoose.model('Teacher',           TeacherSchema)
export const Lead              = models.Lead              || mongoose.model('Lead',              LeadSchema)
export const TutorApplication  = models.TutorApplication  || mongoose.model('TutorApplication',  TutorApplicationSchema)

// ── Student Enquiry (from public "Need a Tutor" form) ──
const StudentEnquirySchema = new Schema({
  name:      { type: String, required: true },
  phone:     { type: String, required: true },
  studentClass: { type: String, required: true },
  subject:   { type: String, required: true },
  city:      { type: String, required: true },
  area:      { type: String, required: true },  // maps to location for sub-admin routing
  message:   { type: String, default: '' },
  status:    { type: String, default: 'new', enum: ['new', 'contacted', 'assigned', 'closed'] },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
})

export const StudentEnquiry = models.StudentEnquiry || mongoose.model('StudentEnquiry', StudentEnquirySchema)

// ── Gallery Image ──
const GalleryImageSchema = new Schema({
  url:        { type: String, required: true },  // base64 data URL
  caption:    { type: String, default: '' },
  size:       { type: Number, default: 1 },      // 1 = normal, 2 = wide (2 cols), 0.5 = small
  uploadedBy: { type: String, required: true },  // subadmin phone
  location:   { type: String, required: true },  // subadmin location
  createdAt:  { type: String, default: () => new Date().toISOString().split('T')[0] },
})

export const GalleryImage = models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema)
