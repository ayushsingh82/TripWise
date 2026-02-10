'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { addOrUpdateTrip, getPreferredStyle, type SavedTrip, type TripItem } from '@/lib/tripwise-storage';

const BORDER_LIGHT = 'rgba(125, 94, 60, 0.5)';
const CARD_BG = 'rgba(31, 0, 0, 0.5)';
const BOX_CREAM = '#F5F0E8';
const TEXT_ON_CREAM = '#2C1810';
const TEXT_MUTED = '#5C4A3A';

/** AI-generated trip plan from /api/trip/generate */
interface GeneratedPlan {
  tripId: string;
  from: string;
  to: string;
  dates: string;
  budget: string;
  variant?: 'A' | 'B';
  items: (TripItem & { status: 'pending' | 'done'; important: boolean })[];
}

export default function TripPlanner() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [dates, setDates] = useState('');
  const [budget, setBudget] = useState('');
  const [rawText, setRawText] = useState('');
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const runPlan = useCallback(async () => {
    const prompt = rawText.trim() || [from.trim() && `From: ${from}`, to.trim() && `To: ${to}`, dates.trim() && `Dates: ${dates}`, budget.trim() && `Budget: ${budget}`].filter(Boolean).join(', ');
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const preferredStyle = getPreferredStyle();
      const res = await fetch('/api/trip/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          from: from.trim(),
          to: to.trim(),
          dates: dates.trim(),
          budget: budget.trim(),
          preferredStyle: preferredStyle ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate trip');
      setPlan(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [from, to, dates, budget, rawText]);

  const acceptTrip = useCallback(() => {
    if (!plan) return;
    const saved: SavedTrip = {
      id: plan.tripId,
      from: plan.from,
      to: plan.to,
      dates: plan.dates,
      budget: plan.budget,
      createdAt: Date.now(),
      variant: plan.variant,
      items: plan.items.map((it) => ({ id: it.id, text: it.text, priority: it.priority, status: it.status, important: it.important })),
    };
    addOrUpdateTrip(saved);
    setAccepted(true);
  }, [plan]);

  const hasInput = [from, to, dates, rawText].some((s) => s.trim().length > 0);
  const hasResults = plan && plan.items.length > 0;

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: '#1F0000' }}>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-10">
        <div
          className="relative rounded-3xl overflow-hidden border min-h-[220px] sm:min-h-[280px] shadow-xl"
          style={{ borderColor: BORDER_LIGHT }}
        >
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=85"
            alt="Travel"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10"
            style={{
              background: 'linear-gradient(to top, rgba(31,0,0,0.92) 0%, transparent 55%)',
            }}
          >
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1" style={{ color: '#FFC6A4' }}>
              Plan your trip
            </p>
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold mb-2" style={{ color: '#FFC6A4' }}>
              AI trip planner
            </h1>
            <p className="text-sm sm:text-base max-w-xl opacity-95" style={{ color: '#D4AE98' }}>
              Describe where you want to go — get a day-by-day itinerary, then track it on your dashboard.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
        {/* Form card — readable background */}
        <section
          className="rounded-2xl p-6 sm:p-8 border shadow-lg"
          style={{ borderColor: BORDER_LIGHT, backgroundColor: BOX_CREAM }}
        >
          <h2 className="font-serif-display text-xl font-semibold mb-1" style={{ color: TEXT_ON_CREAM }}>
            Where are you going?
          </h2>
          <p className="text-sm mb-6 opacity-90" style={{ color: TEXT_MUTED }}>
            Fill in route and dates, or describe your trip in your own words.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 opacity-80" style={{ color: TEXT_MUTED }}>From</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="City or airport"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/50 transition-shadow placeholder:opacity-60"
                style={{ backgroundColor: '#fff', borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 opacity-80" style={{ color: TEXT_MUTED }}>To</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="City or airport"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/50 transition-shadow placeholder:opacity-60"
                style={{ backgroundColor: '#fff', borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 opacity-80" style={{ color: TEXT_MUTED }}>Dates</label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. Dec 20–27"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/50 transition-shadow placeholder:opacity-60"
                style={{ backgroundColor: '#fff', borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 opacity-80" style={{ color: TEXT_MUTED }}>Budget (optional)</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $800"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/50 transition-shadow placeholder:opacity-60"
                style={{ backgroundColor: '#fff', borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM }}
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-xs font-medium uppercase tracking-wider mb-1.5 opacity-80" style={{ color: TEXT_MUTED }}>Import trip notes</label>
            <p className="text-xs opacity-80 mb-1.5" style={{ color: TEXT_MUTED }}>Paste a description, list of places, or copy from another app.</p>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="e.g. 5 days in Tokyo, temples and food, mid-range budget — or paste from notes"
              className="w-full min-h-[90px] px-4 py-3 rounded-xl border resize-y focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/50 transition-shadow placeholder:opacity-60"
              style={{ backgroundColor: '#fff', borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM }}
              rows={3}
            />
          </div>
          <button
            onClick={() => runPlan()}
            disabled={!hasInput || loading}
            className="mt-6 font-serif-display px-8 py-3.5 rounded-full border font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              borderColor: BORDER_LIGHT,
              color: TEXT_ON_CREAM,
              backgroundColor: hasInput ? 'rgba(125, 94, 60, 0.25)' : 'transparent',
            }}
          >
            {loading ? 'Generating trip…' : 'Generate trip'}
          </button>
        </section>

        {error && (
          <section
            className="rounded-2xl p-4 border"
            style={{ borderColor: 'rgba(180, 80, 60, 0.5)', backgroundColor: BOX_CREAM }}
          >
            <p className="text-sm" style={{ color: '#8B3A2A' }}>{error}</p>
          </section>
        )}

        {/* AI-generated itinerary */}
        {hasResults && (
          <section
            className="rounded-2xl p-6 sm:p-8 border shadow-lg"
            style={{ borderColor: BORDER_LIGHT, backgroundColor: BOX_CREAM }}
          >
            <h2 className="font-serif-display text-xl font-semibold mb-1" style={{ color: TEXT_ON_CREAM }}>
              Your trip plan
            </h2>
            <p className="text-sm mb-5 opacity-90" style={{ color: TEXT_MUTED }}>
              {plan!.from && plan!.to && `${plan!.from} → ${plan!.to}`}
              {plan!.dates && ` · ${plan!.dates}`}
              {plan!.budget && ` · ${plan!.budget}`}
            </p>
            <ul className="space-y-3 mb-6">
              {plan!.items.map((it) => (
                <li
                  key={it.id}
                  className="px-4 py-3 rounded-xl border flex flex-wrap items-center justify-between gap-3"
                  style={{ borderColor: BORDER_LIGHT, backgroundColor: '#EDE6DC' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium" style={{ color: TEXT_ON_CREAM }}>{it.text}</p>
                    <span
                      className="inline-block mt-2 text-xs px-2.5 py-1 rounded-lg capitalize"
                      style={{
                        backgroundColor: it.priority === 'high' ? 'rgba(180, 80, 60, 0.2)' : it.priority === 'medium' ? 'rgba(125, 94, 60, 0.25)' : 'rgba(80, 100, 120, 0.2)',
                        color: TEXT_ON_CREAM,
                      }}
                    >
                      {it.priority}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {accepted ? (
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t" style={{ borderColor: BORDER_LIGHT }}>
                <span className="text-sm" style={{ color: TEXT_MUTED }}>Trip saved. View and manage it on your dashboard.</span>
                <Link
                  href="/dashboard"
                  className="font-serif-display text-sm font-medium px-5 py-2.5 rounded-full border transition-colors hover:opacity-95"
                  style={{ borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM, backgroundColor: 'rgba(125, 94, 60, 0.15)' }}
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={acceptTrip}
                className="font-serif-display px-8 py-3.5 rounded-full border font-medium transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: BORDER_LIGHT, color: TEXT_ON_CREAM, backgroundColor: 'rgba(125, 94, 60, 0.25)' }}
              >
                Accept trip & add to dashboard
              </button>
            )}
          </section>
        )}

        </div>
    </div>
  );
}
