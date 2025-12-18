'use client';

import Link from 'next/link';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Footer from '@/components/footer';

export default function UploadPage() {
  const { isConnected } = useAccount();
  const [formData, setFormData] = React.useState({
    invoiceNumber: '',
    amount: '',
    currency: 'USD',
    dueDate: '',
    debtorName: '',
    debtorAddress: '',
    description: '',
    yieldRate: '5',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call / NFT minting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        invoiceNumber: '',
        amount: '',
        currency: 'USD',
        dueDate: '',
        debtorName: '',
        debtorAddress: '',
        description: '',
        yieldRate: '5',
      });
    }, 3000);
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
        <div className="max-w-3xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#0048E0] mb-4">Upload Invoice</h2>
            <p className="text-lg text-black">Tokenize your invoice as an NFT on Mantle and get immediate liquidity</p>
          </div>

          {/* VERIFICATION NOTICE */}
          <div className="bg-yellow-50 border-2 border-yellow-500 shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-4 rounded-lg mb-6">
            <p className="text-sm font-bold text-black">
              <span className="text-yellow-600">⚠️ MVP Mode:</span> Using mock verification. Invoices will be verified automatically before NFT minting.
            </p>
          </div>

          {/* FORM */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
              <div className="space-y-6">
                {/* Invoice Number */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Invoice Number *
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                    placeholder="INV-2024-001"
                  />
                </div>

                {/* Amount and Currency */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                      placeholder="10000.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Currency *
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                  />
                </div>

                {/* Debtor Name */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Debtor Name (Customer) *
                  </label>
                  <input
                    type="text"
                    name="debtorName"
                    value={formData.debtorName}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                    placeholder="Acme Corporation"
                  />
                </div>

                {/* Debtor Address */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Debtor Address *
                  </label>
                  <textarea
                    name="debtorAddress"
                    value={formData.debtorAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                    placeholder="123 Business St, City, Country"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Invoice Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                    placeholder="Description of goods or services provided..."
                  />
                </div>

                {/* Yield Rate */}
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Expected Yield Rate (%)
                  </label>
                  <input
                    type="number"
                    name="yieldRate"
                    value={formData.yieldRate}
                    onChange={handleChange}
                    min="0"
                    max="20"
                    step="0.1"
                    className="w-full border-2 border-black rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#0048E0]"
                    placeholder="5.0"
                  />
                  <p className="text-xs text-black/60 mt-1">Suggested yield rate for investors (default: 5%)</p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isConnected || isSubmitting}
                    className="w-full bg-[#0048E0] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#0048E0]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                  >
                    {isSubmitting ? 'Minting NFT...' : isConnected ? 'Mint Invoice NFT' : 'Connect Wallet to Continue'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 border-2 border-green-500 shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-black mb-2">Invoice Submitted!</h3>
              <p className="text-black mb-6">Your invoice is being verified and will be minted as an NFT on Mantle.</p>
              <Link href="/invoices">
                <button className="bg-[#0048E0] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#0048E0]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  View All Invoices
                </button>
              </Link>
            </div>
          )}

          {/* INFO BOX */}
          <div className="mt-8 bg-white border-2 border-[#0048E0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 rounded-lg">
            <h3 className="text-lg font-black text-[#0048E0] mb-3">What happens next?</h3>
            <ol className="space-y-2 text-sm text-black">
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">1.</span>
                <span>Your invoice will be verified (mock verification in MVP)</span>
              </li>
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">2.</span>
                <span>An NFT will be minted on Mantle representing your invoice</span>
              </li>
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">3.</span>
                <span>Investors can fund your invoice to provide immediate liquidity</span>
              </li>
              <li className="flex items-start">
                <span className="font-extrabold text-[#0048E0] mr-2">4.</span>
                <span>When the invoice is paid, investors receive repayment + yield automatically</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

