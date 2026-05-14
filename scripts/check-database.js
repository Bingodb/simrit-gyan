/**
 * Database Check Script
 * 
 * This script checks the current state of the database without making any changes.
 * Use this to see what locations exist and how many records are associated with each.
 * 
 * Run with: node scripts/check-database.js
 */

const mongoose = require('mongoose')

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

async function checkDatabase() {
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

    console.log('📊 DATABASE STATE REPORT')
    console.log('═══════════════════════════════════════════════════════════')
    
    // Check locations
    const locations = await collections.locations.find({}).toArray()
    console.log('\n📍 LOCATIONS IN DATABASE:')
    console.log('─────────────────────────────────────')
    if (locations.length === 0) {
      console.log('   ⚠️  No locations found! Database needs initialization.')
      console.log('   💡 Visit: http://localhost:3000/api/admin/init-locations')
    } else {
      locations.forEach(loc => {
        console.log(`   ✓ ${loc.name}`)
        console.log(`     Color: ${loc.color}`)
        console.log(`     Active: ${loc.active}`)
        console.log(`     Created: ${loc.createdAt}`)
        console.log('')
      })
    }

    // Check sub-admins
    console.log('\n👥 SUB-ADMINS BY LOCATION:')
    console.log('─────────────────────────────────────')
    const subAdmins = await collections.subadmins.find({}).toArray()
    if (subAdmins.length === 0) {
      console.log('   No sub-admins found.')
    } else {
      const subAdminsByLoc = {}
      subAdmins.forEach(sa => {
        if (!subAdminsByLoc[sa.location]) subAdminsByLoc[sa.location] = []
        subAdminsByLoc[sa.location].push(sa)
      })
      Object.entries(subAdminsByLoc).forEach(([loc, admins]) => {
        console.log(`   ${loc}: ${admins.length} sub-admin(s)`)
        admins.forEach(sa => {
          console.log(`      - ${sa.name} (${sa.phone})`)
        })
      })
    }

    // Check teachers
    console.log('\n👨‍🏫 TEACHERS BY LOCATION:')
    console.log('─────────────────────────────────────')
    const teachers = await collections.teachers.find({}).toArray()
    if (teachers.length === 0) {
      console.log('   No teachers found.')
    } else {
      const teachersByLoc = {}
      teachers.forEach(t => {
        if (!teachersByLoc[t.location]) teachersByLoc[t.location] = 0
        teachersByLoc[t.location]++
      })
      Object.entries(teachersByLoc).forEach(([loc, count]) => {
        console.log(`   ${loc}: ${count} teacher(s)`)
      })
    }

    // Check leads
    console.log('\n📝 LEADS BY LOCATION:')
    console.log('─────────────────────────────────────')
    const leads = await collections.leads.find({}).toArray()
    if (leads.length === 0) {
      console.log('   No leads found.')
    } else {
      const leadsByLoc = {}
      leads.forEach(l => {
        if (!leadsByLoc[l.location]) leadsByLoc[l.location] = 0
        leadsByLoc[l.location]++
      })
      Object.entries(leadsByLoc).forEach(([loc, count]) => {
        console.log(`   ${loc}: ${count} lead(s)`)
      })
    }

    // Check tutor applications
    console.log('\n📋 TUTOR APPLICATIONS BY LOCATION:')
    console.log('─────────────────────────────────────')
    const apps = await collections.tutorapplications.find({}).toArray()
    if (apps.length === 0) {
      console.log('   No tutor applications found.')
    } else {
      const appsByLoc = {}
      apps.forEach(a => {
        if (!appsByLoc[a.location]) appsByLoc[a.location] = 0
        appsByLoc[a.location]++
      })
      Object.entries(appsByLoc).forEach(([loc, count]) => {
        console.log(`   ${loc}: ${count} application(s)`)
      })
    }

    // Check student enquiries
    console.log('\n🔔 STUDENT ENQUIRIES BY AREA:')
    console.log('─────────────────────────────────────')
    const enquiries = await collections.studentenquiries.find({}).toArray()
    if (enquiries.length === 0) {
      console.log('   No student enquiries found.')
    } else {
      const enquiriesByArea = {}
      enquiries.forEach(e => {
        if (!enquiriesByArea[e.area]) enquiriesByArea[e.area] = 0
        enquiriesByArea[e.area]++
      })
      Object.entries(enquiriesByArea).forEach(([area, count]) => {
        console.log(`   ${area}: ${count} enquiry(ies)`)
      })
    }

    // Summary
    console.log('\n\n📈 SUMMARY:')
    console.log('═══════════════════════════════════════════════════════════')
    console.log(`   Locations: ${locations.length}`)
    console.log(`   Sub-Admins: ${subAdmins.length}`)
    console.log(`   Teachers: ${teachers.length}`)
    console.log(`   Leads: ${leads.length}`)
    console.log(`   Tutor Applications: ${apps.length}`)
    console.log(`   Student Enquiries: ${enquiries.length}`)

    // Check for mismatches
    console.log('\n\n⚠️  POTENTIAL ISSUES:')
    console.log('─────────────────────────────────────')
    const locationNames = new Set(locations.map(l => l.name))
    const allUsedLocations = new Set([
      ...subAdmins.map(sa => sa.location),
      ...teachers.map(t => t.location),
      ...leads.map(l => l.location),
      ...apps.map(a => a.location),
      ...enquiries.map(e => e.area),
    ])

    const orphanedLocations = [...allUsedLocations].filter(loc => !locationNames.has(loc))
    if (orphanedLocations.length > 0) {
      console.log('   ⚠️  Found locations in use but not in Location collection:')
      orphanedLocations.forEach(loc => {
        console.log(`      - "${loc}"`)
      })
      console.log('\n   💡 These locations need to be added to the database or')
      console.log('      records need to be migrated to existing locations.')
    } else {
      console.log('   ✅ All locations are properly registered!')
    }

    console.log('\n')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

// Run check
checkDatabase()
