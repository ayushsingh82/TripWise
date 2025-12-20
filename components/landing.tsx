'use client';

import Link from 'next/link';

import React from 'react';
import GradientBlinds from './GradientBlinds';
import MagicBento from './MagicBento';


const faqs = [

  {

    q: 'What is x402-limit?',

    a: 'x402-limit is a developer guardrail system for x402 that allows you to define spend limits, rate limits, and usage quotas on x402 calls. It prevents abuse and overuse by enforcing configurable constraints on API usage, helping developers control costs and protect their applications.'

  },

  {

    q: 'How do spend limits work?',

    a: 'Spend limits allow you to set maximum spending thresholds for x402 calls over a specific time period. Once the limit is reached, further calls are blocked until the limit resets. This helps prevent unexpected costs and budget overruns.'

  },

  {

    q: 'What are rate limits?',

    a: 'Rate limits control the frequency of x402 calls, preventing too many requests in a short time period. You can configure limits like "100 calls per minute" or "1000 calls per hour" to prevent abuse and ensure fair usage across your application.'

  },

  {

    q: 'How are usage quotas enforced?',

    a: 'Usage quotas track total consumption over a billing period (daily, weekly, monthly). When a quota is exceeded, x402 calls are automatically blocked. Quotas can be set per API endpoint, user, or application-wide, giving you granular control over usage.'

  },

];

export default function Landing() {

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (

    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">


     

      {/* HERO */}

      <div className="relative pt-32 pb-16 px-4 min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* GradientBlinds Background */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-90">
          <GradientBlinds
            gradientColors={['#000000', '#04130C', '#0D5036', '#0D5036', '#01FF84']}
            angle={35}
            noise={0.25}
            blindCount={18}
            blindMinWidth={35}
            spotlightRadius={0.7}
            spotlightSoftness={0.7}
            spotlightOpacity={1.5}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="screen"
          />
        </div>

        <div className="text-center w-full relative z-10">

          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              Developer Guardrails for<br />
              <span className="text-[#01FF84]">x402</span> on Mantle
            </h1>
          </div>

          <div className="mb-8">
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Prevent unnecessary usage and control spending limits with powerful guardrails on Mantle blockchain.
            </p>
          </div>

            <div>
            <button className="bg-[#70E78A] border border-transparent rounded-full px-6 py-2 text-sm font-bold text-black">
              Get early access
            </button>
          </div>

        </div>

      </div>

      {/* 4 BOXES SECTION */}
      <div className="max-w-5xl mx-auto px-4 pb-0 mt-16">
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
      <section className="relative z-10 px-4 py-16 mt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
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

      {/* WHAT YOU CAN BUILD SECTION */}
      <section className="relative z-10 px-4 py-16  mt-12 overflow-hidden min-h-[50vh] flex items-center">
        {/* Green shadow from left */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#01FF84]/20 to-transparent pointer-events-none"></div>
        {/* Green shadow from right */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#01FF84]/20 to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 w-full">
          <h2 className="text-3xl font-black mb-8 text-center">
            <span className="text-white">What You Can </span>
            <span className="text-[#01FF84]">Build</span>
          </h2>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">Offline NFT Marketplaces</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">P2P Token Swaps</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">Local Content Sharing</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">In-Game Item Trading</span>
            <span className="bg-[#04130C] border border-[#0D5036] text-white px-4 py-2 rounded-lg text-sm font-bold">Decentralized File Sharing</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button className="bg-[#70E78A] border border-transparent rounded-full px-6 py-2 text-sm font-bold text-black">Get early access</button>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}

        <section className="relative z-10 px-4 py-8  mt-0">

          <div className="max-w-3xl mx-auto">

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

        {/* BE THE FIRST TO ZYPP SECTION */}
        <section className="relative z-10 px-4 py-16 mt-0 overflow-hidden min-h-[50vh] flex items-center">
          {/* Green shadow from left */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#01FF84]/20 to-transparent pointer-events-none"></div>
          {/* Green shadow from right */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#01FF84]/20 to-transparent pointer-events-none"></div>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-black mb-4">
              <span className="text-white">Be the First to </span>
              <span className="text-[#01FF84]">x402-limit</span>
            </h2>
            
            <p className="text-white/80 mb-8 text-lg">
              Be the first to experience the future of offline crypto transactions. Join our waitlist to get early access, exclusive updates, and special offers.
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

