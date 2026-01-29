'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import {
  getSavedTrips,
  getImageForDestination,
  saveTripsToStorage,
  type SavedTrip,
} from '@/lib/tripwise-storage';

const BORDER_LIGHT = 'rgba(125, 94, 60, 0.35)';
const CARD_BG = 'rgba(31, 0, 0, 0.5)';

// Dummy trip: Japan — Kyoto, Tokyo, Mount Fuji
const DUMMY_JAPAN_TRIP: SavedTrip = {
  id: 'dummy-japan',
  from: 'Home',
  to: 'Japan',
  dates: 'Mar 15–22, 2025',
  budget: '$2,400',
  createdAt: 0,
};

const JAPAN_IMAGE = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80';

export default function Dashboard() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [mounted, setMounted] = useState(false);
  const [openTripId, setOpenTripId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setTrips(getSavedTrips());
  }, []);

  const removeTrip = useCallback((id: string) => {
    if (id === DUMMY_JAPAN_TRIP.id) return;
    const next = trips.filter((t) => t.id !== id);
    setTrips(next);
    saveTripsToStorage(next);
    if (openTripId === id) setOpenTripId(null);
  }, [trips, openTripId]);

  const displayTrips = [DUMMY_JAPAN_TRIP, ...trips];
  const isDummy = (id: string) => id === DUMMY_JAPAN_TRIP.id;

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
              background: 'linear-gradient(to top, rgba(31,0,0,0.88) 0%, transparent 65%)',
            }}
          >
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1" style={{ color: '#FFC6A4' }}>
              Your trips
            </p>
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold mb-1" style={{ color: '#FFC6A4' }}>
              Dashboard
            </h1>
            <p className="text-sm sm:text-base max-w-xl opacity-90" style={{ color: '#D4AE98' }}>
              Previous trip plans and destinations. Open a trip to see flight & hotel itinerary.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="font-serif-display text-lg font-semibold" style={{ color: '#FFC6A4' }}>
            Your trips
          </h2>
          <Link
            href="/plan"
            className="font-serif-display text-sm font-medium px-5 py-2.5 rounded-full border transition-colors hover:opacity-90"
            style={{ borderColor: BORDER_LIGHT, color: '#FFC6A4' }}
          >
            Plan new trip
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayTrips.map((trip) => (
            <li
              key={trip.id}
              className="rounded-2xl overflow-hidden border transition-all hover:opacity-95"
              style={{
                borderColor: openTripId === trip.id ? 'rgba(125, 94, 60, 0.7)' : BORDER_LIGHT,
                backgroundColor: CARD_BG,
                boxShadow: openTripId === trip.id ? '0 0 0 1px rgba(125, 94, 60, 0.5)' : undefined,
              }}
            >
              {isDummy(trip.id) ? (
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

        {/* Generic itinerary for other trips (simple placeholder) */}
        {openTripId && openTripId !== DUMMY_JAPAN_TRIP.id && (() => {
          const trip = trips.find((t) => t.id === openTripId);
          if (!trip) return null;
          return (
            <div
              className="mt-8 rounded-2xl border p-6 sm:p-8"
              style={{ borderColor: BORDER_LIGHT, backgroundColor: CARD_BG }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-display text-xl font-semibold" style={{ color: '#FFC6A4' }}>
                  {trip.from} → {trip.to}
                </h3>
                <button
                  type="button"
                  onClick={() => setOpenTripId(null)}
                  className="text-sm px-3 py-1.5 rounded-full border transition-colors hover:opacity-90"
                  style={{ borderColor: BORDER_LIGHT, color: '#FFC6A4' }}
                >
                  Close
                </button>
              </div>
              <p className="text-sm opacity-90" style={{ color: '#D4AE98' }}>
                {trip.dates && `${trip.dates} · `}
                {trip.budget && `${trip.budget}`}
              </p>
              <p className="mt-3 text-sm opacity-70" style={{ color: '#D4AE98' }}>
                Flight and hotel details will appear here once you get suggestions from the Plan page.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
