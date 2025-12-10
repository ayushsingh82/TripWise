'use client';

import Link from 'next/link';

import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount } from 'wagmi';

const faqs = [

  {

    q: 'What is X402-Tooling?',

    a: 'X402-Tooling is a marketplace where you come with a basic agent. We help you with reputation and monetization layer, brought to you by x402. Add your agent with few clicks and get support for monetization and reputation!'

  },

  {

    q: 'How does payment work?',

    a: 'X402-Tooling uses x402 micropayments on Polygon for instant, secure payments. Users pay per agent call, and developers receive earnings autoUSDCally.'

  },

  {

    q: 'What is reputation?',

    a: 'Reputation tracks agent performance and reliability, building trust through transparent reputation scores based on successful calls and user feedback.'

  },

  {

    q: 'How do I deploy my agent?',

    a: 'Deploy your MCP agent on NullShot, register it in our marketplace, and start earning per call. The platform handles payments, routing, and reputation tracking autoUSDCally.'

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

            <img src="/logo.png" alt="X402-Tooling Logo" className="h-8 w-8" />

            <h1 className="text-2xl font-black text-white">X402-Tooling</h1>

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

              <p className="text-sm font-black text-white bg-black px-3 py-2 rounded-lg inline-block">One Stop Marketplace for All agents</p>

            </div>

            <div className="mb-4">

              <h2 className="text-5xl font-black text-[#0048E0] bg-white px-3 py-2 rounded-lg inline-block italic">X402-Tooling</h2>

            </div>

            <div>

              <p className="text-2xl font-black text-black max-w-2xl mx-auto">

                Add your agent with few clicks and get support for monetization and reputation!

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-6">

      <Link href="/marketplace">

          <button className="bg-[#0048E0] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#0048E0]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Browse Agents</button>

        </Link>

        

          <Link href="/marketplace">

            <button className="bg-[#7183F5] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-[#7183F5]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Launch Agent</button>

          </Link>

        </div>

      {/* MAIN CONTENT - BENTO GRID */}

      <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">

        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">

          {/* Why X402-Tooling */}

          <div className="col-span-12 md:col-span-6 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#0048E0] px-3 py-2 rounded-lg inline-block">Why X402-Tooling</h2>

            <p className="text-sm text-black leading-relaxed">X402-Tooling is a marketplace where you come with a basic agent. We help you with reputation and monetization layer, brought to you by x402. Turn your agent into a revenue-generating service with built-in payment infrastructure and trust systems.</p>

          </div>

          {/* Powered by Advanced Tech */}

          <div className="col-span-12 md:col-span-6 row-span-2 bg-[#0048E0] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-black px-3 py-2 rounded-lg inline-block">Powered by Advanced Tech</h2>

            <p className="text-sm text-white mb-4 leading-relaxed">Built on cutting-edge protocols:</p>

            <ul className="space-y-2 text-sm">

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">MCP (Model Context Protocol) agents</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">x402 micropayments on Polygon</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">reputation tracking</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">NullShot global infrastructure</span></li>

              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-white"></span><span className="text-white font-semibold">API agent support coming soon</span></li>

            </ul>

          </div>

          {/* How It Works */}

          <div className="col-span-12 md:col-span-8 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h2 className="text-xl font-black mb-4 text-white bg-[#0048E0] px-3 py-2 rounded-lg inline-block">How It Works</h2>

            <p className="text-sm text-black mb-4 leading-relaxed">Discover and use AI agents in three simple steps:</p>

            <div className="space-y-3">

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">1</span><div><div className="font-bold text-black mb-1 text-sm">Discover Agents</div><div className="text-xs text-black">Browse the marketplace of AI agents (MCPs) deployed on NullShot with reputation scores and pricing.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">2</span><div><div className="font-bold text-black mb-1 text-sm">Pay Per Use</div><div className="text-xs text-black">Connect wallet and pay with x402 micropayments—instant, secure transactions on Polygon.</div></div></div>

              <div className="flex items-start"><span className="text-lg font-extrabold text-[#0048E0] mr-3">3</span><div><div className="font-bold text-black mb-1 text-sm">Interact & Build Trust</div><div className="text-xs text-black">Call agents, view real-time responses, and watch reputation scores update via reputation tracking.</div></div></div>

            </div>

          </div>

          {/* The Future of Agent Marketplace */}

          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h3 className="text-lg font-black mb-2 text-white bg-[#0048E0] px-3 py-1 rounded-lg inline-block">The Future of Agent Marketplace</h3>

            <p className="text-black text-sm mt-2">X402-Tooling provides the monetization and reputation layer for your agents, powered by x402 micropayments. Bring your basic agent and we handle the rest.</p>

          </div>

          {/* Coming Soon */}

          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black border-dashed shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">

            <h4 className="text-lg font-bold text-white bg-yellow-500 px-3 py-1 rounded-lg inline-block">Coming Soon</h4>

            <p className="text-black text-sm mt-2 font-bold">API agent support coming soon with the same infrastructure for payment and reputation.</p>

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

