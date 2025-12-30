'use client';

import Link from 'next/link';
import React from 'react';
import Footer from '@/components/footer';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  tokens: { symbol: string; amount: number; percentage: number }[];
  settlementToken: string;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [filter, setFilter] = React.useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  // Mock transaction data
  const [transactions] = React.useState<Transaction[]>([
    {
      id: '1',
      merchant: 'NFT Marketplace',
      amount: 100,
      tokens: [
        { symbol: 'USDC', amount: 40, percentage: 40 },
        { symbol: 'ETH', amount: 0.012, percentage: 30 },
        { symbol: 'MNT', amount: 60, percentage: 30 },
      ],
      settlementToken: 'PYUSD',
      status: 'completed',
      txHash: '0x1234...5678',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      merchant: 'DeFi Platform',
      amount: 250,
      tokens: [
        { symbol: 'USDC', amount: 125, percentage: 50 },
        { symbol: 'ETH', amount: 0.05, percentage: 50 },
      ],
      settlementToken: 'mUSD',
      status: 'completed',
      txHash: '0xabcd...efgh',
      createdAt: '2024-01-14T15:20:00Z',
    },
    {
      id: '3',
      merchant: 'Web3 Store',
      amount: 75,
      tokens: [
        { symbol: 'MNT', amount: 150, percentage: 100 },
      ],
      settlementToken: 'PYUSD',
      status: 'pending',
      txHash: '0x9876...5432',
      createdAt: '2024-01-16T09:15:00Z',
    },
    {
      id: '4',
      merchant: 'Gaming Marketplace',
      amount: 500,
      tokens: [
        { symbol: 'USDC', amount: 200, percentage: 40 },
        { symbol: 'WBTC', amount: 0.01, percentage: 60 },
      ],
      settlementToken: 'PYUSD',
      status: 'failed',
      txHash: '0xfedc...ba98',
      createdAt: '2024-01-13T14:45:00Z',
    },
  ]);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    return status.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">

      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#01FF84] mb-4">Transaction Dashboard</h2>
            <p className="text-lg text-white">View your multi-token checkout transactions</p>
          </div>

          {/* STATS SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black border border-white/20 p-6 relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <p className="text-sm font-bold text-white/60 mb-1">Total Transactions</p>
              <p className="text-3xl font-black text-[#01FF84]">{transactions.length}</p>
            </div>
            <div className="bg-black border border-white/20 p-6 relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <p className="text-sm font-bold text-white/60 mb-1">Completed</p>
              <p className="text-3xl font-black text-green-500">{transactions.filter(t => t.status === 'completed').length}</p>
            </div>
            <div className="bg-black border border-white/20 p-6 relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <p className="text-sm font-bold text-white/60 mb-1">Pending</p>
              <p className="text-3xl font-black text-yellow-500">{transactions.filter(t => t.status === 'pending').length}</p>
            </div>
            <div className="bg-black border border-white/20 p-6 relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <p className="text-sm font-bold text-white/60 mb-1">Total Volume</p>
              <p className="text-3xl font-black text-[#01FF84]">${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`relative border border-white/20 px-6 py-2 font-bold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <span className="relative z-10">All Transactions</span>
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`relative border border-white/20 px-6 py-2 font-bold transition-all duration-200 ${
                filter === 'completed'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <span className="relative z-10">Completed</span>
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`relative border border-white/20 px-6 py-2 font-bold transition-all duration-200 ${
                filter === 'pending'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <span className="relative z-10">Pending</span>
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`relative border border-white/20 px-6 py-2 font-bold transition-all duration-200 ${
                filter === 'failed'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#01FF84]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#01FF84]"></div>
              <span className="relative z-10">Failed</span>
            </button>
          </div>

          {/* TRANSACTIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-black border border-white/20 p-6 rounded-2xl hover:bg-[#04130C] hover:border-[#0D5036]"
              >
                {/* STATUS BADGE */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${getStatusColor(tx.status)} text-white`}>
                    {getStatusText(tx.status)}
                  </span>
                  <span className="text-xs font-bold text-white/60 bg-[#04130C] border border-[#0D5036] px-3 py-1 rounded-lg">
                    {tx.settlementToken}
                  </span>
                </div>

                {/* MERCHANT */}
                <h3 className="text-xl font-black text-[#01FF84] mb-2">
                  {tx.merchant}
                </h3>

                {/* AMOUNT */}
                <div className="mb-4">
                  <p className="text-sm text-white/60 mb-1">Amount</p>
                  <p className="text-2xl font-black text-white">
                    ${tx.amount.toFixed(2)}
                  </p>
                </div>

                {/* TOKEN ALLOCATION */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-white/60 mb-2">Payment Tokens</p>
                  <div className="space-y-1">
                    {tx.tokens.map((token, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-white/80">{token.symbol}</span>
                        <span className="text-white font-bold">
                          {token.percentage}% ({token.amount.toFixed(4)} {token.symbol})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TRANSACTION HASH */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-white/60 mb-1">Transaction</p>
                  <p className="text-sm text-white font-mono bg-[#04130C] border border-[#0D5036] px-2 py-1 rounded break-all">
                    {tx.txHash}
                  </p>
                </div>

                {/* DATE */}
                <div>
                  <p className="text-xs text-white/60">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white/60">No transactions found</p>
              <Link href="/checkout">
                <button className="mt-4 bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  Try Checkout Demo
                </button>
              </Link>
            </div>
          )}

          {/* INFO BOX */}
          <div className="mt-12 bg-black border border-white/20 p-6 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-[#01FF84] mb-3">Transaction Status</h3>
            <div className="space-y-2 text-sm text-white">
              <div className="flex items-start">
                <span className="font-extrabold text-green-500 mr-2">●</span>
                <span><strong>Completed:</strong> Transaction successfully processed. Merchant received settlement token.</span>
              </div>
              <div className="flex items-start">
                <span className="font-extrabold text-yellow-500 mr-2">●</span>
                <span><strong>Pending:</strong> Transaction is being processed on the blockchain.</span>
              </div>
              <div className="flex items-start">
                <span className="font-extrabold text-red-500 mr-2">●</span>
                <span><strong>Failed:</strong> Transaction failed. Tokens were not transferred.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
