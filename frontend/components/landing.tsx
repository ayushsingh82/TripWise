'use client';

import Link from 'next/link';

import React from 'react';
import MagicBento from './MagicBento';
import DotGrid from './DotGrid';


const faqs = [

  {

    q: 'What is PayGate?',

    a: 'PayGate is a unified one-click checkout SDK for Web3 that lets users pay any on-chain merchant in a single transaction, even when their wallet holds fragmented assets. Users can combine multiple tokens (e.g., 40% USDC + 30% ETH + 30% MNT) to cover purchases seamlessly.'

  },

  {

    q: 'How does multi-token checkout work?',

    a: 'At checkout, PayGate fetches real-time prices from Chainlink or Mantle data feeds, displays the total value of each token in your wallet, and lets you combine them to cover the purchase. The SwapRouter smart contract aggregates all swaps and transfers in one atomic transaction—you sign only once.'

  },

  {

    q: 'What tokens can merchants receive?',

    a: 'Merchants can receive their preferred settlement token, such as PYUSD or mUSD. The SwapRouter handles all token conversions automatically, ensuring merchants get paid in their chosen currency while users pay with any combination of supported tokens.'

  },

  {

    q: 'Is PayGate gas-efficient?',

    a: 'Yes! PayGate uses Mantle\'s EVM to aggregate all swaps and transfers in a single atomic call. This means lower gas costs compared to multiple separate transactions, while maintaining full transparency and composability for developers via the @paygate/mantle-sdk.'

  },

];

export default function Landing() {

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (

    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">


     

      {/* HERO */}

      <div className="relative pt-40 pb-16 px-4 md:px-8 lg:px-12 min-h-[100vh] flex items-center overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left side - Text content */}
          <div className="text-left">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Unified One-Click<br />
                <span className="text-[#01FF84]">Checkout for Web3</span>
              </h1>
            </div>

            <div className="mb-8">
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Pay any on-chain merchant with fragmented assets in a single transaction. Combine tokens like 40% USDC + 30% ETH + 30% MNT—all in one click.
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/checkout">
                <button className="bg-[#70E78A] border border-transparent rounded-full px-6 py-2 text-sm font-bold text-black hover:bg-[#34FF98] transition-colors">
                  Try Checkout Demo
                </button>
              </Link>
              <Link href="/docs">
                <button className="border-2 border-white rounded-full px-6 py-2 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors">
                  View SDK Docs
                </button>
              </Link>
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
                <span className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">PayGate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 BOXES SECTION */}
      <div className="max-w-5xl mx-auto px-4 pb-0 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black border border-transparent rounded-lg p-8">
        </div>
          <div className="bg-black border border-transparent rounded-lg p-8">
          </div>
          <div className="bg-black border border-transparent rounded-lg p-8">
          </div>
          <div className="bg-black border border-transparent rounded-lg p-8">
          </div>
        </div>
            </div>

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

      {/* WHAT YOU CAN BUILD & FAQ SECTION */}
      <section className="relative z-10 px-4 py-16 mt-0 overflow-hidden">
        {/* Green shadow from left */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#01FF84]/20 to-transparent pointer-events-none"></div>
        {/* Green shadow from right */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#01FF84]/20 to-transparent pointer-events-none"></div>
        
        {/* WHAT YOU CAN BUILD */}
        <div className="max-w-3xl mx-auto relative z-10 w-full mb-16">
          <h2 className="text-3xl font-black mb-8 text-center">
            <span className="text-white">What You Can </span>
            <span className="text-[#01FF84]">Build</span>
          </h2>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">NFT Marketplaces</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">DeFi Platforms</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">Web3 E-commerce</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">Gaming Marketplaces</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">Subscription Services</span>
          </div>

          <div className="flex items-center justify-center gap-4">

          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto relative z-10">

            <h2 className="text-3xl text-white font-black mb-8 mt-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">

              {faqs.map((faq, index) => (

                <div key={index} className="bg-black border border-white/20 relative overflow-hidden">

                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>

                  <button

                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}

                    className="w-full p-6 text-left flex items-center justify-between text-white hover:bg-[#04130C] transition-all duration-300 focus:outline-none relative z-10"

                  >

                    <span className="font-medium text-lg">{faq.q}</span>

                    <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>

                  </button>

                  {expandedFaq === index && (

                    <div className="px-6 pb-6 text-white animate-fade-in bg-black relative z-10">{faq.a}</div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* BE THE FIRST TO PAYGATE SECTION */}
        <section className="relative z-10 px-4 py-16 mt-0 overflow-hidden min-h-[50vh] flex items-center">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-black mb-4">
              <span className="text-white">Be the First to </span>
              <span className="text-[#01FF84]">PayGate</span>
            </h2>
            
            <p className="text-white/80 mb-8 text-lg">
              Experience the future of Web3 checkout. Join our waitlist to get early access, exclusive updates, and special offers for merchants and developers.
            </p>

            <form className="relative max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-white/20 rounded-lg px-4 py-3 pr-32 text-white bg-black focus:outline-none placeholder:text-white/40"
                required
              />
              <button
                type="submit"
                className="absolute top-2 right-2 bg-[#70E78A] border border-transparent rounded-full px-4 py-1.5 text-sm font-bold text-black"
              >
                Join the waitlist
              </button>
            </form>
      </div>
        </section>

    </div>

  );

}

