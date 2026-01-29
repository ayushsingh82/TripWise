'use client';

import Link from 'next/link';
import React from 'react';
import LightPillar from './LightPillar';

export default function Landing() {
  return (
    <div
      className="min-h-screen w-full text-white transition-colors relative z-10 overflow-hidden font-sans"
      style={{ backgroundColor: '#1F0000' }}
    >
      {/* Full hero with LightPillar as background */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <LightPillar
            topColor="#D4AE98"
            bottomColor="#D8B6A0"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

        {/* Centered content — ColorPage theme */}
        <main className="relative z-10 w-full flex items-center justify-center min-h-screen px-4 sm:px-8 pt-20 pb-12">
          <div className="text-center max-w-5xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-3">
                {/* Small pill — border brown, text #FFC6A4 */}
                <div className="inline-flex items-center justify-center">
                  <p
                    className="text-sm sm:text-base flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border-2 rounded-full font-sans backdrop-blur-sm"
                    style={{ borderColor: '#7D5E3C', color: '#FFC6A4' }}
                  >
                    Comik Hackathon · Financial Health
                  </p>
                </div>

                {/* Main headline — gradient text like reference */}
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-display font-medium leading-tight drop-shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #D4AE98, #D8B6A0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  TripWise
                  <br />
                  <span className="italic" style={{ background: 'none', WebkitTextFillColor: '#FFC6A4', color: '#FFC6A4' }}>Travel budget agent.</span>
                </h1>

                {/* Subtext — gradient */}
                <p
                  className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-sans drop-shadow-md opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #D4AE98, #D8B6A0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Understand flight and hotel costs, get savings in plain language. Smarter travel choices, no overwhelm.
                </p>
              </div>
            </div>

            {/* CTA button — outline like Sign up */}
            <div className="mt-8 sm:mt-10 flex items-center justify-center">
              <Link href="/plan">
                <button
                  className="text-lg font-medium px-8 py-4 rounded-full transition-all hover:opacity-90 border-2"
                  style={{ backgroundColor: 'transparent', borderColor: '#7D5E3C', color: '#FFC6A4' }}
                >
                  Plan trip
                </button>
              </Link>
            </div>
          </div>
        </main>
      </header>
    </div>
  );
}
