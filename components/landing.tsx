'use client';

import Link from 'next/link';

import React from 'react';


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

      <div className="relative pt-32 pb-8 px-4 mb-8">

        <div className="flex items-center justify-center">

          <div className="text-center">

            <div className="mb-4">

              <p className="text-sm font-black text-white bg-[#04130C] border border-[#0D5036] px-3 py-2 rounded-lg inline-block">Developer Guardrails for x402</p>

            </div>

            <div className="mb-4">

              <h2 className="text-5xl font-black text-[#01FF84] bg-black px-3 py-2 rounded-lg inline-block italic">x402-limit</h2>

            </div>

            <div>

              <p className="text-2xl font-black text-white max-w-2xl mx-auto">

                Define spend limits, rate limits, and usage quotas on x402 calls. Prevent abuse and overuse with powerful guardrails.

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-6">

      <Link href="/dashboard">

          <button className="bg-[#70E78A] border-2 border-[#04130C] shadow-[3px_3px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-black">View Dashboard</button>

        </Link>

        

          <Link href="/upload">

            <button className="bg-[#70E78A] border-2 border-[#04130C] shadow-[3px_3px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-black">Configure Limits</button>

          </Link>

        </div>

      {/* MAIN CONTENT - BENTO GRID */}

      <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">

        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">

          {/* Why x402-limit */}

          <div className="col-span-12 md:col-span-6 row-span-2 bg-black border-2 border-white shadow-[4px_2px_0_0_rgba(255,255,255,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#04130C] border border-[#0D5036] px-3 py-2 rounded-lg inline-block">Why x402-limit</h2>

            <p className="text-sm text-white leading-relaxed">Prevent unexpected costs and abuse with powerful guardrails for x402. Define spend limits to control budgets, set rate limits to prevent API abuse, and configure usage quotas to manage consumption. Protect your application from overuse while maintaining full control over x402 call behavior.</p>

          </div>

          {/* Key Features */}

          <div className="col-span-12 md:col-span-6 row-span-2 bg-black border-2 border-white shadow-[4px_2px_0_0_rgba(255,255,255,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#04130C] border border-[#0D5036] px-3 py-2 rounded-lg inline-block">Key Features</h2>

            <p className="text-sm text-white mb-4 leading-relaxed">Powerful guardrail capabilities:</p>

            <ul className="space-y-2 text-sm">

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#01FF84]"></span><span className="text-white font-semibold">Spend limits - Control budget and costs</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#01FF84]"></span><span className="text-white font-semibold">Rate limits - Prevent API abuse</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#01FF84]"></span><span className="text-white font-semibold">Usage quotas - Manage consumption</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#01FF84]"></span><span className="text-white font-semibold">Real-time monitoring & alerts</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#01FF84]"></span><span className="text-white font-semibold">SDK & API integration</span></li>

            </ul>

          </div>

          {/* How It Works */}

          <div className="col-span-12 md:col-span-8 row-span-2 bg-black border-2 border-white shadow-[4px_2px_0_0_rgba(255,255,255,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#04130C] border border-[#0D5036] px-3 py-2 rounded-lg inline-block">How It Works</h2>

            <p className="text-sm text-white mb-4 leading-relaxed">Set up guardrails in four simple steps:</p>

            <div className="space-y-3">

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#01FF84] mr-3">1</span><div><div className="font-bold text-white mb-1 text-sm">Configure Limits</div><div className="text-xs text-white">Define spend limits, rate limits, and usage quotas through our intuitive interface or SDK.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#01FF84] mr-3">2</span><div><div className="font-bold text-white mb-1 text-sm">Integrate SDK</div><div className="text-xs text-white">Add x402-limit SDK to your application to enforce guardrails on all x402 calls automatically.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#01FF84] mr-3">3</span><div><div className="font-bold text-white mb-1 text-sm">Monitor Usage</div><div className="text-xs text-white">Track real-time usage, spending, and rate limit status through the dashboard with detailed analytics.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#01FF84] mr-3">4</span><div><div className="font-bold text-white mb-1 text-sm">Automatic Enforcement</div><div className="text-xs text-white">When limits are reached, x402 calls are automatically blocked or throttled to prevent abuse and overuse.</div></div></div>

            </div>

          </div>

          {/* Developer Guardrails */}

          <div className="col-span-12 md:col-span-4 row-span-1 bg-black border-2 border-white shadow-[4px_2px_0_0_rgba(255,255,255,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h3 className="text-lg font-black mb-2 text-white bg-[#04130C] border border-[#0D5036] px-3 py-1 rounded-lg inline-block">Developer Guardrails</h3>

            <p className="text-white text-sm mt-2">x402-limit provides essential guardrails for developers using x402, preventing unexpected costs, API abuse, and overuse through configurable limits and real-time enforcement.</p>

          </div>

          {/* SDK & API */}

          <div className="col-span-12 md:col-span-4 row-span-1 bg-black border-2 border-white border-dashed shadow-[4px_2px_0_0_rgba(255,255,255,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h4 className="text-lg font-bold text-white bg-[#04130C] border border-[#0D5036] px-3 py-1 rounded-lg inline-block">SDK & API</h4>

            <p className="text-white text-sm mt-2 font-bold">Easy-to-use SDKs and REST APIs for defining limits, monitoring usage, and integrating guardrails into your x402-powered applications.</p>

          </div>

        </div>

        {/* WHAT YOU CAN BUILD SECTION */}
        <section className="relative z-10 px-4 py-16 border-t border-white/20 mt-12">
          <div className="max-w-3xl mx-auto">
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

        {/* FAQ SECTION - moved up */}

        <section className="relative z-10 px-4 py-16 border-t border-white/20 mt-12">

          <div className="max-w-3xl mx-auto">

            <h2 className="text-3xl text-white font-black mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">

              {faqs.map((faq, index) => (

                <div key={index} className="border-2 border-[#0D5036] rounded-2xl overflow-hidden bg-[#04130C]">

                  <button

                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}

                    className="w-full p-6 text-left flex items-center justify-between text-white hover:bg-[#0D5036] transition-all duration-300 focus:outline-none"

                  >

                    <span className="font-medium text-lg">{faq.q}</span>

                    <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>

                  </button>

                  {expandedFaq === index && (

                    <div className="px-6 pb-6 text-white animate-fade-in bg-[#04130C]">{faq.a}</div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* BE THE FIRST TO ZYPP SECTION */}
        <section className="relative z-10 px-4 py-16 border-t border-white/20 mt-12">
          <div className="max-w-2xl mx-auto text-center">
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

    </div>

  );

}

