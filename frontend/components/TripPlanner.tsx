'use client';

import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { getSavedTrips, saveTripsToStorage, type SavedTrip } from '@/lib/tripwise-storage';

const BORDER_LIGHT = 'rgba(125, 94, 60, 0.4)';
const CARD_BG = 'rgba(31, 0, 0, 0.5)';

interface TripSuggestion {
  id: string;
  type: 'flight' | 'hotel' | 'tip';
  summary: string;
  savings?: string;
  ballpark?: string;
}

function mockGetSuggestions(
  from: string,
  to: string,
  dates: string,
  budget: string,
  rawText: string
): TripSuggestion[] {
  const suggestions: TripSuggestion[] = [];
  if (from && to) {
    suggestions.push({
      id: 'flights',
      type: 'flight',
      summary: `${from} → ${to}`,
      ballpark: '~$280–420 roundtrip (economy, 2–4 weeks out)',
    });
    suggestions.push({
      id: 'hotels',
      type: 'hotel',
      summary: `${to} — 3 nights`,
      ballpark: '~$180–350 (mid-range)',
    });
    suggestions.push({
      id: 'tip1',
      type: 'tip',
      summary: 'You could save about $80–120 by shifting dates by ±2 days or flying mid-week.',
      savings: '$80–120',
    });
    suggestions.push({
      id: 'tip2',
      type: 'tip',
      summary: 'Nearby airports can cut $50–100; we can compare options if you share your dates.',
      savings: '$50–100',
    });
  }
  if (rawText.trim()) {
    suggestions.push({
      id: 'paste',
      type: 'tip',
      summary: "We'll use your pasted search to tailor suggestions. (Full agent + Opik coming in API.)",
    });
  }
  if (suggestions.length === 0) {
    suggestions.push({
      id: 'empty',
      type: 'tip',
      summary: 'Enter route (from → to), dates, and optional budget, or paste a search snippet to get started.',
    });
  }
  return suggestions;
}

export default function TripPlanner() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [dates, setDates] = useState('');
  const [budget, setBudget] = useState('');
  const [rawText, setRawText] = useState('');
  const [suggestions, setSuggestions] = useState<TripSuggestion[] | null>(null);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [acted, setActed] = useState<Set<string>>(new Set());

  const runPlan = useCallback(() => {
    const result = mockGetSuggestions(from, to, dates, budget, rawText);
    setSuggestions(result);
    setFeedback(null);
    if (from.trim() && to.trim()) {
      const previousTrips = getSavedTrips();
      const newTrip: SavedTrip = {
        id: `trip-${Date.now()}`,
        from: from.trim(),
        to: to.trim(),
        dates: dates.trim(),
        budget: budget.trim(),
        createdAt: Date.now(),
      };
      saveTripsToStorage([newTrip, ...previousTrips].slice(0, 24));
    }
  }, [from, to, dates, budget, rawText]);

  const toggleActed = useCallback((id: string) => {
    setActed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const hasInput = [from, to, dates, rawText].some((s) => s.trim().length > 0);
  const hasResults = suggestions && suggestions.length > 0;

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: '#1F0000' }}>
      {/* Hero — rounded, light border */}
      <section className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-8">
        <div
          className="relative rounded-3xl overflow-hidden border min-h-[200px] sm:min-h-[260px]"
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
              background: 'linear-gradient(to top, rgba(31,0,0,0.9) 0%, transparent 60%)',
            }}
          >
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1" style={{ color: '#FFC6A4' }}>
              Plan your trip
            </p>
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold mb-1" style={{ color: '#FFC6A4' }}>
              Get cost ballparks & savings
            </h1>
            <p className="text-sm sm:text-base max-w-xl opacity-90" style={{ color: '#D4AE98' }}>
              Flight and hotel estimates in plain language — no booking, no payments.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-8">
        {/* Form card — rounded, light border */}
        <section
          className="rounded-2xl p-6 sm:p-8 border"
          style={{ borderColor: BORDER_LIGHT, backgroundColor: CARD_BG }}
        >
          <h2 className="font-serif-display text-xl font-semibold mb-5" style={{ color: '#FFC6A4' }}>
            Trip details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From (city or airport)"
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/40 transition-shadow"
              style={{ backgroundColor: '#1F0000', borderColor: BORDER_LIGHT }}
            />
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To (city or airport)"
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/40 transition-shadow"
              style={{ backgroundColor: '#1F0000', borderColor: BORDER_LIGHT }}
            />
            <input
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="Dates (e.g. Dec 20–27)"
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/40 transition-shadow"
              style={{ backgroundColor: '#1F0000', borderColor: BORDER_LIGHT }}
            />
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Budget (optional, e.g. $800)"
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/40 transition-shadow"
              style={{ backgroundColor: '#1F0000', borderColor: BORDER_LIGHT }}
            />
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Or paste a search/booking snippet…"
            className="mt-4 w-full min-h-[88px] px-4 py-3 rounded-xl border text-white placeholder-white/50 resize-y focus:outline-none focus:ring-2 focus:ring-[#7D5E3C]/40 transition-shadow"
            style={{ backgroundColor: '#1F0000', borderColor: BORDER_LIGHT }}
            rows={3}
          />
          <button
            onClick={runPlan}
            disabled={!hasInput}
            className="mt-5 font-serif-display px-6 py-3 rounded-full border font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{
              borderColor: BORDER_LIGHT,
              color: '#FFC6A4',
              backgroundColor: hasInput ? 'rgba(125, 94, 60, 0.2)' : 'transparent',
            }}
          >
            Get suggestions
          </button>
        </section>

        {/* Results card */}
        {hasResults && (
          <section
            className="rounded-2xl p-6 sm:p-8 border"
            style={{ borderColor: BORDER_LIGHT, backgroundColor: CARD_BG }}
          >
            <h2 className="font-serif-display text-xl font-semibold mb-4" style={{ color: '#FFC6A4' }}>
              Cost breakdown & savings
            </h2>
            <ul className="space-y-3">
              {suggestions!.map((s) => (
                <li
                  key={s.id}
                  className="px-4 py-3 rounded-xl border flex flex-wrap items-center justify-between gap-3"
                  style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31, 0, 0, 0.35)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium" style={{ color: '#FFC6A4' }}>
                      {s.summary}
                    </p>
                    {s.ballpark && (
                      <p className="text-sm mt-1 opacity-90" style={{ color: '#D4AE98' }}>
                        {s.ballpark}
                      </p>
                    )}
                    {s.savings && (
                      <span
                        className="inline-block mt-2 text-sm px-2.5 py-1 rounded-lg"
                        style={{ backgroundColor: 'rgba(125, 94, 60, 0.4)', color: '#FFC6A4' }}
                      >
                        Save {s.savings}
                      </span>
                    )}
                  </div>
                  {s.type === 'tip' && (
                    <button
                      type="button"
                      onClick={() => toggleActed(s.id)}
                      className="text-sm px-3 py-2 rounded-full border shrink-0 transition-colors"
                      style={{
                        borderColor: BORDER_LIGHT,
                        color: acted.has(s.id) ? '#D4AE98' : '#FFC6A4',
                        backgroundColor: acted.has(s.id) ? 'rgba(125, 94, 60, 0.3)' : 'transparent',
                      }}
                    >
                      {acted.has(s.id) ? '✓ Acted' : 'I did this'}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div
              className="flex flex-wrap items-center gap-4 pt-4 mt-4 border-t"
              style={{ borderColor: BORDER_LIGHT }}
            >
              <span className="text-sm" style={{ color: '#FFC6A4' }}>
                Was this helpful?
              </span>
              <button
                type="button"
                onClick={() => setFeedback('up')}
                className="p-2 rounded-full border transition-colors"
                style={{
                  borderColor: BORDER_LIGHT,
                  color: feedback === 'up' ? '#D4AE98' : '#FFC6A4',
                  backgroundColor: feedback === 'up' ? 'rgba(125, 94, 60, 0.25)' : 'transparent',
                }}
                aria-label="Thumbs up"
              >
                👍
              </button>
              <button
                type="button"
                onClick={() => setFeedback('down')}
                className="p-2 rounded-full border transition-colors"
                style={{
                  borderColor: BORDER_LIGHT,
                  color: feedback === 'down' ? '#D4AE98' : '#FFC6A4',
                  backgroundColor: feedback === 'down' ? 'rgba(125, 94, 60, 0.25)' : 'transparent',
                }}
                aria-label="Thumbs down"
              >
                👎
              </button>
              {feedback && (
                <span className="text-sm opacity-80" style={{ color: '#FFC6A4' }}>
                  Thanks — we'll use this to improve.
                </span>
              )}
            </div>
          </section>
        )}

        </div>
    </div>
  );
}
