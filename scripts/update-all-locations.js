/**
 * Update All Locations Script
 * 
 * This script updates ALL existing data (enquiries, leads, teachers, applications)
 * to use the mapped location names instead of specific area names.
 * 
 * Run with: node scripts/update-all-locations.js
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

// Area to Location mapping (same as lib/area-mapping.ts)
const AREA_TO_LOCATION_MAP = {
  // South Delhi areas
  'Hauz Khas': 'South Delhi',
  'hauz khas': 'South Delhi',
  'Saket': 'South Delhi',
  'Greater Kailash': 'South Delhi',
  'Malviya Nagar': 'South Delhi',
  'Lajpat Nagar': 'South Delhi',
  'Defence Colony': 'South Delhi',
  'Green Park': 'South Delhi',
  'Nehru Place': 'South Delhi',
  'Kalkaji': 'South Delhi',
  'Okhla': 'South Delhi',
  'Vasant Kunj': 'South Delhi',
  'Vasant Vihar': 'South Delhi',
  
  // South West Delhi areas
  'Uttam Nagar': 'South West Delhi',
  'uttam nagar': 'South West Delhi',
  'Dwarka': 'South West Delhi',
  'dwarka': 'South West Delhi',
  'Janakpuri': 'South West Delhi',
  'Vikaspuri': 'South West Delhi',
  'Vikas puri': 'South West Delhi',
  'vikas puri': 'South West Delhi',
  'vikaspuri': 'South West Delhi',
  'Palam': 'South West Delhi',
  'Nawada': 'South West Delhi',
  'Tilak Nagar': 'South West Delhi',
  'Moti Nagar': 'South West Delhi',
  'Rajouri Garden': 'South West Delhi',
  'Punjabi Bagh': 'South West Delhi',
  
  // Central Delhi areas
  'Rajinder Nagar': 'Central Delhi',
  'rajinder nagar': 'Central Delhi',
  'Patel Nagar': 'Central Delhi',
  'Connaught Place': 'Central Delhi',
  'Paharganj': 'Central Delhi',
  'Daryaganj': 'Central Delhi',
  'Chandni Chowk': 'Central Delhi',
  'Kashmere Gate': 'Central Delhi',
  'Civil Lines': 'Central Delhi',
  
  // DELHI (Karol Bagh area)
  'Karol Bagh': 'DELHI',
  'karol bagh': 'DELHI',
  'Rajendra Place': 'DELHI',
  'Dev Nagar': 'DELHI',
  'Ramesh Nagar': 'DELHI',
  'Naraina': 'DELHI',
  'Shadipur': 'DELHI',
  
  // Gurgaon areas
  'gurgaon': 'Gurgaon',
  'Gurgaon': 'Gurgaon',
  'DLF Phase 1': 'Gurgaon',
  'DLF Phase 2': 'Gurgaon',
  'DLF Phase 3': 'Gurgaon',
  'DLF Phase 4': 'Gurgaon',
  'DLF Phase 5': 'Gurgaon',
  'Sohna Road': 'Gurgaon',
  'Golf Course Road': 'Gurgaon',
  'MG Road': 'Gurgaon',
  'Sector 14': 'Gurgaon',
  'Sector 29': 'Gurgaon',
  'Sector 56': 'Gurgaon',
  'Cyber City': 'Gurgaon',
  
  // Direct location names (already correct)
  'South Delhi': 'South Delhi',
  'South West Delhi': 'South West Delhi',
  'Central Delhi': 'Central Delhi',
  'DELHI': 'DELHI',
}

function getLocationFromArea(area) {
  // Try exact match first
  if (AREA_TO_LOCATION_MAP[area]) {
    return AREA_TO_LOCATION_MAP[area]
  }
  
  // Try case-insensitive match
  const lowerArea = area?.toLowerCase()
  for (const [key, value] of Object.entries(AREA_TO_LOCATION_MAP)) {
    if (key.toLowerCase() === lowerArea) {
      return value
    }
  }
  
  // Check if it contains keywords
  if (lowerArea?.includes('gurgaon') || lowerArea?.includes('gurugram')) {
    return 'Gurgaon'
  }
  if (lowerArea?.includes('karol bagh')) {
    return 'DELHI'
  }
  if (lowerArea?.includes('vikas') || lowerArea?.includes('uttam')) {
    return 'South West Delhi'
  }
  if (lowerArea?.includes('hauz khas') || lowerArea?.includes('saket')) {
    return 'South Delhi'
  }
  if (lowerArea?.includes('rajinder') || lowerArea?.includes('patel nagar')) {
    return 'Central Delhi'
  }
  
  // Default: if contains "delhi", return DELHI
  if (lowerArea?.includes('delhi')) {
    return 'DELHI'
  }
  
  return null
}

async function updateCollection(collectionName, locationField) {
  const db = mongoose.connection.db
  const collection = db.collection(collectionName)
  
  const allDocs = await collection.find({}).toArray()
  console.log(`\n📊 Found ${allDocs.length} ${collectionName}\n`)
  
  if (allDocs.length === 0) return { updated: 0, skipped: 0, unknown: 0 }
  
  let updatedCount = 0
  let skippedCount = 0
  let unknownCount = 0
  const updates = []
  
  for (const doc of allDocs) {
    const currentLocation = doc[locationField]
    const mappedLocation = getLocationFromArea(currentLocation)
    
    if (mappedLocation && mappedLocation !== currentLocation) {
      updates.push({
        _id: doc._id,
        oldLocation: currentLocation,
        newLocation: mappedLocation
      })
      updatedCount++
    } else if (!mappedLocation) {
      console.log(`   ⚠️  Unknown location: "${currentLocation}" (ID: ${doc._id})`)
      unknownCount++
    } else {
      skippedCount++
    }
  }
  
  if (updates.length > 0) {
    console.log(`📝 ${collectionName} to update:`)
    console.log('─────────────────────────────────────')
    updates.forEach(u => {
      console.log(`   "${u.oldLocation}" → "${u.newLocation}"`)
    })
    
    console.log(`\n🔄 Updating ${collectionName}...\n`)
    
    for (const update of updates) {
      await collection.updateOne(
        { _id: update._id },
        { $set: { [locationField]: update.newLocation } }
      )
    }
    
    console.log(`✅ ${collectionName} updated!\n`)
  } else {
    console.log(`✅ No ${collectionName} need updating.\n`)
  }
  
  return { updated: updatedCount, skipped: skippedCount, unknown: unknownCount }
}

async function updateAllLocations() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')
    console.log('════════════════════════════════════════════════════════\n')
    
    const results = {}
    
    // Update Enquiries (field: area)
    console.log('📍 UPDATING STUDENT ENQUIRIES')
    console.log('════════════════════════════════════════════════════════')
    results.enquiries = await updateCollection('studentenquiries', 'area')
    
    // Update Leads (field: location)
    console.log('📍 UPDATING LEADS')
    console.log('════════════════════════════════════════════════════════')
    results.leads = await updateCollection('leads', 'location')
    
    // Update Teachers (field: location)
    console.log('📍 UPDATING TEACHERS')
    console.log('════════════════════════════════════════════════════════')
    results.teachers = await updateCollection('teachers', 'location')
    
    // Update Applications (field: location)
    console.log('📍 UPDATING TUTOR APPLICATIONS')
    console.log('════════════════════════════════════════════════════════')
    results.applications = await updateCollection('tutorapplications', 'location')
    
    // Summary
    console.log('\n════════════════════════════════════════════════════════')
    console.log('📊 MIGRATION SUMMARY')
    console.log('════════════════════════════════════════════════════════\n')
    
    const totalUpdated = Object.values(results).reduce((sum, r) => sum + r.updated, 0)
    const totalSkipped = Object.values(results).reduce((sum, r) => sum + r.skipped, 0)
    const totalUnknown = Object.values(results).reduce((sum, r) => sum + r.unknown, 0)
    
    console.log(`   Enquiries:    ${results.enquiries.updated} updated, ${results.enquiries.skipped} skipped, ${results.enquiries.unknown} unknown`)
    console.log(`   Leads:        ${results.leads.updated} updated, ${results.leads.skipped} skipped, ${results.leads.unknown} unknown`)
    console.log(`   Teachers:     ${results.teachers.updated} updated, ${results.teachers.skipped} skipped, ${results.teachers.unknown} unknown`)
    console.log(`   Applications: ${results.applications.updated} updated, ${results.applications.skipped} skipped, ${results.applications.unknown} unknown`)
    console.log('   ─────────────────────────────────────────────────────')
    console.log(`   TOTAL:        ${totalUpdated} updated, ${totalSkipped} skipped, ${totalUnknown} unknown`)
    
    console.log('\n✨ All data now uses standardized location names!\n')
    console.log('════════════════════════════════════════════════════════\n')
    
    // Show final distribution
    const db = mongoose.connection.db
    
    console.log('📍 FINAL DISTRIBUTION BY LOCATION')
    console.log('════════════════════════════════════════════════════════\n')
    
    // Enquiries distribution
    const enquiries = await db.collection('studentenquiries').find({}).toArray()
    const enqDist = {}
    enquiries.forEach(e => enqDist[e.area] = (enqDist[e.area] || 0) + 1)
    
    console.log('Student Enquiries:')
    Object.entries(enqDist).sort((a, b) => b[1] - a[1]).forEach(([loc, count]) => {
      console.log(`   ${loc}: ${count}`)
    })
    
    // Leads distribution
    const leads = await db.collection('leads').find({}).toArray()
    const leadDist = {}
    leads.forEach(l => leadDist[l.location] = (leadDist[l.location] || 0) + 1)
    
    console.log('\nLeads:')
    Object.entries(leadDist).sort((a, b) => b[1] - a[1]).forEach(([loc, count]) => {
      console.log(`   ${loc}: ${count}`)
    })
    
    // Teachers distribution
    const teachers = await db.collection('teachers').find({}).toArray()
    const teacherDist = {}
    teachers.forEach(t => teacherDist[t.location] = (teacherDist[t.location] || 0) + 1)
    
    console.log('\nTeachers:')
    Object.entries(teacherDist).sort((a, b) => b[1] - a[1]).forEach(([loc, count]) => {
      console.log(`   ${loc}: ${count}`)
    })
    
    // Applications distribution
    const apps = await db.collection('tutorapplications').find({}).toArray()
    const appDist = {}
    apps.forEach(a => appDist[a.location] = (appDist[a.location] || 0) + 1)
    
    console.log('\nTutor Applications:')
    Object.entries(appDist).sort((a, b) => b[1] - a[1]).forEach(([loc, count]) => {
      console.log(`   ${loc}: ${count}`)
    })
    
    console.log('\n════════════════════════════════════════════════════════\n')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

// Run update
updateAllLocations()
