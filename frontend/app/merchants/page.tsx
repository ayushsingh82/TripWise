'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/footer';

export default function MerchantsPage() {
  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">
      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#01FF84] mb-4">For Merchants</h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Accept payments in your preferred token while customers pay with any combination of supported tokens
            </p>
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-black border border-white/20 p-6 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <h3 className="text-xl font-black text-[#01FF84] mb-3">Choose Your Settlement Token</h3>
              <p className="text-white/80">
                Receive payments in PYUSD, mUSD, or any preferred stablecoin. The SwapRouter handles all conversions automatically.
              </p>
            </div>

            <div className="bg-black border border-white/20 p-6 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <h3 className="text-xl font-black text-[#01FF84] mb-3">One-Click Integration</h3>
              <p className="text-white/80">
                Integrate PayGate SDK in minutes. Simple API calls, comprehensive documentation, and full composability with your existing stack.
              </p>
            </div>

            <div className="bg-black border border-white/20 p-6 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <h3 className="text-xl font-black text-[#01FF84] mb-3">Gas-Efficient Transactions</h3>
              <p className="text-white/80">
                All swaps and transfers are aggregated in a single atomic transaction on Mantle's EVM, reducing gas costs for both you and your customers.
              </p>
            </div>

            <div className="bg-black border border-white/20 p-6 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <h3 className="text-xl font-black text-[#01FF84] mb-3">Real-Time Price Feeds</h3>
              <p className="text-white/80">
                Powered by Chainlink and Mantle data feeds for accurate, real-time token pricing. Customers see exact values before checkout.
              </p>
            </div>
          </div>

          {/* INTEGRATION STEPS */}
          <div className="bg-black border border-white/20 p-8 rounded-2xl mb-12">
            <h3 className="text-2xl font-black text-[#01FF84] mb-6">Quick Integration</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#01FF84] text-black rounded-full flex items-center justify-center font-black">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Install the SDK</h4>
                  <p className="text-white/80 text-sm">
                    <code className="bg-[#04130C] border border-[#0D5036] px-2 py-1 rounded text-[#01FF84]">
                      npm install @paygate/mantle-sdk
                    </code>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#01FF84] text-black rounded-full flex items-center justify-center font-black">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Configure Your Settlement Token</h4>
                  <p className="text-white/80 text-sm">
                    Set your preferred token (PYUSD, mUSD, etc.) in the merchant configuration.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#01FF84] text-black rounded-full flex items-center justify-center font-black">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Initialize Checkout</h4>
                  <p className="text-white/80 text-sm">
                    Use the PayGate checkout component in your application. Customers can combine any supported tokens.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#01FF84] text-black rounded-full flex items-center justify-center font-black">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Receive Payments</h4>
                  <p className="text-white/80 text-sm">
                    All payments are automatically converted to your settlement token via the SwapRouter contract.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA SECTION */}
          <div className="text-center">
            <Link href="/docs">
              <button className="bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                View SDK Documentation
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

