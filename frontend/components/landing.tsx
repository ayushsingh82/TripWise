'use client';

import Link from 'next/link';
import React from 'react';
import LightPillar from './LightPillar';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white transition-colors relative z-10 overflow-hidden">
      {/* Full hero with LightPillar as background */}
      <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <LightPillar
            topColor="#37ff29"
            bottomColor="#9effb6"
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

        {/* Centered content — same structure as reference */}
        <main className="relative z-10 w-full flex items-center justify-center min-h-screen px-4 sm:px-8 pt-20 pb-12">
          <div className="text-center max-w-5xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              {/* Small pill above headline */}
              <div className="inline-flex items-center justify-center mb-2 sm:mb-4">
                <p className="text-sm sm:text-base lg:text-xl text-white/80 flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border border-white/20 rounded-full font-sans bg-black/40 backdrop-blur-sm">
                  Comik Hackathon · Financial Health
                </p>
              </div>

              {/* Main headline — punchy lines with green highlights */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold font-serif-display mb-6 leading-normal text-white drop-shadow-xl">
                <span className="whitespace-nowrap">
                  <span className="text-[#01FF84]">encode-hack</span>
                </span>
                <br />
                Subscription <span className="px-2 bg-[#01FF84] text-black">Audit</span>.
                <br />
                Keep, <span className="px-2 bg-[#01FF84] text-black">Reduce</span>, or <span className="px-2 bg-[#01FF84] text-black">Cancel</span>.
              </h1>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 leading-relaxed font-sans drop-shadow-md">
                Audit your recurring charges in plain language. No product pitches, no judgment.
              </p>
            </div>

            {/* CTA button */}
            <div className="mt-8 sm:mt-10 flex items-center justify-center">
              <Link href="/audit">
                <button className="px-8 py-3 bg-[#01FF84] text-black rounded-sm font-medium text-lg hover:bg-[#34FF98] transition-all duration-200 border border-transparent relative group overflow-hidden">
                  <span className="relative z-10">Start audit</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </main>
      </header>
    </div>
  );
}
