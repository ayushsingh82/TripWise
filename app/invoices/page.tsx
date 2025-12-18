'use client';

import Link from 'next/link';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Footer from '@/components/footer';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  dueDate: string;
  debtorName: string;
  description: string;
  yieldRate: number;
  fundedAmount: number;
  status: 'open' | 'funded' | 'settled';
  nftTokenId?: string;
}

export default function InvoicesPage() {
  const { isConnected } = useAccount();
  const [filter, setFilter] = React.useState<'all' | 'open' | 'funded'>('all');

  // Mock invoice data
  const [invoices] = React.useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 15000,
      currency: 'USD',
      dueDate: '2024-12-15',
      debtorName: 'Acme Corporation',
      description: 'Software development services for Q4 2024',
      yieldRate: 5.5,
      fundedAmount: 0,
      status: 'open',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      amount: 25000,
      currency: 'USD',
      dueDate: '2024-12-20',
      debtorName: 'Tech Solutions Inc.',
      description: 'Marketing campaign and consulting services',
      yieldRate: 6.0,
      fundedAmount: 12500,
      status: 'funded',
      nftTokenId: '1234',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      amount: 8000,
      currency: 'USD',
      dueDate: '2024-12-10',
      debtorName: 'Global Manufacturing Ltd.',
      description: 'Equipment maintenance and repair services',
      yieldRate: 4.5,
      fundedAmount: 8000,
      status: 'funded',
      nftTokenId: '1235',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      amount: 30000,
      currency: 'USD',
      dueDate: '2025-01-05',
      debtorName: 'Enterprise Solutions',
      description: 'Cloud infrastructure setup and migration',
      yieldRate: 7.0,
      fundedAmount: 0,
      status: 'open',
    },
  ]);

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    if (filter === 'open') return invoice.status === 'open';
    if (filter === 'funded') return invoice.status === 'funded';
    return true;
  });

  const handleFund = (invoiceId: string) => {
    if (!isConnected) {
      alert('Please connect your wallet to fund invoices');
      return;
    }
    // Mock funding action
    alert(`Funding invoice ${invoiceId}... (This is a mock action in MVP)`);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFundingProgress = (invoice: Invoice) => {
    return (invoice.fundedAmount / invoice.amount) * 100;
  };

  return (
    <div className="min-h-screen bg-white font-sans tracking-tight relative overflow-x-hidden">
      {/* HEADER */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="focus:outline-none">
          <div className="bg-[#0048E0] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg cursor-pointer hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center gap-3">
            <h1 className="text-2xl font-black text-white">MNT-Voice</h1>
          </div>
        </Link>
      </div>

      {/* WALLET CONNECT BUTTON */}
      <div className="absolute top-6 right-6 z-10">
        <div className={`connect-button-wrapper border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-lg cursor-pointer hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 ${
          isConnected ? 'bg-white' : 'bg-[#0048E0]'
        }`}>
          <ConnectButton showBalance={false} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#0048E0] mb-4">Browse Invoices</h2>
            <p className="text-lg text-black">Fund invoices and earn yield when they settle</p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'all'
                  ? 'bg-[#0048E0] text-white'
                  : 'bg-white text-black'
              }`}
            >
              All Invoices
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'open'
                  ? 'bg-[#0048E0] text-white'
                  : 'bg-white text-black'
              }`}
            >
              Open for Funding
            </button>
            <button
              onClick={() => setFilter('funded')}
              className={`border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'funded'
                  ? 'bg-[#0048E0] text-white'
                  : 'bg-white text-black'
              }`}
            >
              Fully Funded
            </button>
          </div>

          {/* INVOICE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-2xl hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                {/* STATUS BADGE */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    invoice.status === 'open'
                      ? 'bg-yellow-500 text-black'
                      : invoice.status === 'funded'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {invoice.status.toUpperCase()}
                  </span>
                  {invoice.nftTokenId && (
                    <span className="text-xs font-bold text-black/60">
                      NFT #{invoice.nftTokenId}
                    </span>
                  )}
                </div>

                {/* INVOICE NUMBER */}
                <h3 className="text-xl font-black text-[#0048E0] mb-2">
                  {invoice.invoiceNumber}
                </h3>

                {/* AMOUNT */}
                <div className="mb-4">
                  <p className="text-3xl font-black text-black">
                    {invoice.currency} {invoice.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-black/60">
                    Yield: {invoice.yieldRate}% APY
                  </p>
                </div>

                {/* DEBTOR INFO */}
                <div className="mb-4 space-y-1">
                  <p className="text-sm font-bold text-black">Debtor:</p>
                  <p className="text-sm text-black/80">{invoice.debtorName}</p>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-4">
                  <p className="text-sm text-black/70 line-clamp-2">
                    {invoice.description}
                  </p>
                </div>

                {/* DUE DATE */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-black">
                    Due Date: <span className="font-normal">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </p>
                  <p className="text-xs text-black/60">
                    {getDaysUntilDue(invoice.dueDate) > 0
                      ? `${getDaysUntilDue(invoice.dueDate)} days remaining`
                      : 'Overdue'}
                  </p>
                </div>

                {/* FUNDING PROGRESS */}
                {invoice.status === 'funded' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-black/60">Funding Progress</span>
                      <span className="font-bold text-black">{getFundingProgress(invoice).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black rounded-full h-3">
                      <div
                        className="bg-[#0048E0] h-full rounded-full transition-all"
                        style={{ width: `${getFundingProgress(invoice)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* FUND BUTTON */}
                {invoice.status === 'open' && (
                  <button
                    onClick={() => handleFund(invoice.id)}
                    className="w-full bg-[#0048E0] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-sm font-bold text-white hover:bg-[#0048E0]/90 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px]"
                  >
                    Fund Invoice
                  </button>
                )}

                {invoice.status === 'funded' && (
                  <div className="w-full bg-gray-200 border-2 border-black px-6 py-3 rounded-lg text-sm font-bold text-black text-center">
                    Fully Funded
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-black/60">No invoices found</p>
              <Link href="/upload">
                <button className="mt-4 bg-[#0048E0] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#0048E0]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  Upload Your First Invoice
                </button>
              </Link>
            </div>
          )}

          {/* INFO BOX */}
          <div className="mt-12 bg-white border-2 border-[#0048E0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-[#0048E0] mb-3">How Invoice Financing Works</h3>
            <ol className="space-y-2 text-sm text-black">
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">1.</span>
                <span>Browse available invoices that need funding</span>
              </li>
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">2.</span>
                <span>Fund invoices to provide immediate liquidity to SMEs</span>
              </li>
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">3.</span>
                <span>Earn yield when the invoice is paid by the debtor</span>
              </li>
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">4.</span>
                <span>Repayment + yield is automatically distributed on-chain</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

