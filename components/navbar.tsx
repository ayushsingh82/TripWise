'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <div className="relative z-10 pt-6 px-6">
        <nav
          className="mx-auto max-w-7xl rounded-full border backdrop-blur-md px-6 py-2 sm:px-8 sm:py-2 flex items-center justify-between"
          style={{ backgroundColor: 'rgba(31, 0, 0, 0.85)', borderColor: 'rgba(125, 94, 60, 0.45)' }}
        >
          <Link href="/" className="focus:outline-none shrink-0">
            <span
              className="font-serif-display font-bold text-xl sm:text-2xl tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #D4AE98, #D8B6A0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              TripWise
            </span>
          </Link>
          <div className="flex-1 flex items-center justify-center gap-4 sm:gap-6 px-4">
            <Link
              href="/dashboard"
              className="font-serif-display text-sm font-medium transition-colors hover:opacity-90"
              style={{ color: '#FFC6A4' }}
            >
              Dashboard
            </Link>
            <Link
              href="/plan"
              className="font-serif-display text-sm font-medium transition-colors hover:opacity-90"
              style={{ color: '#FFC6A4' }}
            >
              Plan
            </Link>
            <Link
              href="/metrics"
              className="font-serif-display text-sm font-medium transition-colors hover:opacity-90"
              style={{ color: '#FFC6A4' }}
            >
              Metrics
            </Link>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <Link
              href="/login"
              className="font-serif-display text-sm sm:text-base font-medium transition-colors hover:opacity-90"
              style={{ color: '#FFC6A4' }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="font-serif-display text-sm sm:text-base font-medium transition-colors hover:opacity-90"
              style={{ color: '#FFC6A4' }}
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
