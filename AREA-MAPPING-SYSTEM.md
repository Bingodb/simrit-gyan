# Area Mapping System

## Overview
The area mapping system automatically routes student enquiries from specific Delhi areas to the correct sub-admin based on their location.

## How It Works

### 1. Area to Location Mapping
When a student selects an area like "Hauz Khas" in the form, the system automatically maps it to the parent location "South Delhi" which has an assigned sub-admin.

### 2. Mapping Structure

```
Specific Area → Parent Location → Sub-Admin
```

Example:
```
Hauz Khas → South Delhi → South Delhi Sub-Admin
Karol Bagh → DELHI → DELHI Sub-Admin
Uttam Nagar → South West Delhi → South West Delhi Sub-Admin
```

## Area Mappings

### South Delhi Sub-Admin
Handles enquiries from:
- Hauz Khas
- Saket
- Greater Kailash
- Malviya Nagar
- Lajpat Nagar
- Defence Colony
- Green Park
- Nehru Place
- Kalkaji
- Okhla
- Vasant Kunj
- Vasant Vihar

### South West Delhi Sub-Admin
Handles enquiries from:
- Uttam Nagar
- Dwarka
- Janakpuri
- Vikaspuri
- Palam
- Nawada
- Tilak Nagar
- Moti Nagar
- Rajouri Garden
- Punjabi Bagh

### Central Delhi Sub-Admin
Handles enquiries from:
- Rajinder Nagar
- Patel Nagar
- Connaught Place
- Paharganj
- Daryaganj
- Chandni Chowk
- Kashmere Gate
- Civil Lines

### DELHI Sub-Admin (Karol Bagh Area)
Handles enquiries from:
- Karol Bagh
- Rajendra Place
- Dev Nagar
- Ramesh Nagar
- Naraina
- Shadipur

### Gurgaon Sub-Admin
Handles enquiries from:
- DLF Phase 1-5
- Sohna Road
- Golf Course Road
- MG Road
- All Gurgaon Sectors
- Cyber City

## Implementation

### File: `lib/area-mapping.ts`
Contains the mapping logic and helper functions.

### File: `app/api/student-enquiry/route.ts`
Uses the mapping to route enquiries to correct sub-admin.

### File: `components/locations/DelhiHero.tsx`
Shows all areas in the dropdown with their parent region.

## Admin Dashboard View

In the admin dashboard Activities section:

**By Location View** (Default):
```
📍 South Delhi
Sub-admin: Jyoti South delhi · 5 enquiries
  - Hauz Khas enquiry
  - Saket enquiry
  - Greater Kailash enquiry
  ...

📍 DELHI
Sub-admin: Chetan · 3 enquiries
  - Karol Bagh enquiry
  - Rajendra Place enquiry
  ...
```

## Benefits

1. **Automatic Routing**: No manual assignment needed
2. **Clear Organization**: Each sub-admin sees only their area's enquiries
3. **Scalable**: Easy to add new areas
4. **Flexible**: Can update mappings without changing database

## Adding New Areas

To add a new area:

1. Open `lib/area-mapping.ts`
2. Add the area to the appropriate location:
   ```typescript
   'New Area Name': 'Parent Location',
   ```
3. Add to Delhi form dropdown in `components/locations/DelhiHero.tsx`:
   ```typescript
   { name: 'New Area Name', region: 'Parent Location' },
   ```

## Example Flow

### Student Submits Form:
1. Student selects "Hauz Khas" from dropdown
2. Form submits to `/api/student-enquiry`
3. API calls `getLocationForArea('Hauz Khas')`
4. Returns "South Delhi"
5. Enquiry saved with `area: 'South Delhi'`
6. South Delhi sub-admin sees the enquiry in their dashboard

### Sub-Admin Views Dashboard:
1. Sub-admin logs in
2. Sees only enquiries where `area === their location`
3. Example: South Delhi sub-admin sees all Hauz Khas, Saket, Greater Kailash enquiries

## Database Structure

### StudentEnquiry Collection:
```javascript
{
  name: "Student Name",
  phone: "1234567890",
  studentClass: "Class 10",
  subject: "Maths",
  city: "Delhi",
  area: "South Delhi",  // ← Mapped from "Hauz Khas"
  message: "...",
  status: "new",
  createdAt: "2026-05-14"
}
```

## Testing

### Test the Mapping:
1. Go to `/locations/delhi`
2. Fill form and select "Hauz Khas"
3. Submit form
4. Login as South Delhi sub-admin
5. Check if enquiry appears in their dashboard

### Verify Routing:
```bash
# Run database check
node scripts/check-database.js

# Should show enquiries grouped by location
```

## Troubleshooting

### Issue: Enquiry not appearing in sub-admin dashboard
**Solution**: Check if the area is mapped in `lib/area-mapping.ts`

### Issue: Wrong sub-admin receiving enquiry
**Solution**: Update the mapping in `lib/area-mapping.ts`

### Issue: Area not in dropdown
**Solution**: Add area to `DelhiHero.tsx` DELHI_AREAS array

---

**System implemented on May 14, 2026** ✅

All Delhi areas now automatically route to the correct sub-admin!
