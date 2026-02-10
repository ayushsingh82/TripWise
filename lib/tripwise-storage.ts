export const STORAGE_KEY = 'tripwise_previous_trips';
export const PREFERRED_STYLE_KEY = 'tripwise_preferred_style';

export type ItineraryStyleVariant = 'A' | 'B';

export interface TripItem {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'done';
  important: boolean;
}

export interface SavedTrip {
  id: string;
  from: string;
  to: string;
  dates: string;
  budget: string;
  createdAt: number;
  items?: TripItem[];
  /** A/B variant used when generating this trip */
  variant?: ItineraryStyleVariant;
}

export function getPreferredStyle(): ItineraryStyleVariant | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(PREFERRED_STYLE_KEY);
  return v === 'A' || v === 'B' ? v : null;
}

export function setPreferredStyle(variant: ItineraryStyleVariant | null): void {
  try {
    if (variant) localStorage.setItem(PREFERRED_STYLE_KEY, variant);
    else localStorage.removeItem(PREFERRED_STYLE_KEY);
  } catch {}
}

const TRIP_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
  newyork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
  barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea2f0c4fa65?w=600&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
  sydney: 'https://images.unsplash.com/photo-1523482580671-f216b185e0ee?w=600&q=80',
};

export function getImageForDestination(to: string): string {
  const key = to.toLowerCase().replace(/\s+/g, '').slice(0, 10);
  for (const [city, url] of Object.entries(TRIP_IMAGES)) {
    if (city !== 'default' && key.includes(city)) return url;
  }
  return TRIP_IMAGES.default;
}

export function getSavedTrips(): SavedTrip[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedTrip[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTripsToStorage(trips: SavedTrip[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch {
    // ignore
  }
}

/** Update a single item within a trip (e.g. mark done or important). */
export function updateTripItem(
  tripId: string,
  itemId: string,
  updates: Partial<Pick<TripItem, 'status' | 'important'>>
): void {
  const trips = getSavedTrips();
  const trip = trips.find((t) => t.id === tripId);
  if (!trip?.items) return;
  const item = trip.items.find((i) => i.id === itemId);
  if (!item) return;
  if (updates.status !== undefined) item.status = updates.status;
  if (updates.important !== undefined) item.important = updates.important;
  saveTripsToStorage(trips);
}

/** Add or replace a trip (e.g. after accepting AI-generated plan). */
export function addOrUpdateTrip(trip: SavedTrip): void {
  const trips = getSavedTrips();
  const idx = trips.findIndex((t) => t.id === trip.id);
  const next = idx >= 0 ? [...trips] : [trip, ...trips];
  if (idx >= 0) next[idx] = trip;
  else next[0] = trip;
  saveTripsToStorage(next.slice(0, 24));
}
