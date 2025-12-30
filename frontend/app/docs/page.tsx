'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/footer';

export default function DocsPage() {
  const [activeSection, setActiveSection] = React.useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'installation', title: 'Installation' },
    { id: 'configuration', title: 'Configuration' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'examples', title: 'Examples' },
  ];

  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">
      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#01FF84] mb-4">SDK Documentation</h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Complete guide to integrating PayGate multi-token checkout into your application
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-black border border-white/20 p-4 rounded-2xl sticky top-24">
                <h3 className="text-lg font-black text-[#01FF84] mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-[#04130C] border border-[#0D5036] text-[#01FF84] font-bold'
                          : 'text-white/80 hover:text-white hover:bg-[#04130C]'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-3">
              <div className="bg-black border border-white/20 p-8 rounded-2xl">
                {activeSection === 'getting-started' && (
                  <div>
                    <h3 className="text-2xl font-black text-[#01FF84] mb-4">Getting Started</h3>
                    <p className="text-white/80 mb-6">
                      PayGate is a multi-token checkout SDK that enables unified one-click checkout for Web3 merchants. 
                      Customers can pay with any combination of supported tokens, while merchants receive their preferred settlement token.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg">
                        <h4 className="font-bold text-white mb-2">Key Features</h4>
                        <ul className="list-disc list-inside space-y-1 text-white/80 text-sm">
                          <li>Multi-token payment support</li>
                          <li>Real-time price feeds from Chainlink & Mantle</li>
                          <li>Atomic transactions via SwapRouter</li>
                          <li>Gas-efficient on Mantle EVM</li>
                          <li>Composable SDK for developers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'installation' && (
                  <div>
                    <h3 className="text-2xl font-black text-[#01FF84] mb-4">Installation</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">NPM</h4>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg">
                          <code className="text-[#01FF84]">npm install @paygate/mantle-sdk</code>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Yarn</h4>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg">
                          <code className="text-[#01FF84]">yarn add @paygate/mantle-sdk</code>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">PNPM</h4>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg">
                          <code className="text-[#01FF84]">pnpm add @paygate/mantle-sdk</code>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'configuration' && (
                  <div>
                    <h3 className="text-2xl font-black text-[#01FF84] mb-4">Configuration</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">Basic Setup</h4>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg overflow-x-auto">
                          <pre className="text-[#01FF84] text-sm">
{`import { PayGate } from '@paygate/mantle-sdk';

const paygate = new PayGate({
  network: 'mantle',
  settlementToken: 'PYUSD', // or 'mUSD'
  priceFeedProvider: 'chainlink', // or 'mantle'
});`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Supported Tokens</h4>
                        <p className="text-white/80 text-sm mb-2">
                          PayGate supports all major tokens on Mantle network:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['USDC', 'ETH', 'MNT', 'PYUSD', 'mUSD', 'WBTC', 'USDT'].map((token) => (
                            <span key={token} className="bg-[#04130C] border border-[#0D5036] px-3 py-1 rounded text-[#01FF84] text-sm font-mono">
                              {token}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'api-reference' && (
                  <div>
                    <h3 className="text-2xl font-black text-[#01FF84] mb-4">API Reference</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">initializeCheckout</h4>
                        <p className="text-white/80 text-sm mb-2">Initialize a new checkout session</p>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg overflow-x-auto">
                          <pre className="text-[#01FF84] text-sm">
{`paygate.initializeCheckout({
  amount: 100, // USD equivalent
  merchantAddress: '0x...',
  onSuccess: (txHash) => {
    console.log('Transaction:', txHash);
  }
});`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">getTokenPrices</h4>
                        <p className="text-white/80 text-sm mb-2">Fetch real-time token prices</p>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg overflow-x-auto">
                          <pre className="text-[#01FF84] text-sm">
{`const prices = await paygate.getTokenPrices();
// Returns: { USDC: 1.0, ETH: 2500, MNT: 0.5, ... }`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'examples' && (
                  <div>
                    <h3 className="text-2xl font-black text-[#01FF84] mb-4">Examples</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-white mb-2">Basic Checkout</h4>
                        <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg overflow-x-auto">
                          <pre className="text-[#01FF84] text-sm">
{`import { PayGate } from '@paygate/mantle-sdk';

const paygate = new PayGate({
  network: 'mantle',
  settlementToken: 'PYUSD'
});

// Initialize checkout
await paygate.initializeCheckout({
  amount: 100,
  merchantAddress: '0xYourMerchantAddress',
  tokenAllocation: {
    USDC: 40,
    ETH: 30,
    MNT: 30
  }
});`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Link href="/checkout">
                  <button className="bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                    Try Checkout Demo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

