'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import {
  getSavedTrips,
  getImageForDestination,
  saveTripsToStorage,
  updateTripItem,
  type SavedTrip,
  type TripItem,
} from '@/lib/tripwise-storage';

const BORDER_LIGHT = 'rgba(125, 94, 60, 0.45)';
const CARD_BG = 'rgba(31, 0, 0, 0.5)';
const BOX_CREAM = '#F5F0E8';
const TEXT_ON_CREAM = '#2C1810';
const TEXT_MUTED = '#5C4A3A';
const CREAM_SOFT = '#EDE6DC';

async function logTripAction(tripId: string, itemId: string, action: string) {
  try {
    await fetch('/api/trip/log-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, itemId, action }),
    });
  } catch (_) {
    // best-effort Opik logging
  }
}

function TripItineraryPanel({
  trip,
  onClose,
  onUpdateItem,
}: {
  trip: SavedTrip;
  onClose: () => void;
  onUpdateItem: (itemId: string, updates: Partial<Pick<TripItem, 'status' | 'important'>>) => void;
}) {
  const handleDone = (item: TripItem) => {
    const nextStatus = item.status === 'done' ? 'pending' : 'done';
    onUpdateItem(item.id, { status: nextStatus });
    logTripAction(trip.id, item.id, nextStatus);
  };
  const handleImportant = (item: TripItem) => {
    const next = !item.important;
    onUpdateItem(item.id, { important: next });
    logTripAction(trip.id, item.id, next ? 'important' : 'pending');
  };

  const items = trip.items ?? [];
  return (
    <div
      className="mt-8 rounded-2xl border p-6 sm:p-8 shadow-lg"
      style={{ borderColor: BORDER_LIGHT, backgroundColor: BOX_CREAM }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif-display text-xl font-semibold" style={{ color: TEXT_ON_CREAM }}>
          {trip.from} → {trip.to}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-sm px-3 py-1.5 rounded-full border transition-colors hover:opacity-90"
          style={{ borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM }}
        >
          Close
        </button>
      </div>
      <p className="text-sm opacity-90 mb-4" style={{ color: TEXT_MUTED }}>
        {trip.dates && `${trip.dates} · `}
        {trip.budget && `${trip.budget}`}
      </p>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="px-4 py-3 rounded-xl border flex flex-wrap items-center justify-between gap-3"
              style={{
                borderColor: BORDER_LIGHT,
                backgroundColor: CREAM_SOFT,
                opacity: item.status === 'done' ? 0.85 : 1,
              }}
            >
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${item.status === 'done' ? 'line-through' : ''}`} style={{ color: TEXT_ON_CREAM }}>
                  {item.text}
                </p>
                <span
                  className="inline-block mt-2 text-xs px-2.5 py-1 rounded-lg capitalize"
                  style={{
                    backgroundColor: item.priority === 'high' ? 'rgba(180, 80, 60, 0.2)' : item.priority === 'medium' ? 'rgba(125, 94, 60, 0.25)' : 'rgba(80, 100, 120, 0.2)',
                    color: TEXT_ON_CREAM,
                  }}
                >
                  {item.priority}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDone(item)}
                  className="text-sm px-3 py-2 rounded-full border transition-colors"
                  style={{
                    borderColor: BORDER_LIGHT,
                    color: item.status === 'done' ? TEXT_MUTED : TEXT_ON_CREAM,
                    backgroundColor: item.status === 'done' ? 'rgba(125, 94, 60, 0.2)' : 'transparent',
                  }}
                >
                  {item.status === 'done' ? '✓ Done' : 'Mark done'}
                </button>
                <button
                  type="button"
                  onClick={() => handleImportant(item)}
                  className="text-sm px-3 py-2 rounded-full border transition-colors"
                  style={{
                    borderColor: BORDER_LIGHT,
                    color: item.important ? TEXT_MUTED : TEXT_ON_CREAM,
                    backgroundColor: item.important ? 'rgba(125, 94, 60, 0.2)' : 'transparent',
                  }}
                >
                  {item.important ? '★ Important' : 'Important'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm opacity-70" style={{ color: TEXT_MUTED }}>
          No itinerary items yet. Generate a trip on the Plan page to see tasks here.
        </p>
      )}
    </div>
  );
}

// Demo trip: Japan — links to full trip page
const DUMMY_JAPAN_TRIP: SavedTrip = {
  id: 'dummy-japan',
  from: 'Home',
  to: 'Japan',
  dates: 'Mar 15–22, 2025',
  budget: '$2,400',
  createdAt: 0,
};

const JAPAN_IMAGE = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80';

// Demo trips with sample itineraries (expand to view)
const DEMO_TRIPS: SavedTrip[] = [
  {
    id: 'demo-paris',
    from: 'NYC',
    to: 'Paris',
    dates: 'Jun 10–17, 2025',
    budget: '$2,800',
    createdAt: 1,
    items: [
      { id: '1', text: 'Book round-trip flight NYC → Paris (CDG) – compare Air France, Delta; mid-week for better fares', priority: 'high', status: 'pending', important: false },
      { id: '2', text: 'Reserve hotel in Le Marais or Saint-Germain for 6 nights – central and walkable', priority: 'high', status: 'pending', important: false },
      { id: '3', text: 'Visit Louvre (book timed slot online) and Eiffel Tower', priority: 'high', status: 'pending', important: false },
      { id: '4', text: 'Explore Montmartre, Sacré-Cœur, and street artists', priority: 'medium', status: 'pending', important: false },
      { id: '5', text: 'Day trip to Versailles – palace and gardens', priority: 'medium', status: 'pending', important: false },
      { id: '6', text: 'Seine cruise and dinner in Saint-Germain', priority: 'low', status: 'pending', important: false },
    ],
  },
  {
    id: 'demo-bali',
    from: 'Singapore',
    to: 'Bali',
    dates: 'Aug 5–14, 2025',
    budget: '$1,600',
    createdAt: 2,
    items: [
      { id: '1', text: 'Book flight Singapore → Denpasar (DPS) – ~2.5h; consider Garuda or AirAsia', priority: 'high', status: 'pending', important: false },
      { id: '2', text: 'Stay in Ubud 4 nights (rice terraces, yoga) + Seminyak 3 nights (beach)', priority: 'high', status: 'pending', important: false },
      { id: '3', text: 'Visit Tegallalang Rice Terraces and Tirta Empul temple', priority: 'high', status: 'pending', important: false },
      { id: '4', text: 'Day trip to Nusa Penida or Uluwatu for cliffs and beaches', priority: 'medium', status: 'pending', important: false },
      { id: '5', text: 'Balinese cooking class or spa in Ubud', priority: 'medium', status: 'pending', important: false },
      { id: '6', text: 'Sunset at Tanah Lot temple', priority: 'low', status: 'pending', important: false },
    ],
  },
  {
    id: 'demo-newyork',
    from: 'London',
    to: 'New York',
    dates: 'Dec 20–28, 2025',
    budget: '$3,200',
    createdAt: 3,
    items: [
      { id: '1', text: 'Book round-trip flight LHR → JFK/EWR – British Airways, Virgin, or United', priority: 'high', status: 'pending', important: false },
      { id: '2', text: 'Hotel in Midtown or SoHo – 7 nights; book early for Christmas week', priority: 'high', status: 'pending', important: false },
      { id: '3', text: 'Empire State Building, Top of the Rock, or Edge for skyline views', priority: 'high', status: 'pending', important: false },
      { id: '4', text: 'Central Park, Met Museum, and Fifth Avenue', priority: 'medium', status: 'pending', important: false },
      { id: '5', text: 'Brooklyn Bridge walk and DUMBO', priority: 'medium', status: 'pending', important: false },
      { id: '6', text: 'Broadway show and Times Square', priority: 'low', status: 'pending', important: false },
    ],
  },
];

const DEMO_TRIP_IDS = new Set([DUMMY_JAPAN_TRIP.id, ...DEMO_TRIPS.map((t) => t.id)]);

export default function Dashboard() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [mounted, setMounted] = useState(false);
  const [openTripId, setOpenTripId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setTrips(getSavedTrips());
  }, []);

  const removeTrip = useCallback((id: string) => {
    if (DEMO_TRIP_IDS.has(id)) return;
    const next = trips.filter((t) => t.id !== id);
    setTrips(next);
    saveTripsToStorage(next);
    if (openTripId === id) setOpenTripId(null);
  }, [trips, openTripId]);

  const displayTrips = [DUMMY_JAPAN_TRIP, ...DEMO_TRIPS, ...trips];
  const isDemo = (id: string) => DEMO_TRIP_IDS.has(id);
  const isJapanDemo = (id: string) => id === DUMMY_JAPAN_TRIP.id;

  const totalItems = trips.reduce((acc, t) => acc + (t.items?.length ?? 0), 0);
  const doneItems = trips.reduce((acc, t) => acc + (t.items?.filter((i) => i.status === 'done').length ?? 0), 0);

  if (!mounted) {
    return (
      <div className="min-h-screen font-sans" style={{ backgroundColor: '#1F0000' }}>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center" style={{ color: '#D4AE98' }}>
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: '#1F0000' }}>
      {/* Hero */}
      <section className="relative w-full max-w-5xl mx-auto px-4 pt-8 sm:pt-12 pb-10">
        <div
          className="relative rounded-3xl overflow-hidden border min-h-[180px] sm:min-h-[220px]"
          style={{ borderColor: BORDER_LIGHT }}
        >
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=85"
            alt="Travel"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10"
            style={{
              background: 'linear-gradient(to top, rgba(31,0,0,0.9) 0%, transparent 60%)',
            }}
          >
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1" style={{ color: '#FFC6A4' }}>
              Your trips
            </p>
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold mb-2" style={{ color: '#FFC6A4' }}>
              Dashboard
            </h1>
            <p className="text-sm sm:text-base max-w-xl opacity-95" style={{ color: '#D4AE98' }}>
              Your saved trip plans. Open a trip to view the itinerary and mark items done or important.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Stats + actions */}
        <div className="rounded-2xl border p-4 sm:p-5 mb-6 flex flex-wrap items-center justify-between gap-4" style={{ borderColor: BORDER_LIGHT, backgroundColor: BOX_CREAM }}>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider opacity-80" style={{ color: TEXT_MUTED }}>Trips</p>
              <p className="font-serif-display text-2xl font-bold" style={{ color: TEXT_ON_CREAM }}>{displayTrips.length}</p>
            </div>
            {totalItems > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider opacity-80" style={{ color: TEXT_MUTED }}>Itinerary progress</p>
                <p className="font-serif-display text-2xl font-bold" style={{ color: TEXT_ON_CREAM }}>{doneItems}/{totalItems} done</p>
              </div>
            )}
          </div>
          <Link
            href="/plan"
            className="font-serif-display text-sm font-medium px-5 py-2.5 rounded-full border transition-colors hover:opacity-95"
            style={{ borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM, backgroundColor: 'rgba(125, 94, 60, 0.15)' }}
          >
            Plan new trip
          </Link>
        </div>

        <h2 className="font-serif-display text-lg font-semibold mb-4" style={{ color: '#FFC6A4' }}>
          Your trips
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayTrips.map((trip) => (
            <li
              key={trip.id}
              className="rounded-2xl overflow-hidden border transition-all hover:opacity-95 shadow-md"
              style={{
                borderColor: openTripId === trip.id ? 'rgba(125, 94, 60, 0.7)' : BORDER_LIGHT,
                backgroundColor: CARD_BG,
                boxShadow: openTripId === trip.id ? '0 0 0 1px rgba(125, 94, 60, 0.5)' : undefined,
              }}
            >
              {isJapanDemo(trip.id) ? (
                <Link href="/trip/japan" className="block w-full text-left">
                  <div className="relative h-40 sm:h-44">
                    <Image
                      src={JAPAN_IMAGE}
                      alt={trip.to}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-4"
                      style={{
                        background: 'linear-gradient(to top, rgba(31,0,0,0.88) 0%, transparent 60%)',
                      }}
                    >
                      <p className="font-medium text-sm sm:text-base truncate" style={{ color: '#FFC6A4' }}>
                        {trip.from} → {trip.to}
                      </p>
                      {trip.dates && (
                        <p className="text-xs mt-0.5 opacity-90" style={{ color: '#D4AE98' }}>
                          {trip.dates}
                        </p>
                      )}
                      {trip.budget && (
                        <p className="text-xs opacity-80" style={{ color: '#D4AE98' }}>
                          {trip.budget}
                        </p>
                      )}
                      <p className="text-xs mt-1.5 opacity-80" style={{ color: '#D4AE98' }}>
                        ▶ View full trip page
                      </p>
                    </div>
                  </div>
                </Link>
              ) : isDemo(trip.id) ? (
                <button
                  type="button"
                  onClick={() => setOpenTripId(openTripId === trip.id ? null : trip.id)}
                  className="w-full text-left block"
                >
                  <div className="relative h-40 sm:h-44">
                    <Image
                      src={getImageForDestination(trip.to)}
                      alt={trip.to}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-4"
                      style={{
                        background: 'linear-gradient(to top, rgba(31,0,0,0.88) 0%, transparent 60%)',
                      }}
                    >
                      <p className="font-medium text-sm sm:text-base truncate" style={{ color: '#FFC6A4' }}>
                        {trip.from} → {trip.to}
                      </p>
                      {trip.dates && (
                        <p className="text-xs mt-0.5 opacity-90" style={{ color: '#D4AE98' }}>
                          {trip.dates}
                        </p>
                      )}
                      {trip.budget && (
                        <p className="text-xs opacity-80" style={{ color: '#D4AE98' }}>
                          {trip.budget}
                        </p>
                      )}
                      <p className="text-xs mt-1.5 opacity-80" style={{ color: '#D4AE98' }}>
                        {openTripId === trip.id ? '▼ Close itinerary' : '▶ View itinerary'}
                      </p>
                    </div>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenTripId(openTripId === trip.id ? null : trip.id)}
                    className="w-full text-left block"
                  >
                    <div className="relative h-40 sm:h-44">
                      <Image
                        src={getImageForDestination(trip.to)}
                        alt={trip.to}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 flex flex-col justify-end p-4"
                        style={{
                          background: 'linear-gradient(to top, rgba(31,0,0,0.88) 0%, transparent 60%)',
                        }}
                      >
                        <p className="font-medium text-sm sm:text-base truncate" style={{ color: '#FFC6A4' }}>
                          {trip.from} → {trip.to}
                        </p>
                        {trip.dates && (
                          <p className="text-xs mt-0.5 opacity-90" style={{ color: '#D4AE98' }}>
                            {trip.dates}
                          </p>
                        )}
                        {trip.budget && (
                          <p className="text-xs opacity-80" style={{ color: '#D4AE98' }}>
                            {trip.budget}
                          </p>
                        )}
                        <p className="text-xs mt-1.5 opacity-80" style={{ color: '#D4AE98' }}>
                          {openTripId === trip.id ? '▼ Close itinerary' : '▶ View flight & hotel itinerary'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeTrip(trip.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full border flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity text-lg leading-none"
                        style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.75)', color: '#FFC6A4' }}
                        aria-label="Remove trip"
                      >
                        ×
                      </button>
                    </div>
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Itinerary panel for open trip (saved or demo) */}
        {openTripId && openTripId !== DUMMY_JAPAN_TRIP.id && (() => {
          const trip = displayTrips.find((t) => t.id === openTripId);
          if (!trip) return null;
          const isDemoTrip = DEMO_TRIP_IDS.has(trip.id);
          return (
            <TripItineraryPanel
              trip={trip}
              onClose={() => setOpenTripId(null)}
              onUpdateItem={(itemId, updates) => {
                if (!isDemoTrip) {
                  updateTripItem(trip.id, itemId, updates);
                  setTrips(getSavedTrips());
                }
              }}
            />
          );
        })()}
      </div>
    </div>
  );
}
