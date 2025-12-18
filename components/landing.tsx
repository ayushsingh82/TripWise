'use client';

import Link from 'next/link';

import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount } from 'wagmi';

const faqs = [

  {

    q: 'What is MNT-Voice?',

    a: 'MNT-Voice is an on-chain invoice financing platform focused on SMEs. We tokenize verified invoices as NFTs on Mantle, allowing investors to fund invoices and earn yield when invoices settle. SMEs get immediate liquidity instead of waiting 30-90 days for payments.'

  },

  {

    q: 'How does invoice financing work?',

    a: 'SMEs upload invoice details, which are verified and minted as NFTs on Mantle. Investors can fund these invoices, and when the invoice is paid, repayment plus yield is automatically distributed to investors. This provides immediate liquidity to SMEs while offering yield opportunities to investors.'

  },

  {

    q: 'How is invoice verification handled?',

    a: 'In our MVP, we use mock verification to demonstrate the concept. Invoices are verified for basic details before being tokenized as NFTs. Future versions will include more sophisticated verification mechanisms.'

  },

  {

    q: 'What happens when an invoice is paid?',

    a: 'When an invoice settles, the repayment amount plus the agreed yield is automatically distributed to investors who funded the invoice. This happens on-chain through smart contracts on Mantle testnet, ensuring transparency and trustless execution.'

  },

];

export default function Landing() {

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const { isConnected } = useAccount();

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

     

      {/* HERO */}

      <div className="relative pt-32 pb-8 px-4 mb-8">

        <div className="flex items-center justify-center">

          <div className="text-center">

            <div className="mb-4">

              <p className="text-sm font-black text-white bg-black px-3 py-2 rounded-lg inline-block">On-Chain Invoice Financing for SMEs</p>

            </div>

            <div className="mb-4">

              <h2 className="text-5xl font-black text-[#0048E0] bg-white px-3 py-2 rounded-lg inline-block italic">MNT-Voice</h2>

            </div>

            <div>

              <p className="text-2xl font-black text-black max-w-2xl mx-auto">

                Tokenize verified invoices on Mantle. Get immediate liquidity while investors earn yield when invoices settle.

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-6">

      <Link href="/invoices">

          <button className="bg-[#0048E0] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#0048E0]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Browse Invoices</button>

        </Link>

        

          <Link href="/upload">

            <button className="bg-[#7183F5] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#7183F5]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Upload Invoice</button>

          </Link>

        </div>

      {/* MAIN CONTENT - BENTO GRID */}

      <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">

        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">

          {/* Why MNT-Voice */}

          <div className="col-span-12 md:col-span-6 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#0048E0] px-3 py-2 rounded-lg inline-block">Why MNT-Voice</h2>

            <p className="text-sm text-black leading-relaxed">SMEs wait 30-90 days for invoice payments and lack access to liquidity. MNT-Voice solves this by tokenizing verified invoices as NFTs on Mantle, allowing investors to fund invoices and earn yield when invoices settle. Clear RealFi use case with strong real-world relevance and simple yield logic.</p>

          </div>

          {/* Powered by Mantle */}

          <div className="col-span-12 md:col-span-6 row-span-2 bg-[#0048E0] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-black px-3 py-2 rounded-lg inline-block">Powered by Mantle</h2>

            <p className="text-sm text-white mb-4 leading-relaxed">Built on cutting-edge blockchain technology:</p>

            <ul className="space-y-2 text-sm">

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">Invoice NFTs minted on Mantle</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">Smart contract automation</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">Automatic yield distribution</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">Testnet repayment cycle</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">Mock verification system</span></li>

            </ul>

          </div>

          {/* How It Works */}

          <div className="col-span-12 md:col-span-8 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#0048E0] px-3 py-2 rounded-lg inline-block">How It Works</h2>

            <p className="text-sm text-black mb-4 leading-relaxed">Invoice financing in four simple steps:</p>

            <div className="space-y-3">

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">1</span><div><div className="font-bold text-black mb-1 text-sm">SME Uploads Invoice</div><div className="text-xs text-black">SME uploads invoice details which are verified (mock verification in MVP) before being tokenized.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">2</span><div><div className="font-bold text-black mb-1 text-sm">Invoice NFT Minted</div><div className="text-xs text-black">Verified invoice is minted as an NFT on Mantle blockchain, making it tradeable and fundable.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">3</span><div><div className="font-bold text-black mb-1 text-sm">Investors Fund Invoice</div><div className="text-xs text-black">Investors browse available invoices and fund them to provide immediate liquidity to SMEs.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">4</span><div><div className="font-bold text-black mb-1 text-sm">Automatic Repayment & Yield</div><div className="text-xs text-black">When invoice settles, repayment plus yield is automatically distributed to investors through smart contracts.</div></div></div>

            </div>

          </div>

          {/* RealFi for SMEs */}

          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h3 className="text-lg font-black mb-2 text-white bg-[#0048E0] px-3 py-1 rounded-lg inline-block">RealFi for SMEs</h3>

            <p className="text-black text-sm mt-2">MNT-Voice bridges traditional finance with DeFi, providing SMEs with immediate liquidity while offering investors transparent yield opportunities backed by real-world invoices.</p>

          </div>

          {/* MVP Features */}

          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black border-dashed shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h4 className="text-lg font-bold text-white bg-yellow-500 px-3 py-1 rounded-lg inline-block">MVP Features</h4>

            <p className="text-black text-sm mt-2 font-bold">Single invoice flow, mock verification, and testnet repayment cycle. Building the foundation for scalable invoice financing on Mantle.</p>

          </div>

        </div>

        {/* FAQ SECTION - moved up */}

        <section className="relative z-10 px-4 py-16 border-t border-[#0048E0]/20 mt-12">

          <div className="max-w-3xl mx-auto">

            <h2 className="text-3xl text-black font-black mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">

              {faqs.map((faq, index) => (

                <div key={index} className="border-2 border-[#0048E0] rounded-2xl overflow-hidden bg-white">

                  <button

                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}

                    className="w-full p-6 text-left flex items-center justify-between text-black hover:bg-[#0048E0] hover:text-white transition-all duration-300 focus:outline-none"

                  >

                    <span className="font-medium text-lg">{faq.q}</span>

                    <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>

                  </button>

                  {expandedFaq === index && (

                    <div className="px-6 pb-6 text-black/80 animate-fade-in bg-white">{faq.a}</div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </section>

    

       

      </div>

    </div>

  );

}

