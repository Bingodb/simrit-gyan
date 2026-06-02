/**
 * Remove Duplicate Entries Script
 * 
 * This script removes duplicate submissions from student enquiries and tutor applications
 * based on phone number and submission time. It keeps the first submission and removes duplicates.
 * 
 * Run with: node scripts/remove-duplicates.js
 */

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://simritgyan:Gau%24%231234@cluster0.cpwgwwu.mongodb.net/simritgyan?appName=Cluster0'

async function removeDuplicates(collectionName, timeWindowMinutes = 5) {
  const db = mongoose.connection.db
  const collection = db.collection(collectionName)
  
  const allDocs = await collection.find({}).sort({ createdAt: 1 }).toArray()
  console.log(`\n📊 Found ${allDocs.length} ${collectionName}\n`)
  
  if (allDocs.length === 0) return { removed: 0, kept: 0 }
  
  const phoneGroups = {}
  
  // Group by phone number
  allDocs.forEach(doc => {
    if (!phoneGroups[doc.phone]) {
      phoneGroups[doc.phone] = []
    }
    phoneGroups[doc.phone].push(doc)
  })
  
  let removedCount = 0
  const idsToRemove = []
  
  // For each phone number, check for duplicates within time window
  Object.entries(phoneGroups).forEach(([phone, docs]) => {
    if (docs.length <= 1) return
    
    // Sort by creation time
    docs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    
    // Keep first, check if others are within time window
    for (let i = 1; i < docs.length; i++) {
      const timeDiff = Math.abs(new Date(docs[i].createdAt) - new Date(docs[0].createdAt))
      const minutesDiff = timeDiff / (1000 * 60)
      
      if (minutesDiff <= timeWindowMinutes) {
        idsToRemove.push(docs[i]._id)
        removedCount++
        console.log(`   🗑️  Removing duplicate: ${docs[i].name || docs[i].fullName} (${phone}) - ${minutesDiff.toFixed(1)} minutes after first`)
      }
    }
  })
  
  if (idsToRemove.length > 0) {
    console.log(`\n🔄 Removing ${idsToRemove.length} duplicate ${collectionName}...\n`)
    await collection.deleteMany({ _id: { $in: idsToRemove } })
    console.log(`✅ Removed ${idsToRemove.length} duplicates!\n`)
  } else {
    console.log(`✅ No duplicates found in ${collectionName}.\n`)
  }
  
  return { removed: removedCount, kept: allDocs.length - removedCount }
}

async function cleanDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')
    console.log('════════════════════════════════════════════════════════\n')
    
    // Remove duplicates from student enquiries
    console.log('📍 CLEANING STUDENT ENQUIRIES')
    console.log('════════════════════════════════════════════════════════')
    const enquiryStats = await removeDuplicates('studentenquiries', 5)
    
    // Remove duplicates from tutor applications
    console.log('📍 CLEANING TUTOR APPLICATIONS')
    console.log('════════════════════════════════════════════════════════')
    const appStats = await removeDuplicates('tutorapplications', 10)
    
    // Summary
    console.log('\n════════════════════════════════════════════════════════')
    console.log('📊 CLEANUP SUMMARY')
    console.log('════════════════════════════════════════════════════════\n')
    
    console.log(`   Student Enquiries:`)
    console.log(`      Kept:    ${enquiryStats.kept}`)
    console.log(`      Removed: ${enquiryStats.removed}`)
    
    console.log(`\n   Tutor Applications:`)
    console.log(`      Kept:    ${appStats.kept}`)
    console.log(`      Removed: ${appStats.removed}`)
    
    console.log(`\n   TOTAL REMOVED: ${enquiryStats.removed + appStats.removed}`)
    
    console.log('\n✨ Database cleaned!\n')
    console.log('════════════════════════════════════════════════════════\n')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed\n')
  }
}

// Run cleanup
cleanDatabase()
