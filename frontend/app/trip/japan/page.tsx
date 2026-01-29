import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/footer';

const BORDER_LIGHT = 'rgba(125, 94, 60, 0.35)';
const JAPAN_HERO =
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=85';

export default function JapanTripPage() {
  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: '#1F0000' }}>
      {/* Hero — full-width Japan image */}
      <section className="relative w-full min-h-[45vh] sm:min-h-[55vh]">
        <Image
          src={JAPAN_HERO}
          alt="Japan"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16"
          style={{
            background: 'linear-gradient(to top, rgba(31,0,0,0.92) 0%, transparent 55%)',
          }}
        >
          <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1" style={{ color: '#FFC6A4' }}>
            Mar 15–22, 2025 · Budget $2,400
          </p>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FFC6A4' }}>
            Japan — Kyoto, Tokyo, Mount Fuji
          </h1>
          <p className="text-base sm:text-lg max-w-2xl opacity-90" style={{ color: '#D4AE98' }}>
            Home → Tokyo · 7 days. Temples, city, and Fuji views.
          </p>
        </div>
      </section>

      {/* Flights — full-width section */}
      <section className="w-full border-t py-12 sm:py-16 px-4 sm:px-6" style={{ borderColor: BORDER_LIGHT }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-8" style={{ color: '#FFC6A4' }}>
            Flights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <p className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80" style={{ color: '#D4AE98' }}>
                Outbound · Mar 15
              </p>
              <p className="text-lg font-medium mb-1" style={{ color: '#FFC6A4' }}>
                Home → Tokyo (NRT)
              </p>
              <p className="text-sm opacity-90" style={{ color: '#D4AE98' }}>~12h · Economy</p>
              <p className="mt-3 text-sm" style={{ color: '#FFC6A4' }}>~$520</p>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <p className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80" style={{ color: '#D4AE98' }}>
                Return · Mar 22
              </p>
              <p className="text-lg font-medium mb-1" style={{ color: '#FFC6A4' }}>
                Tokyo (NRT) → Home
              </p>
              <p className="text-sm opacity-90" style={{ color: '#D4AE98' }}>~11h · Economy</p>
              <p className="mt-3 text-sm" style={{ color: '#FFC6A4' }}>~$460</p>
            </div>
          </div>
          <p className="mt-6 text-base font-medium" style={{ color: '#FFC6A4' }}>
            Total flights ~$980
          </p>
        </div>
      </section>

      {/* Hotels — full-width section */}
      <section className="w-full border-t py-12 sm:py-16 px-4 sm:px-6" style={{ borderColor: BORDER_LIGHT }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-8" style={{ color: '#FFC6A4' }}>
            Hotels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <p className="font-serif-display font-semibold text-lg mb-1" style={{ color: '#FFC6A4' }}>Kyoto</p>
              <p className="text-sm opacity-90 mb-2" style={{ color: '#D4AE98' }}>2 nights · Mar 15–17</p>
              <p className="text-sm opacity-80" style={{ color: '#D4AE98' }}>Gion area · ~$180/night</p>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <p className="font-serif-display font-semibold text-lg mb-1" style={{ color: '#FFC6A4' }}>Tokyo</p>
              <p className="text-sm opacity-90 mb-2" style={{ color: '#D4AE98' }}>3 nights · Mar 17–20</p>
              <p className="text-sm opacity-80" style={{ color: '#D4AE98' }}>Shibuya · ~$160/night</p>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <p className="font-serif-display font-semibold text-lg mb-1" style={{ color: '#FFC6A4' }}>Near Mount Fuji</p>
              <p className="text-sm opacity-90 mb-2" style={{ color: '#D4AE98' }}>1 night · Mar 20–21</p>
              <p className="text-sm opacity-80" style={{ color: '#D4AE98' }}>Hakone · ~$220</p>
            </div>
          </div>
          <p className="mt-6 text-base font-medium" style={{ color: '#FFC6A4' }}>
            Total stays ~$1,100
          </p>
        </div>
      </section>

      {/* Itinerary — full-width section */}
      <section className="w-full border-t py-12 sm:py-16 px-4 sm:px-6" style={{ borderColor: BORDER_LIGHT }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-8" style={{ color: '#FFC6A4' }}>
            Itinerary
          </h2>
          <ul className="space-y-6">
            <li className="flex gap-4 sm:gap-6 rounded-2xl border p-5 sm:p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <span className="font-serif-display font-semibold shrink-0 opacity-90" style={{ color: '#D4AE98' }}>Day 1–2</span>
              <div>
                <p className="font-medium" style={{ color: '#FFC6A4' }}>Kyoto</p>
                <p className="text-sm opacity-90 mt-1" style={{ color: '#D4AE98' }}>Temples, Fushimi Inari, Gion</p>
              </div>
            </li>
            <li className="flex gap-4 sm:gap-6 rounded-2xl border p-5 sm:p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <span className="font-serif-display font-semibold shrink-0 opacity-90" style={{ color: '#D4AE98' }}>Day 3–5</span>
              <div>
                <p className="font-medium" style={{ color: '#FFC6A4' }}>Tokyo</p>
                <p className="text-sm opacity-90 mt-1" style={{ color: '#D4AE98' }}>Shibuya, Asakusa, teamLab</p>
              </div>
            </li>
            <li className="flex gap-4 sm:gap-6 rounded-2xl border p-5 sm:p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <span className="font-serif-display font-semibold shrink-0 opacity-90" style={{ color: '#D4AE98' }}>Day 6</span>
              <div>
                <p className="font-medium" style={{ color: '#FFC6A4' }}>Mount Fuji / Hakone</p>
                <p className="text-sm opacity-90 mt-1" style={{ color: '#D4AE98' }}>Views, onsen</p>
              </div>
            </li>
            <li className="flex gap-4 sm:gap-6 rounded-2xl border p-5 sm:p-6" style={{ borderColor: BORDER_LIGHT, backgroundColor: 'rgba(31,0,0,0.4)' }}>
              <span className="font-serif-display font-semibold shrink-0 opacity-90" style={{ color: '#D4AE98' }}>Day 7</span>
              <div>
                <p className="font-medium" style={{ color: '#FFC6A4' }}>Depart Tokyo</p>
              </div>
            </li>
          </ul>
          <p className="mt-8 text-sm opacity-70" style={{ color: '#D4AE98' }}>
            Sample itinerary. No booking or payments — plan and compare with TripWise.
          </p>
        </div>
      </section>

      {/* Back to Dashboard */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/dashboard"
          className="inline-block text-sm font-medium underline hover:opacity-90"
          style={{ color: '#FFC6A4' }}
        >
          ← Dashboard
        </Link>
      </div>

      <Footer />
    </div>
  );
}
