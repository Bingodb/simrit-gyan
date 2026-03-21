import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

const SubAdminSchema = new mongoose.Schema({
  phone:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  name:      { type: String, required: true },
  location:  { type: String, required: true },
  createdAt: { type: String },
})

const SubAdmin = mongoose.models.SubAdmin || mongoose.model('SubAdmin', SubAdminSchema)

const subAdmins = [
  { phone: '9810000001', password: 'HauzKhas@123',   location: 'Hauz Khas',       name: 'Hauz Khas Admin',    createdAt: '2026-03-22' },
  { phone: '9810000002', password: 'Gurgaon@123',    location: 'Gurgaon',         name: 'Gurgaon Admin',      createdAt: '2026-03-22' },
  { phone: '9810000003', password: 'Connaught@123',  location: 'Connaught Place', name: 'CP Admin',           createdAt: '2026-03-22' },
  { phone: '9810000004', password: 'UttamNagar@123', location: 'Uttam Nagar',     name: 'Uttam Nagar Admin',  createdAt: '2026-03-22' },
]

await mongoose.connect(MONGODB_URI)
console.log('Connected to MongoDB')

for (const sa of subAdmins) {
  await SubAdmin.updateOne({ phone: sa.phone }, { $setOnInsert: sa }, { upsert: true })
  console.log(`✓ ${sa.name} (${sa.phone})`)
}

console.log('Seed complete')
await mongoose.disconnect()
