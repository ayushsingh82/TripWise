'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Footer from '@/components/footer';

export default function CheckoutDemoPage() {
  const { isConnected } = useAccount();
  const [selectedTokens, setSelectedTokens] = React.useState<{[key: string]: number}>({
    USDC: 40,
    ETH: 30,
    MNT: 30,
  });
  const [totalAmount] = React.useState(100); // USD equivalent

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', balance: 500, price: 1.0 },
    { symbol: 'ETH', name: 'Ethereum', balance: 2.5, price: 2500 },
    { symbol: 'MNT', name: 'Mantle', balance: 1000, price: 0.5 },
  ];

  const handleTokenChange = (symbol: string, percentage: number) => {
    const newSelected = { ...selectedTokens };
    newSelected[symbol] = percentage;
    setSelectedTokens(newSelected);
  };

  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">
      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#01FF84] mb-4">Checkout Demo</h2>
            <p className="text-lg text-white">Experience multi-token checkout in action</p>
          </div>

          {!isConnected ? (
            <div className="bg-black border border-white/20 p-8 rounded-2xl text-center">
              <p className="text-white mb-6">Connect your wallet to try the checkout demo</p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ORDER SUMMARY */}
              <div className="bg-black border border-white/20 p-6 rounded-2xl">
                <h3 className="text-xl font-black text-[#01FF84] mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>Product</span>
                    <span className="font-bold">Premium NFT Collection</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Total Amount</span>
                    <span className="font-bold text-[#01FF84]">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* TOKEN SELECTION */}
              <div className="bg-black border border-white/20 p-6 rounded-2xl">
                <h3 className="text-xl font-black text-[#01FF84] mb-4">Select Payment Tokens</h3>
                <p className="text-sm text-white/60 mb-4">
                  Real-time prices from Chainlink & Mantle data feeds
                </p>
                
                <div className="space-y-4">
                  {tokens.map((token) => (
                    <div key={token.symbol} className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="font-bold text-white">{token.symbol}</p>
                          <p className="text-sm text-white/60">
                            Balance: {token.balance.toLocaleString()} {token.symbol}
                          </p>
                          <p className="text-sm text-white/60">
                            Price: ${token.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-[#01FF84]">
                            {selectedTokens[token.symbol] || 0}%
                          </p>
                          <p className="text-sm text-white/60">
                            ${((totalAmount * (selectedTokens[token.symbol] || 0)) / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedTokens[token.symbol] || 0}
                        onChange={(e) => handleTokenChange(token.symbol, parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-[#04130C] border border-[#0D5036] rounded-lg">
                  <div className="flex justify-between text-white mb-2">
                    <span className="font-bold">Total Allocation</span>
                    <span className="font-black text-[#01FF84]">
                      {Object.values(selectedTokens).reduce((a, b) => a + b, 0)}%
                    </span>
                  </div>
                  {Object.values(selectedTokens).reduce((a, b) => a + b, 0) !== 100 && (
                    <p className="text-sm text-yellow-500">
                      Total must equal 100%
                    </p>
                  )}
                </div>
              </div>

              {/* TRANSACTION DETAILS */}
              <div className="bg-black border border-white/20 p-6 rounded-2xl">
                <h3 className="text-xl font-black text-[#01FF84] mb-4">Transaction Details</h3>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className="font-bold">Mantle</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Contract:</span>
                    <span className="font-mono text-[#01FF84]">SwapRouter</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction Type:</span>
                    <span className="font-bold">Atomic Multi-Token Swap</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Merchant Receives:</span>
                    <span className="font-bold text-[#01FF84]">PYUSD</span>
                  </div>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                disabled={Object.values(selectedTokens).reduce((a, b) => a + b, 0) !== 100}
                className="w-full bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Checkout (One Signature)
              </button>

              {/* INFO BOX */}
              <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg">
                <p className="text-sm text-white">
                  <span className="text-[#01FF84] font-bold">ℹ️</span> All swaps and transfers are aggregated in a single atomic transaction via Mantle's EVM. You'll only need to sign once, and the merchant receives their preferred settlement token automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

