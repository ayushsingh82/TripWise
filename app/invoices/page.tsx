'use client';

import Link from 'next/link';
import React from 'react';
import Footer from '@/components/footer';

interface Limit {
  id: string;
  name: string;
  type: 'spend' | 'rate' | 'quota';
  value: number;
  currency?: string;
  timeWindow: string;
  apiEndpoint: string;
  currentUsage: number;
  status: 'active' | 'warning' | 'exceeded';
  createdAt: string;
}

export default function DashboardPage() {
  const [filter, setFilter] = React.useState<'all' | 'active' | 'warning' | 'exceeded'>('all');

  // Mock limit data
  const [limits] = React.useState<Limit[]>([
    {
      id: '1',
      name: 'Monthly API Budget',
      type: 'spend',
      value: 1000,
      currency: 'USD',
      timeWindow: 'monthly',
      apiEndpoint: 'all',
      currentUsage: 650,
      status: 'active',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Rate Limit - Chat API',
      type: 'rate',
      value: 100,
      timeWindow: 'minute',
      apiEndpoint: '/api/v1/chat',
      currentUsage: 85,
      status: 'warning',
      createdAt: '2024-01-15',
    },
    {
      id: '3',
      name: 'Daily Usage Quota',
      type: 'quota',
      value: 10000,
      timeWindow: 'daily',
      apiEndpoint: 'all',
      currentUsage: 10000,
      status: 'exceeded',
      createdAt: '2024-01-10',
    },
    {
      id: '4',
      name: 'Hourly Rate Limit',
      type: 'rate',
      value: 500,
      timeWindow: 'hour',
      apiEndpoint: 'all',
      currentUsage: 120,
      status: 'active',
      createdAt: '2024-01-20',
    },
  ]);

  const filteredLimits = limits.filter(limit => {
    if (filter === 'all') return true;
    return limit.status === filter;
  });

  const getUsagePercentage = (limit: Limit) => {
    return (limit.currentUsage / limit.value) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'exceeded':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'ACTIVE';
      case 'warning':
        return 'WARNING';
      case 'exceeded':
        return 'EXCEEDED';
      default:
        return 'UNKNOWN';
    }
  };

  const formatValue = (limit: Limit) => {
    if (limit.type === 'spend') {
      return `${limit.currency} ${limit.value.toLocaleString()}`;
    }
    return `${limit.value.toLocaleString()} ${limit.type === 'rate' ? 'calls' : 'requests'}`;
  };

  const formatCurrentUsage = (limit: Limit) => {
    if (limit.type === 'spend') {
      return `${limit.currency} ${limit.currentUsage.toLocaleString()}`;
    }
    return `${limit.currentUsage.toLocaleString()} ${limit.type === 'rate' ? 'calls' : 'requests'}`;
  };

  return (
    <div className="min-h-screen bg-black font-sans tracking-tight relative overflow-x-hidden">

      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* PAGE HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#01FF84] mb-4">Usage Dashboard</h2>
            <p className="text-lg text-white">Monitor your x402 limits, usage, and guardrail status</p>
          </div>

          {/* STATS SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] p-6 rounded-lg">
              <p className="text-sm font-bold text-white/60 mb-1">Total Limits</p>
              <p className="text-3xl font-black text-[#01FF84]">{limits.length}</p>
            </div>
            <div className="bg-black border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] p-6 rounded-lg">
              <p className="text-sm font-bold text-white/60 mb-1">Active</p>
              <p className="text-3xl font-black text-green-500">{limits.filter(l => l.status === 'active').length}</p>
            </div>
            <div className="bg-black border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] p-6 rounded-lg">
              <p className="text-sm font-bold text-white/60 mb-1">Warning</p>
              <p className="text-3xl font-black text-yellow-500">{limits.filter(l => l.status === 'warning').length}</p>
            </div>
            <div className="bg-black border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] p-6 rounded-lg">
              <p className="text-sm font-bold text-white/60 mb-1">Exceeded</p>
              <p className="text-3xl font-black text-red-500">{limits.filter(l => l.status === 'exceeded').length}</p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'all'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              All Limits
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'active'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'warning'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              Warning
            </button>
            <button
              onClick={() => setFilter('exceeded')}
              className={`border-2 border-white shadow-[4px_4px_0_0_rgba(255,255,255,1)] px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${
                filter === 'exceeded'
                  ? 'bg-[#70E78A] text-black'
                  : 'bg-black text-white'
              }`}
            >
              Exceeded
            </button>
          </div>

          {/* LIMITS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLimits.map((limit) => (
              <div
                key={limit.id}
                className="bg-black border border-white/20 p-6 rounded-2xl hover:bg-[#04130C] hover:border-[#0D5036]"
              >
                {/* STATUS BADGE */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${getStatusColor(limit.status)} text-white`}>
                    {getStatusText(limit.status)}
                  </span>
                  <span className="text-xs font-bold text-white/60 bg-[#04130C] border border-[#0D5036] px-3 py-1 rounded-lg capitalize">
                    {limit.type}
                  </span>
                </div>

                {/* LIMIT NAME */}
                <h3 className="text-xl font-black text-[#01FF84] mb-2">
                  {limit.name}
                </h3>

                {/* LIMIT VALUE */}
                <div className="mb-4">
                  <p className="text-sm text-white/60 mb-1">Limit</p>
                  <p className="text-2xl font-black text-white">
                    {formatValue(limit)}
                  </p>
                  <p className="text-xs text-white/60 capitalize">
                    per {limit.timeWindow}
                  </p>
                </div>

                {/* CURRENT USAGE */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">Current Usage</span>
                    <span className="font-bold text-white">{formatCurrentUsage(limit)}</span>
                  </div>
                  <div className="w-full bg-gray-800 border border-white rounded-full h-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        getUsagePercentage(limit) >= 100
                          ? 'bg-red-500'
                          : getUsagePercentage(limit) >= 80
                          ? 'bg-yellow-500'
                          : 'bg-[#01FF84]'
                      }`}
                      style={{ width: `${Math.min(getUsagePercentage(limit), 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-1">
                    {getUsagePercentage(limit).toFixed(1)}% used
                  </p>
                </div>

                {/* API ENDPOINT */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-white/60 mb-1">Endpoint</p>
                  <p className="text-sm text-white font-mono bg-[#04130C] border border-[#0D5036] px-2 py-1 rounded">
                    {limit.apiEndpoint === 'all' ? 'All endpoints' : limit.apiEndpoint}
                  </p>
                </div>

                {/* CREATED DATE */}
                <div>
                  <p className="text-xs text-white/60">
                    Created: {new Date(limit.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredLimits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl font-bold text-white/60">No limits found</p>
              <Link href="/upload">
                <button className="mt-4 bg-[#70E78A] border-2 border-white shadow-[6px_6px_0_0_rgba(255,255,255,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#70E78A]/90 hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  Create Your First Limit
                </button>
              </Link>
            </div>
          )}

          {/* INFO BOX */}
          <div className="mt-12 bg-black border border-white/20 p-6 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-[#01FF84] mb-3">Understanding Status</h3>
            <div className="space-y-2 text-sm text-white">
              <div className="flex items-start">
                <span className="font-extrabold text-green-500 mr-2">●</span>
                <span><strong>Active:</strong> Usage is within normal range (below 80% of limit)</span>
              </div>
              <div className="flex items-start">
                <span className="font-extrabold text-yellow-500 mr-2">●</span>
                <span><strong>Warning:</strong> Usage is approaching limit (80-99% of limit)</span>
              </div>
              <div className="flex items-start">
                <span className="font-extrabold text-red-500 mr-2">●</span>
                <span><strong>Exceeded:</strong> Limit has been reached or exceeded (100%+)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
