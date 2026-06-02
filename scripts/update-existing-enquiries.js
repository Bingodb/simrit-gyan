/**
 * Update Existing Enquiries Script
 * 
 * This script updates all existing student enquiries to use the mapped location names
 * instead of specific area names, so they appear in the correct sub-admin dashboard.
 * 
 * Run with: node scripts/update-existing-enquiries.js
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

// Area to Location mapping (same as lib/area-mapping.ts)
const AREA_TO_LOCATION_MAP = {
  // South Delhi areas
  'Hauz Khas': 'South Delhi',
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
  'Dwarka': 'South West Delhi',
  'Janakpuri': 'South West Delhi',
  'Vikaspuri': 'South West Delhi',
  'Palam': 'South West Delhi',
  'Nawada': 'South West Delhi',
  'Tilak Nagar': 'South West Delhi',
  'Moti Nagar': 'South West Delhi',
  'Rajouri Garden': 'South West Delhi',
  'Punjabi Bagh': 'South West Delhi',
  
  // Central Delhi areas
  'Rajinder Nagar': 'Central Delhi',
  'Patel Nagar': 'Central Delhi',
  'Connaught Place': 'Central Delhi',
  'Paharganj': 'Central Delhi',
  'Daryaganj': 'Central Delhi',
  'Chandni Chowk': 'Central Delhi',
  'Kashmere Gate': 'Central Delhi',
  'Civil Lines': 'Central Delhi',
  
  // DELHI (Karol Bagh area)
  'Karol Bagh': 'DELHI',
  'Rajendra Place': 'DELHI',
  'Dev Nagar': 'DELHI',
  'Ramesh Nagar': 'DELHI',
  'Naraina': 'DELHI',
  'Shadipur': 'DELHI',
  
  // Gurgaon areas
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
  
  // Direct location names
  'South Delhi': 'South Delhi',
  'South West Delhi': 'South West Delhi',
  'Central Delhi': 'Central Delhi',
  'DELHI': 'DELHI',
  'Gurgaon': 'Gurgaon',
  
  // Fallback
  'Other Delhi Area': 'Central Delhi',
}

async function updateEnquiries() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection.db
    const enquiries = db.collection('studentenquiries')

    // Get all enquiries
    const allEnquiries = await enquiries.find({}).toArray()
    console.log(`📊 Found ${allEnquiries.length} total enquiries\n`)

    let updatedCount = 0
    let skippedCount = 0
    const updates = []

    for (const enq of allEnquiries) {
      const currentArea = enq.area
      const mappedLocation = AREA_TO_LOCATION_MAP[currentArea]

      if (mappedLocation && mappedLocation !== currentArea) {
        updates.push({
          _id: enq._id,
          oldArea: currentArea,
          newArea: mappedLocation
        })
        updatedCount++
      } else if (!mappedLocation) {
        console.log(`⚠️  Unknown area: "${currentArea}" (ID: ${enq._id})`)
        skippedCount++
      } else {
        skippedCount++
      }
    }

    if (updates.length === 0) {
      console.log('✅ No enquiries need updating. All areas are already mapped correctly.\n')
      return
    }

    console.log('📝 Enquiries to update:')
    console.log('─────────────────────────────────────')
    updates.forEach(u => {
      console.log(`   "${u.oldArea}" → "${u.newArea}"`)
    })

    console.log('\n🔄 Updating enquiries...\n')

    for (const update of updates) {
      await enquiries.updateOne(
        { _id: update._id },
        { $set: { area: update.newArea } }
      )
    }

    console.log('✅ Update complete!\n')
    console.log('📊 Summary:')
    console.log('─────────────────────────────────────')
    console.log(`   Total enquiries: ${allEnquiries.length}`)
    console.log(`   Updated: ${updatedCount}`)
    console.log(`   Skipped (already correct): ${skippedCount}`)

    // Show final distribution
    console.log('\n📍 Final distribution by location:')
    const finalEnquiries = await enquiries.find({}).toArray()
    const distribution = {}
    finalEnquiries.forEach(enq => {
      distribution[enq.area] = (distribution[enq.area] || 0) + 1
    })
    Object.entries(distribution).sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
      console.log(`   ${area}: ${count} enquir${count === 1 ? 'y' : 'ies'}`)
    })

    console.log('\n✨ All enquiries now use mapped location names!\n')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

// Run update
updateEnquiries()
