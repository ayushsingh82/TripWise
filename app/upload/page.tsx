'use client';

import Link from 'next/link';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Footer from '@/components/footer';

export default function ConfigureLimitsPage() {
  const { isConnected } = useAccount();
  const [formData, setFormData] = React.useState({
    limitName: '',
    limitType: 'spend',
    value: '',
    currency: 'USD',
    timeWindow: 'daily',
    apiEndpoint: '',
    description: '',
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        limitName: '',
        limitType: 'spend',
        value: '',
        currency: 'USD',
        timeWindow: 'daily',
        apiEndpoint: '',
        description: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">

      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#01FF84] mb-4">Configure Limits</h2>
            <p className="text-lg text-white">Define spend limits, rate limits, and usage quotas for x402 calls</p>
          </div>

          {/* INFO BOX */}
          <div className="bg-[#04130C] border border-[#0D5036] p-4 rounded-lg mb-6">
            <p className="text-sm font-bold text-white">
              <span className="text-[#01FF84]">ℹ️</span> Configure guardrails to prevent abuse and control costs. Limits are enforced automatically when integrated with the x402-limit SDK.
            </p>
          </div>

          {/* FORM */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-black border border-white/20 p-8 rounded-2xl">
              <div className="space-y-6">
                {/* Limit Name */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Limit Name *
                  </label>
                  <input
                    type="text"
                    name="limitName"
                    value={formData.limitName}
                    onChange={handleChange}
                    required
                    className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                    placeholder="Monthly API Budget"
                  />
                </div>

                {/* Limit Type */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Limit Type *
                  </label>
                  <select
                    name="limitType"
                    value={formData.limitType}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                  >
                    <option value="spend">Spend Limit</option>
                    <option value="rate">Rate Limit</option>
                    <option value="quota">Usage Quota</option>
                  </select>
                  <p className="text-xs text-white/60 mt-1">
                    {formData.limitType === 'spend' && 'Maximum spending amount over time period'}
                    {formData.limitType === 'rate' && 'Maximum number of calls per time window'}
                    {formData.limitType === 'quota' && 'Total usage quota over billing period'}
                  </p>
                </div>

                {/* Value and Currency/Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      {formData.limitType === 'spend' ? 'Amount' : formData.limitType === 'rate' ? 'Max Calls' : 'Quota'} *
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleChange}
                      required
                      min="0"
                      step={formData.limitType === 'spend' ? '0.01' : '1'}
                      className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                      placeholder={formData.limitType === 'spend' ? '1000.00' : '100'}
                    />
                  </div>
                  {formData.limitType === 'spend' ? (
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Currency *
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Unit
                      </label>
                      <input
                        type="text"
                        value={formData.limitType === 'rate' ? 'calls' : 'requests'}
                        disabled
                        className="w-full border-2 border-white rounded-lg px-4 py-3 text-white/60 bg-[#04130C] border-[#0D5036]"
                      />
                    </div>
                  )}
                </div>

                {/* Time Window */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Time Window *
                  </label>
                  <select
                    name="timeWindow"
                    value={formData.timeWindow}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                  >
                    <option value="minute">Per Minute</option>
                    <option value="hour">Per Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {/* API Endpoint (Optional) */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    API Endpoint (Optional)
                  </label>
                  <input
                    type="text"
                    name="apiEndpoint"
                    value={formData.apiEndpoint}
                    onChange={handleChange}
                    className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                    placeholder="/api/v1/chat or leave empty for all endpoints"
                  />
                  <p className="text-xs text-white/60 mt-1">Apply limit to specific endpoint or all x402 calls</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-white/20 rounded-lg px-4 py-3 text-white bg-black focus:outline-none"
                    placeholder="Optional description for this limit..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isConnected || isSubmitting}
                    className="w-full bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_0_rgba(255,255,255,1)]"
                  >
                    {isSubmitting ? 'Creating Limit...' : isConnected ? 'Create Limit' : 'Connect Wallet to Continue'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-[#04130C] border-2 border-[#0D5036] shadow-[8px_8px_0_0_rgba(255,255,255,1)] p-8 rounded-2xl text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-white mb-2">Limit Created!</h3>
              <p className="text-white mb-6">Your guardrail limit has been configured and is now active.</p>
              <Link href="/invoices">
                <button className="bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  View Dashboard
                </button>
              </Link>
            </div>
          )}

          {/* INFO BOX */}
          <div className="mt-8 bg-black border border-[#0D5036] p-6 rounded-2xl">
            <h3 className="text-lg font-black text-[#01FF84] mb-3">Limit Types Explained</h3>
            <div className="space-y-3 text-sm text-white">
              <div>
                <p className="font-bold mb-1">💰 Spend Limits</p>
                <p className="text-white/70">Control maximum spending over a time period. When reached, x402 calls are blocked until the limit resets.</p>
              </div>
              <div>
                <p className="font-bold mb-1">⚡ Rate Limits</p>
                <p className="text-white/70">Limit the frequency of API calls (e.g., 100 calls per minute). Prevents API abuse and ensures fair usage.</p>
              </div>
              <div>
                <p className="font-bold mb-1">📊 Usage Quotas</p>
                <p className="text-white/70">Set total consumption limits over billing periods. Track usage and prevent overuse across your application.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
