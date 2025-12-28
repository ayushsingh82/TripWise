'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <>
      <nav className="absolute top-6 left-0 right-0 z-10 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="focus:outline-none">
          <div className="bg-black border-2 border-[#04130C]  px-3 py-1 rounded-lg cursor-pointer  h transition-all duration-200 flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#70E78A]">PayGate</h1>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <span className={`border border-transparent rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
              pathname === '/dashboard'
                ? 'bg-[#04130C] text-white'
                : 'bg-transparent text-white hover:bg-[#04130C]'
            }`}>
              View Dashboard
            </span>
          </Link>
          <Link href="/upload">
            <span className={`border border-transparent rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
              pathname === '/upload'
                ? 'bg-[#04130C] text-white'
                : 'bg-transparent text-white hover:bg-[#04130C]'
            }`}>
              Configure Limits
            </span>
          </Link>
        </div>

        {/* WALLET CONNECT BUTTON */}
        <div className="connect-button-wrapper border-2 border-white  rounded-lg cursor-pointer   transition-all duration-200 bg-[#70E78A]">
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </nav>
    <div className="border-t border-white/20 mt-20"></div>
    </>
  );
}

