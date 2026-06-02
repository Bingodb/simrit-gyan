/**
 * Area to Location Mapping
 * 
 * Maps specific Delhi areas to their parent location/sub-admin
 * This ensures enquiries from specific areas go to the correct sub-admin
 */

export const AREA_TO_LOCATION_MAP: Record<string, string> = {
  // South Delhi areas → South Delhi sub-admin
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
  
  // South West Delhi areas → South West Delhi sub-admin
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
  
  // Central Delhi areas → Central Delhi sub-admin
  'Rajinder Nagar': 'Central Delhi',
  'Patel Nagar': 'Central Delhi',
  'Connaught Place': 'Central Delhi',
  'Paharganj': 'Central Delhi',
  'Daryaganj': 'Central Delhi',
  'Chandni Chowk': 'Central Delhi',
  'Kashmere Gate': 'Central Delhi',
  'Civil Lines': 'Central Delhi',
  
  // DELHI (Karol Bagh area) → DELHI sub-admin
  'Karol Bagh': 'DELHI',
  'Rajendra Place': 'DELHI',
  'Dev Nagar': 'DELHI',
  'Ramesh Nagar': 'DELHI',
  'Naraina': 'DELHI',
  'Shadipur': 'DELHI',
  
  // Gurgaon areas → Gurgaon sub-admin
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
  
  // Direct location names (no mapping needed)
  'South Delhi': 'South Delhi',
  'South West Delhi': 'South West Delhi',
  'Central Delhi': 'Central Delhi',
  'DELHI': 'DELHI',
  'Gurgaon': 'Gurgaon',
  
  // Fallback for "Other Delhi Area"
  'Other Delhi Area': 'Central Delhi', // Default to Central Delhi
}

/**
 * Get the parent location for a given area
 * @param area - The area name from the form
 * @returns The parent location name that maps to a sub-admin
 */
export function getLocationForArea(area: string): string {
  return AREA_TO_LOCATION_MAP[area] || area
}

/**
 * Get all areas for a specific location
 * @param location - The location name
 * @returns Array of area names that belong to this location
 */
export function getAreasForLocation(location: string): string[] {
  return Object.entries(AREA_TO_LOCATION_MAP)
    .filter(([_, loc]) => loc === location)
    .map(([area, _]) => area)
}

/**
 * Check if an area needs mapping
 * @param area - The area name
 * @returns true if the area maps to a different location
 */
export function needsMapping(area: string): boolean {
  const mapped = AREA_TO_LOCATION_MAP[area]
  return mapped !== undefined && mapped !== area
}
