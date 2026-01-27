'use client';

import React, { useState, useCallback } from 'react';

type Suggestion = 'keep' | 'reduce' | 'cancel';

interface RecurringItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  frequency: string;
  suggestion: Suggestion;
  reason: string;
}

const SUGGESTION_STYLES: Record<Suggestion, string> = {
  keep: 'bg-[#01FF84]/20 text-[#01FF84] border-[#01FF84]/40',
  reduce: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  cancel: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
};

const SUGGESTION_LABELS: Record<Suggestion, string> = {
  keep: 'Keep',
  reduce: 'Consider reducing',
  cancel: 'Consider canceling',
};

// Mock parser: in production this would call your backend/Opik pipeline
function parseTransactions(raw: string, monthlyIncome?: number): RecurringItem[] {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const header = lines[0].toLowerCase();
  const isCSV = header.includes('date') || header.includes('amount') || header.includes('description') || header.includes('merchant');
  const rows = isCSV ? lines.slice(1) : lines;
  const items: RecurringItem[] = [];
  const seen = new Set<string>();
  rows.forEach((row, i) => {
    const parts = row.split(/[\t,]/).map((p) => p.trim());
    const amount = parseFloat(parts[1] ?? parts[parts.length - 1] ?? '0') || 0;
    const name = (parts[2] ?? parts[0] ?? `Transaction ${i + 1}`).slice(0, 40);
    if (!name || seen.has(name)) return;
    seen.add(name);
    let suggestion: Suggestion = 'keep';
    let reason = 'Recurring charge — review if you still use it.';
    if (amount > 50) {
      suggestion = 'reduce';
      reason = 'Higher monthly spend — check for cheaper plans or annual billing.';
    }
    if (amount > 100 || name.toLowerCase().includes('unused') || name.toLowerCase().includes('old')) {
      suggestion = 'cancel';
      reason = 'Worth checking if you still need this.';
    }
    const category = amount > 30 ? 'Streaming / Software' : 'Utilities / Other';
    items.push({
      id: `item-${i}`,
      name,
      category,
      amount,
      frequency: 'monthly',
      suggestion,
      reason,
    });
  });
  return items.slice(0, 12); // cap for demo
}

function formatSummary(items: RecurringItem[]): string {
  const total = items.reduce((s, i) => s + i.amount, 0);
  const bySuggestion = { keep: 0, reduce: 0, cancel: 0 };
  items.forEach((i) => bySuggestion[i.suggestion]++);
  const parts: string[] = [];
  parts.push(`We found ${items.length} recurring charges totaling about $${total.toFixed(0)}/month.`);
  if (bySuggestion.cancel) parts.push(`${bySuggestion.cancel} subscription${bySuggestion.cancel > 1 ? 's' : ''} to review for possible cancellation.`);
  if (bySuggestion.reduce) parts.push(`${bySuggestion.reduce} where a cheaper plan or annual billing might help.`);
  if (bySuggestion.keep) parts.push(`The rest look reasonable to keep — no product recommendations, just options.`);
  return parts.join(' ');
}

export default function SubscriptionAudit() {
  const [input, setInput] = useState('');
  const [income, setIncome] = useState('');
  const [results, setResults] = useState<RecurringItem[] | null>(null);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const runAnalysis = useCallback(() => {
    if (!input.trim()) return;
    const monthlyIncome = income ? parseFloat(income.replace(/[^0-9.]/g, '')) : undefined;
    const items = parseTransactions(input, monthlyIncome);
    setResults(items);
    setFeedback(null);
  }, [input, income]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setInput(String(reader.result ?? ''));
    };
    reader.onerror = () => setFileError('Could not read file.');
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const hasResults = results && results.length > 0;
  const summary = hasResults ? formatSummary(results) : '';

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <section className="relative border-b border-white/20 pt-8">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <p className="text-[#01FF84]/90 text-sm font-medium uppercase tracking-wider mb-2">Comik Hackathon · Financial Health</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            <span className="text-[#01FF84]">encode-hack</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Subscription & Recurring Charge Audit — no product pitches, no judgment. Paste transactions or upload a CSV; we suggest keep / reduce / cancel in plain language.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Input */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Your transactions</h2>
          <div className="flex flex-wrap gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black border border-white/20 hover:border-[#01FF84]/50 cursor-pointer transition-colors">
              <input type="file" accept=".csv,.txt" onChange={handleFile} className="sr-only" />
              <span className="text-[#01FF84]">Upload CSV</span>
            </label>
            <span className="text-white/50 py-2">or paste below</span>
          </div>
          {fileError && <p className="text-rose-400 text-sm">{fileError}</p>}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste transactions (e.g. Date, Amount, Description) or one per line: 2024-01-15, 14.99, Streaming Service"
            className="w-full min-h-[140px] px-4 py-3 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:border-[#01FF84]/60 focus:outline-none focus:ring-1 focus:ring-[#01FF84]/40 resize-y"
            rows={5}
          />
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="text-white/80 text-sm">Optional: monthly income $</span>
              <input
                type="text"
                inputMode="numeric"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 5000"
                className="w-28 px-3 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:border-[#01FF84]/60 focus:outline-none"
              />
            </label>
            <button
              onClick={runAnalysis}
              disabled={!input.trim()}
              className="px-5 py-2.5 rounded-lg bg-[#01FF84] text-black font-semibold hover:bg-[#34FF98] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Analyze
            </button>
          </div>
        </section>

        {/* Results */}
        {results !== null && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Recurring charges</h2>
            {hasResults ? (
              <>
                <div className="rounded-lg border border-white/20 divide-y divide-white/20 overflow-hidden">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 bg-black hover:bg-white/[0.04] transition-colors"
                    >
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-white/50">{item.category} · ${item.amount.toFixed(2)}/{item.frequency}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <span className={`inline-flex px-3 py-1 rounded-md border text-sm font-medium ${SUGGESTION_STYLES[item.suggestion]}`}>
                          {SUGGESTION_LABELS[item.suggestion]}
                        </span>
                        <p className="text-sm text-white/60 max-w-xs text-right">{item.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-[#01FF84]/10 border border-[#01FF84]/20">
                  <p className="text-white/90 leading-relaxed">{summary}</p>
                </div>
                {/* Feedback for Opik */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-sm text-white/60">Was this useful?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFeedback('up')}
                      className={`p-2 rounded-lg border transition-colors ${feedback === 'up' ? 'bg-[#01FF84]/20 border-[#01FF84]/50 text-[#01FF84]' : 'bg-black border-white/20 hover:border-white/30'}`}
                      aria-label="Yes, useful"
                    >
                      <span className="text-lg">👍</span>
                    </button>
                    <button
                      onClick={() => setFeedback('down')}
                      className={`p-2 rounded-lg border transition-colors ${feedback === 'down' ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-black border-white/20 hover:border-white/30'}`}
                      aria-label="Not really"
                    >
                      <span className="text-lg">👎</span>
                    </button>
                  </div>
                  {feedback && (
                    <span className="text-sm text-white/50">
                      {feedback === 'up' ? 'Thanks — we’ll use this to improve.' : 'We’ll tune suggestions based on feedback.'}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <p className="text-white/60">No recurring-looking transactions detected. Add a few rows (date, amount, description) and try again.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
