/**
 * Fix Orphaned Sub-Admin Script
 * 
 * This script reassigns the sub-admin from "DELHI" location to a valid location.
 * Based on the check, there's 1 sub-admin (Chetan - 7053015044) assigned to "DELHI".
 * 
 * Run with: node scripts/fix-orphaned-subadmin.js
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

async function fixOrphanedSubAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db
    const subAdmins = db.collection('subadmins')

    // Find sub-admins with "DELHI" location
    const orphaned = await subAdmins.find({ location: 'DELHI' }).toArray()
    
    if (orphaned.length === 0) {
      console.log('✅ No orphaned sub-admins found!')
      return
    }

    console.log(`Found ${orphaned.length} sub-admin(s) with invalid location "DELHI":`)
    orphaned.forEach(sa => {
      console.log(`   - ${sa.name} (${sa.phone})`)
    })

    console.log('\n🔄 Reassigning to "Connaught Place"...')
    
    const result = await subAdmins.updateMany(
      { location: 'DELHI' },
      { $set: { location: 'Connaught Place' } }
    )

    console.log(`✅ Updated ${result.modifiedCount} sub-admin(s)`)
    console.log('\n✨ All sub-admins now have valid locations!\n')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

fixOrphanedSubAdmin()
