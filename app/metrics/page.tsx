'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/footer';

const BORDER_LIGHT = 'rgba(125, 94, 60, 0.45)';
const BOX_CREAM = '#F5F0E8';
const TEXT_ON_CREAM = '#2C1810';
const TEXT_MUTED = '#5C4A3A';

interface Metric {
  name: string;
  value: number;
  unit: string;
  trend?: string;
  strategy?: string;
  opikTracked?: boolean;
}

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [summary, setSummary] = useState<{ opikEnabled?: boolean; message?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics || []);
        setSummary(data.summary || null);
      })
      .catch(() => setMetrics([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: '#1F0000' }}>
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#FFC6A4' }}>
          Metrics & Observability
        </h1>
        <p className="text-sm mb-8 opacity-90" style={{ color: '#D4AE98' }}>
          Opik integration — same pattern as encodehack. Trip generation and item actions are traced.
        </p>

        {summary?.message && (
          <div
            className="rounded-2xl border p-4 mb-6"
            style={{ borderColor: BORDER_LIGHT, backgroundColor: BOX_CREAM }}
          >
            <p className="text-sm" style={{ color: TEXT_ON_CREAM }}>{summary.message}</p>
          </div>
        )}

        {loading ? (
          <p className="text-sm" style={{ color: TEXT_MUTED }}>Loading…</p>
        ) : (
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ borderColor: BORDER_LIGHT, backgroundColor: BOX_CREAM }}
          >
            <h2 className="font-serif-display text-lg font-semibold mb-4" style={{ color: TEXT_ON_CREAM }}>
              Tracked metrics
            </h2>
            <ul className="space-y-3">
              {metrics.map((m) => (
                <li
                  key={m.name}
                  className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-opacity-20"
                  style={{ borderColor: BORDER_LIGHT }}
                >
                  <span className="font-medium" style={{ color: TEXT_ON_CREAM }}>{m.name}</span>
                  <span className="text-sm" style={{ color: TEXT_MUTED }}>
                    {m.value} {m.unit}
                    {m.strategy && ` · ${m.strategy}`}
                    {m.opikTracked && ' · Opik'}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs opacity-80" style={{ color: TEXT_MUTED }}>
              Set OPIK_API_KEY and OPIK_PROJECT_NAME in .env.local to send traces to Opik. View your project in the Opik dashboard for full data.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="font-serif-display text-sm font-medium px-5 py-2.5 rounded-full border transition-colors hover:opacity-90"
            style={{ borderColor: BORDER_LIGHT, color: '#FFC6A4' }}
          >
            Dashboard
          </Link>
          <Link
            href="/plan"
            className="font-serif-display text-sm font-medium px-5 py-2.5 rounded-full border transition-colors hover:opacity-90"
            style={{ borderColor: BORDER_LIGHT, color: '#FFC6A4' }}
          >
            Plan trip
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
