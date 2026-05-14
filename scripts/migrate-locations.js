/**
 * Migration Script: Update Location Names
 * 
 * This script migrates old location names to new ones across all collections.
 * 
 * OLD NAMES → NEW NAMES:
 * - South Delhi → Hauz Khas
 * - South West Delhi → Uttam Nagar
 * - Central Delhi → Rajinder Nagar
 * - Connaught Place → Connaught Place (unchanged)
 * - Gurgaon → Gurgaon (unchanged)
 * 
 * Run with: node scripts/migrate-locations.js
 */

const mongoose = require('mongoose')

// MongoDB connection URI - update this with your actual URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

// Location name mapping (old → new)
const LOCATION_MAPPING = {
  'South Delhi': 'Hauz Khas',
  'South West Delhi': 'Uttam Nagar',
  'Central Delhi': 'Rajinder Nagar',
  'Other Delhi Area': 'Connaught Place', // Map generic area to Connaught Place
  // These remain unchanged
  'Connaught Place': 'Connaught Place',
  'Gurgaon': 'Gurgaon',
}

// Locations to remove (duplicates or invalid)
const LOCATIONS_TO_REMOVE = ['DELHI']

// Final locations that should exist (with colors)
const FINAL_LOCATIONS = [
  { name: 'Hauz Khas', color: '#667eea', active: true },
  { name: 'Gurgaon', color: '#43e97b', active: true },
  { name: 'Connaught Place', color: '#f7971e', active: true },
  { name: 'Uttam Nagar', color: '#f093fb', active: true },
  { name: 'Rajinder Nagar', color: '#38f9d7', active: true },
]

async function migrateLocations() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db

    // Get all collections
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
    
    // Check current locations
    const currentLocations = await collections.locations.find({}).toArray()
    console.log('\n📍 Current Locations:')
    currentLocations.forEach(loc => {
      console.log(`   - ${loc.name} (${loc.color})`)
    })

    // Check counts by location in each collection
    console.log('\n👥 Sub-Admins by Location:')
    const subAdminCounts = await collections.subadmins.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]).toArray()
    subAdminCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n👨‍🏫 Teachers by Location:')
    const teacherCounts = await collections.teachers.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]).toArray()
    teacherCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n📝 Leads by Location:')
    const leadCounts = await collections.leads.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]).toArray()
    leadCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n📋 Tutor Applications by Location:')
    const appCounts = await collections.tutorapplications.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]).toArray()
    appCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n🔔 Student Enquiries by Area:')
    const enquiryCounts = await collections.studentenquiries.aggregate([
      { $group: { _id: '$area', count: { $sum: 1 } } }
    ]).toArray()
    enquiryCounts.forEach(item => {
      console.log(`   - ${item._id}: ${item.count}`)
    })

    console.log('\n\n🔄 Starting Migration...')
    console.log('─────────────────────────────────────\n')

    let totalUpdates = 0

    // Step 1: Remove invalid/duplicate locations
    console.log('🗑️  Step 1: Removing invalid locations...')
    for (const locName of LOCATIONS_TO_REMOVE) {
      const removeResult = await collections.locations.deleteMany({ name: locName })
      console.log(`   Removed "${locName}": ${removeResult.deletedCount} location(s)`)
      
      // Also update any sub-admins using this location to a valid one
      const orphanedSubAdmins = await collections.subadmins.find({ location: locName }).toArray()
      if (orphanedSubAdmins.length > 0) {
        console.log(`   ⚠️  Found ${orphanedSubAdmins.length} sub-admin(s) using "${locName}"`)
        console.log(`   💡 Please manually reassign these sub-admins to a valid location`)
      }
    }

    // Step 2: Migrate each old location name to new name
    console.log('\n🔄 Step 2: Migrating location names...')
    for (const [oldName, newName] of Object.entries(LOCATION_MAPPING)) {
      if (oldName === newName) {
        console.log(`⏭️  Skipping "${oldName}" (no change needed)`)
        continue
      }

      console.log(`\n🔄 Migrating: "${oldName}" → "${newName}"`)

      // Update Location collection
      const locResult = await collections.locations.updateMany(
        { name: oldName },
        { $set: { name: newName } }
      )
      console.log(`   📍 Locations: ${locResult.modifiedCount} updated`)
      totalUpdates += locResult.modifiedCount

      // Update SubAdmin collection
      const subAdminResult = await collections.subadmins.updateMany(
        { location: oldName },
        { $set: { location: newName } }
      )
      console.log(`   👥 Sub-Admins: ${subAdminResult.modifiedCount} updated`)
      totalUpdates += subAdminResult.modifiedCount

      // Update Teacher collection
      const teacherResult = await collections.teachers.updateMany(
        { location: oldName },
        { $set: { location: newName } }
      )
      console.log(`   👨‍🏫 Teachers: ${teacherResult.modifiedCount} updated`)
      totalUpdates += teacherResult.modifiedCount

      // Update Lead collection
      const leadResult = await collections.leads.updateMany(
        { location: oldName },
        { $set: { location: newName } }
      )
      console.log(`   📝 Leads: ${leadResult.modifiedCount} updated`)
      totalUpdates += leadResult.modifiedCount

      // Update TutorApplication collection
      const appResult = await collections.tutorapplications.updateMany(
        { location: oldName },
        { $set: { location: newName } }
      )
      console.log(`   📋 Tutor Applications: ${appResult.modifiedCount} updated`)
      totalUpdates += appResult.modifiedCount

      // Update StudentEnquiry collection (uses 'area' field)
      const enquiryResult = await collections.studentenquiries.updateMany(
        { area: oldName },
        { $set: { area: newName } }
      )
      console.log(`   🔔 Student Enquiries: ${enquiryResult.modifiedCount} updated`)
      totalUpdates += enquiryResult.modifiedCount
    }

    // Step 3: Ensure all final locations exist with correct colors
    console.log('\n✨ Step 3: Ensuring all locations exist...')
    for (const loc of FINAL_LOCATIONS) {
      const existing = await collections.locations.findOne({ name: loc.name })
      if (!existing) {
        await collections.locations.insertOne({
          ...loc,
          createdAt: new Date().toISOString().split('T')[0]
        })
        console.log(`   ✅ Created location: ${loc.name}`)
      } else {
        // Update color if different
        if (existing.color !== loc.color) {
          await collections.locations.updateOne(
            { name: loc.name },
            { $set: { color: loc.color } }
          )
          console.log(`   🎨 Updated color for ${loc.name}: ${existing.color} → ${loc.color}`)
        } else {
          console.log(`   ✓ Location exists: ${loc.name}`)
        }
      }
    }

    console.log('\n\n📊 Migration Complete!')
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

    console.log('\n✨ Migration successful!\n')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run migration
migrateLocations()
