'use client';

import Link from 'next/link';

import React from 'react';
import MagicBento from './MagicBento';
import DotGrid from './DotGrid';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">
      {/* HERO */}
      <div className="relative pt-40 pb-16 px-4 md:px-8 lg:px-12 min-h-[100vh] flex items-center overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left side - Text content */}
          <div className="text-left">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Building on<br />
                <span className="text-[#01FF84]">Bitcoin Cash</span>
              </h1>
            </div>

            <div className="mb-8">
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Join the Bitcoin Cash hackathon and build innovative solutions across three tracks: Technology, Cashtoken Systems, and Applications.
              </p>
            </div>
          </div>

          {/* Right side - Circular dot grid with text */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] flex items-center justify-center">
              {/* Circular dot grid container */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <DotGrid
                  dotSize={2}
                  gap={20}
                  baseColor="#01FF84"
                  activeColor="#34FF98"
                  proximity={120}
                  shockRadius={250}
                  shockStrength={5}
                  resistance={750}
                  returnDuration={1.5}
                />
              </div>
              
              {/* Text in center */}
              <div className="relative z-10">
                <span className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">BCH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HACKATHON TRACKS SECTION */}
      <section className="relative z-10 px-4 py-16 mt-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-black mb-12 text-center">
            <span className="text-white">Hackathon </span>
            <span className="text-[#01FF84]">Tracks</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* TECHNOLOGY TRACK */}
            <div className="bg-black border border-white/20 rounded-lg p-8 relative overflow-hidden hover:border-[#01FF84] transition-all duration-300">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-black text-white mb-4">TECHNOLOGY TRACK</h3>
              <p className="text-white/80 mb-4">
                Innovative infrastructure, developer tooling, and middleware for building on Bitcoin Cash. This is for builders creating the scaffolding: contract compilers, minting SDKs, explorers, simulators, signing flows, APIs — anything that makes BCH and CashTokens easier to build with.
              </p>
              <p className="text-white/60 text-sm mb-4">
                Whether you're wrapping complexity, unlocking UTXO capabilities, or pioneering novel DeFi primitives, this track is about empowering others to build faster, better, and with less friction. If your project enables other builders, you're in Technology.
              </p>
              <div className="mt-4">
                <p className="text-[#01FF84] font-bold text-sm mb-2">What fits here?</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Contract compilers</li>
                  <li>• Minting SDKs</li>
                  <li>• Explorers & Simulators</li>
                  <li>• Signing flows & APIs</li>
                  <li>• Developer tooling</li>
                </ul>
              </div>
            </div>

            {/* CASHTOKEN SYSTEMS TRACK */}
            <div className="bg-black border border-white/20 rounded-lg p-8 relative overflow-hidden hover:border-[#01FF84] transition-all duration-300">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-black text-white mb-4">CASHTOKEN SYSTEMS TRACK</h3>
              <p className="text-white/80 mb-4">
                On-chain protocols, coordination layers, and incentive systems built with CashTokens. This track is for token-powered logic: DAOs, DEXs, launchpads, NFT economies, staking contracts, auctions, redemption flows, governance layers, and financial instruments.
              </p>
              <p className="text-white/60 text-sm mb-4">
                You're not just building an app — you're building a system. A shell. A behavior engine. A protocol someone else might plug into. If your project designs economic or coordination logic, you're in Cashtoken Systems.
              </p>
              <div className="mt-4">
                <p className="text-[#01FF84] font-bold text-sm mb-2">What fits here?</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• DAOs & DEXs</li>
                  <li>• Launchpads</li>
                  <li>• NFT economies</li>
                  <li>• Staking contracts</li>
                  <li>• Governance layers</li>
                </ul>
              </div>
            </div>

            {/* APPLICATIONS TRACK */}
            <div className="bg-black border border-white/20 rounded-lg p-8 relative overflow-hidden hover:border-[#01FF84] transition-all duration-300">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-black text-white mb-4">APPLICATIONS TRACK</h3>
              <p className="text-white/80 mb-4">
                User-facing apps, tools, and interfaces that activate Bitcoin Cash in the real world. This is for builders shipping apps people can actually use — wallets, dashboards, plugins, bots, payment flows, onboarding tools, or bridges between crypto and real-world utility.
              </p>
              <p className="text-white/60 text-sm mb-4">
                It doesn't need to invent a new contract — but it should deliver something usable, frictionless, and real. If your project connects BCH to people, purpose, or problems — you're in Applications.
              </p>
              <div className="mt-4">
                <p className="text-[#01FF84] font-bold text-sm mb-2">What fits here?</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Wallets & Dashboards</li>
                  <li>• Plugins & Bots</li>
                  <li>• Payment flows</li>
                  <li>• Onboarding tools</li>
                  <li>• Real-world bridges</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 px-4 py-16 mt-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-black mb-12 text-center">
            <span className="text-white">What are our </span>
            <span className="text-[#01FF84]">features</span>
          </h2>
          <div className="flex justify-center">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="1, 255, 132"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
