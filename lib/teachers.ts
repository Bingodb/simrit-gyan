import fs from 'fs'
import path from 'path'

export type Teacher = {
  phone: string
  password: string
  name: string
  location: string
  subject: string
  createdAt: string
  createdBy: string // sub-admin phone
}

export type Lead = {
  id: string
  studentName: string
  parentPhone: string
  class: string
  subject: string
  address: string
  location: string
  status: 'new' | 'contacted' | 'assigned' | 'closed'
  createdAt: string
  createdBy: string // sub-admin phone
  note: string
}

const T_FILE = path.join(process.cwd(), 'data', 'teachers.json')
const L_FILE = path.join(process.cwd(), 'data', 'leads.json')

function ensure(file: string) {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]')
}

export function getTeachers(): Teacher[] {
  ensure(T_FILE)
  return JSON.parse(fs.readFileSync(T_FILE, 'utf-8'))
}

export function saveTeachers(list: Teacher[]) {
  ensure(T_FILE)
  fs.writeFileSync(T_FILE, JSON.stringify(list, null, 2))
}

export function findTeacher(phone: string, password: string): Teacher | null {
  return getTeachers().find(t => t.phone === phone && t.password === password) ?? null
}

export function getLeads(): Lead[] {
  ensure(L_FILE)
  return JSON.parse(fs.readFileSync(L_FILE, 'utf-8'))
}

export function saveLeads(list: Lead[]) {
  ensure(L_FILE)
  fs.writeFileSync(L_FILE, JSON.stringify(list, null, 2))
}
