# Database Migration Scripts

This folder contains scripts to manage and migrate the Simrit Gyan database.

## Scripts

### 1. check-database.js
**Purpose**: Check the current state of the database without making any changes.

**Usage**:
```bash
node scripts/check-database.js
```

**What it does**:
- Shows all locations in the database
- Lists sub-admins, teachers, leads, applications, and enquiries by location
- Identifies orphaned locations (used in data but not in Location collection)
- Provides a summary of database state

**When to use**: Before running any migration to understand the current state.

---

### 2. migrate-locations.js
**Purpose**: Migrate old location names to new ones across all collections.

**Usage**:
```bash
node scripts/migrate-locations.js
```

**What it does**:
1. **Removes invalid locations**: Deletes duplicate or invalid location entries (e.g., "DELHI")
2. **Migrates location names**: Updates old names to new names across all collections:
   - South Delhi → Hauz Khas
   - South West Delhi → Uttam Nagar
   - Central Delhi → Rajinder Nagar
   - Other Delhi Area → Connaught Place
3. **Ensures all locations exist**: Creates missing locations with correct colors
4. **Updates all references**: Updates location references in:
   - SubAdmin collection
   - Teacher collection
   - Lead collection
   - TutorApplication collection
   - StudentEnquiry collection (area field)

**When to use**: When you need to migrate from old location structure to new one.

**⚠️ WARNING**: This script modifies the database. Always:
1. Run `check-database.js` first to see current state
2. Backup your database before running
3. Test on a development database first

---

## Migration Process

### Step 1: Check Current State
```bash
node scripts/check-database.js
```

Review the output to understand:
- What locations exist
- How many records are associated with each location
- Any orphaned locations

### Step 2: Backup Database
Before running any migration, backup your MongoDB database:
```bash
# Using mongodump
mongodump --uri="your-mongodb-uri" --out=backup-$(date +%Y%m%d)
```

### Step 3: Run Migration
```bash
node scripts/migrate-locations.js
```

The script will:
- Show before and after state
- Report how many documents were updated
- Identify any issues

### Step 4: Verify Results
```bash
node scripts/check-database.js
```

Check that:
- All locations are correct
- No orphaned locations remain
- All data is properly associated

---

## Expected Final State

After migration, the database should have these 5 locations:

| Location | Color | Description |
|----------|-------|-------------|
| Hauz Khas | #667eea (purple) | South Delhi area |
| Gurgaon | #43e97b (green) | Haryana (separate from Delhi) |
| Connaught Place | #f7971e (orange) | Central Delhi area |
| Uttam Nagar | #f093fb (pink) | West Delhi area |
| Rajinder Nagar | #38f9d7 (cyan) | Central Delhi area |

---

## Troubleshooting

### Issue: "No locations found"
**Solution**: Visit `http://localhost:3000/api/admin/init-locations` to initialize default locations.

### Issue: "Orphaned locations found"
**Solution**: Run the migration script to update location names and create missing locations.

### Issue: Sub-admins assigned to removed locations
**Solution**: Manually reassign these sub-admins through the admin dashboard.

### Issue: Migration fails with connection error
**Solution**: Check that:
- MongoDB URI is correct in `.env.local`
- Database is accessible
- Network connection is stable

---

## Environment Variables

The scripts use the MongoDB URI from environment variables:

```bash
# Option 1: Set environment variable
export MONGODB_URI="your-mongodb-uri"
node scripts/migrate-locations.js

# Option 2: Scripts will use default URI from .env.local
node scripts/migrate-locations.js
```

---

## Notes

- The migration is idempotent - you can run it multiple times safely
- Already migrated data won't be affected
- The script preserves all data, only updates location names
- Colors are updated to match the new design system
