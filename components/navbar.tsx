'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <nav className="absolute top-6 left-0 right-0 z-10 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="focus:outline-none">
          <div className="bg-[#70E78A] border-2 border-[#04130C]  px-3 py-1 rounded-lg cursor-pointer  h transition-all duration-200 flex items-center gap-3">
            <h1 className="text-lg font-black text-black">x402-limit</h1>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <span className="text-white font-bold hover:opacity-70 transition-opacity cursor-pointer">View Dashboard</span>
          </Link>
          <Link href="/upload">
            <span className="text-white font-bold hover:opacity-70 transition-opacity cursor-pointer">Configure Limits</span>
          </Link>
        </div>

        {/* WALLET CONNECT BUTTON */}
        <div className="connect-button-wrapper border-2 border-white  rounded-lg cursor-pointer   transition-all duration-200 bg-[#70E78A]">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </nav>
  );
}

