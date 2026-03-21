import fs from 'fs'
import path from 'path'

export type SubAdmin = {
  phone: string      // used as login ID
  password: string
  location: string
  name: string
  createdAt: string
}

const FILE = path.join(process.cwd(), 'data', 'subadmins.json')

function ensureFile() {
  const dir = path.dirname(FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]')
}

export function getSubAdmins(): SubAdmin[] {
  ensureFile()
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
}

export function saveSubAdmins(list: SubAdmin[]) {
  ensureFile()
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2))
}

export function findSubAdmin(phone: string, password: string): SubAdmin | null {
  const list = getSubAdmins()
  return list.find((s) => s.phone === phone && s.password === password) ?? null
}
