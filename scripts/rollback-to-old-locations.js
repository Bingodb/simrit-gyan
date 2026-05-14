/**
 * Rollback Script: Restore Old Location Names
 * 
 * This script rolls back the migration and restores old location names.
 * 
 * NEW NAMES → OLD NAMES:
 * - Hauz Khas → South Delhi
 * - Uttam Nagar → South West Delhi
 * - Rajinder Nagar → Central Delhi
 * - Connaught Place → DELHI
 * - Gurgaon → Gurgaon (unchanged)
 * 
 * Run with: node scripts/rollback-to-old-locations.js
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

// Rollback mapping (new → old)
const ROLLBACK_MAPPING = {
  'Hauz Khas': 'South Delhi',
  'Uttam Nagar': 'South West Delhi',
  'Rajinder Nagar': 'Central Delhi',
  'Connaught Place': 'DELHI',
  'Gurgaon': 'Gurgaon', // unchanged
}

// Old location colors (from your screenshot)
const OLD_LOCATIONS = [
  { name: 'DELHI', color: '#ec0e0e', active: true },
  { name: 'South Delhi', color: '#eb15ef', active: true },
  { name: 'South West Delhi', color: '#ff570f', active: true },
  { name: 'Central Delhi', color: '#00ffaa', active: true },
  { name: 'Gurgaon', color: '#00ff62', active: true },
]

async function rollbackLocations() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db

    const collections = {
      locations: db.collection('locations'),
      subadmins: db.collection('subadmins'),
      teachers: db.collection('teachers'),
      leads: db.collection('leads'),
      tutorapplications: db.collection('tutorapplications'),
      studentenquiries: db.collection('studentenquiries'),
    }

    console.log('📊 Current Database State:')
    console.log('─────────────────────────────────────')
    
    const currentLocations = await collections.locations.find({}).toArray()
    console.log('\n📍 Current Locations:')
    currentLocations.forEach(loc => {
      console.log(`   - ${loc.name} (${loc.color})`)
    })

    console.log('\n👥 Sub-Admins by Location:')
    const subAdminCounts = await collections.subadmins.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]).toArray()
    subAdminCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n\n🔄 Starting Rollback...')
    console.log('─────────────────────────────────────\n')

    let totalUpdates = 0

    // Step 1: Rollback location names
    console.log('🔄 Step 1: Rolling back location names...')
    for (const [newName, oldName] of Object.entries(ROLLBACK_MAPPING)) {
      if (newName === oldName) {
        console.log(`⏭️  Skipping "${newName}" (no change needed)`)
        continue
      }

      console.log(`\n🔄 Rolling back: "${newName}" → "${oldName}"`)

      // Update Location collection
      const locResult = await collections.locations.updateMany(
        { name: newName },
        { $set: { name: oldName } }
      )
      console.log(`   📍 Locations: ${locResult.modifiedCount} updated`)
      totalUpdates += locResult.modifiedCount

      // Update SubAdmin collection
      const subAdminResult = await collections.subadmins.updateMany(
        { location: newName },
        { $set: { location: oldName } }
      )
      console.log(`   👥 Sub-Admins: ${subAdminResult.modifiedCount} updated`)
      totalUpdates += subAdminResult.modifiedCount

      // Update Teacher collection
      const teacherResult = await collections.teachers.updateMany(
        { location: newName },
        { $set: { location: oldName } }
      )
      console.log(`   👨‍🏫 Teachers: ${teacherResult.modifiedCount} updated`)
      totalUpdates += teacherResult.modifiedCount

      // Update Lead collection
      const leadResult = await collections.leads.updateMany(
        { location: newName },
        { $set: { location: oldName } }
      )
      console.log(`   📝 Leads: ${leadResult.modifiedCount} updated`)
      totalUpdates += leadResult.modifiedCount

      // Update TutorApplication collection
      const appResult = await collections.tutorapplications.updateMany(
        { location: newName },
        { $set: { location: oldName } }
      )
      console.log(`   📋 Tutor Applications: ${appResult.modifiedCount} updated`)
      totalUpdates += appResult.modifiedCount

      // Update StudentEnquiry collection (uses 'area' field)
      const enquiryResult = await collections.studentenquiries.updateMany(
        { area: newName },
        { $set: { area: oldName } }
      )
      console.log(`   🔔 Student Enquiries: ${enquiryResult.modifiedCount} updated`)
      totalUpdates += enquiryResult.modifiedCount
    }

    // Step 2: Restore old colors
    console.log('\n🎨 Step 2: Restoring old colors...')
    for (const loc of OLD_LOCATIONS) {
      const existing = await collections.locations.findOne({ name: loc.name })
      if (existing && existing.color !== loc.color) {
        await collections.locations.updateOne(
          { name: loc.name },
          { $set: { color: loc.color } }
        )
        console.log(`   🎨 Updated color for ${loc.name}: ${existing.color} → ${loc.color}`)
      } else if (existing) {
        console.log(`   ✓ Color already correct for ${loc.name}`)
      } else {
        // Create if doesn't exist
        await collections.locations.insertOne({
          ...loc,
          createdAt: new Date().toISOString().split('T')[0]
        })
        console.log(`   ✅ Created location: ${loc.name}`)
      }
    }

    console.log('\n\n📊 Rollback Complete!')
    console.log('─────────────────────────────────────')
    console.log(`✅ Total documents updated: ${totalUpdates}`)

    // Show final state
    console.log('\n📍 Final Locations:')
    const finalLocations = await collections.locations.find({}).toArray()
    finalLocations.forEach(loc => {
      console.log(`   - ${loc.name} (${loc.color})`)
    })

    console.log('\n👥 Final Sub-Admins by Location:')
    const finalSubAdminCounts = await collections.subadmins.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]).toArray()
    finalSubAdminCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n✨ Rollback successful!\n')

  } catch (error) {
    console.error('❌ Rollback failed:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run rollback
rollbackLocations()
