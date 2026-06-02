/**
 * Check Leads in Detail
 * Shows all leads from all possible collections
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

async function checkLeads() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db
    
    // Check main leads collection
    console.log('📍 LEADS COLLECTION')
    console.log('════════════════════════════════════════════════════════')
    const leads = await db.collection('leads').find({}).toArray()
    console.log(`Found ${leads.length} leads\n`)
    if (leads.length > 0) {
      leads.forEach((lead, i) => {
        console.log(`${i + 1}. ${lead.studentName} - Location: "${lead.location}" - Phone: ${lead.parentPhone}`)
      })
    }
    
    // Check student enquiries (sometimes displayed as leads)
    console.log('\n📍 STUDENT ENQUIRIES (might show in leads)')
    console.log('════════════════════════════════════════════════════════')
    const enquiries = await db.collection('studentenquiries').find({}).toArray()
    console.log(`Found ${enquiries.length} enquiries\n`)
    if (enquiries.length > 0) {
      const distribution = {}
      enquiries.forEach(e => {
        distribution[e.area] = (distribution[e.area] || 0) + 1
      })
      console.log('Distribution by area/location:')
      Object.entries(distribution).sort((a, b) => b[1] - a[1]).forEach(([loc, count]) => {
        console.log(`   ${loc}: ${count}`)
      })
      
      console.log('\nSample enquiries:')
      enquiries.slice(0, 5).forEach((enq, i) => {
        console.log(`${i + 1}. ${enq.name} - Area: "${enq.area}" - Phone: ${enq.phone} - Class: ${enq.studentClass}`)
      })
    }
    
    console.log('\n════════════════════════════════════════════════════════\n')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

checkLeads()
