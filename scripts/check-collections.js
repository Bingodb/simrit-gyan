/**
 * Check Database Collections
 * Lists all collections and their document counts
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

async function checkCollections() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    
    console.log('📚 Collections in database:')
    console.log('════════════════════════════════════════════════════════\n')
    
    for (const coll of collections) {
      const collection = db.collection(coll.name)
      const count = await collection.countDocuments()
      console.log(`   ${coll.name}: ${count} document${count === 1 ? '' : 's'}`)
      
      // Show sample location values for relevant collections
      if (count > 0 && ['leads', 'studentenquiries', 'teachers', 'tutorapplications'].includes(coll.name)) {
        const samples = await collection.find({}).limit(3).toArray()
        const locationField = coll.name === 'studentenquiries' ? 'area' : 'location'
        const locations = samples.map(s => s[locationField]).filter(Boolean)
        if (locations.length > 0) {
          console.log(`      Sample locations: ${locations.join(', ')}`)
        }
      }
    }
    
    console.log('\n════════════════════════════════════════════════════════\n')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

checkCollections()
