'use client';

import EmailForm from './EmailForm';
import { DiscoveryScreen, PhoneFrame } from './PhoneMockups';
import { LogoMark, PlayIcon, HeartIcon, MapPinIcon } from './icons';

export default function Hero({ onWatchDemo }: { onWatchDemo: () => void }) {
  return (
    <section className="relative overflow-hidden hero-bg">
      {/* top nav */}
      <nav className="max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <LogoMark className="h-9 w-9" />
          <span className="font-semibold tracking-tight">Niche Network</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#preview" className="hover:text-white">App preview</a>
          <a href="#videos" className="hover:text-white">Videos</a>
          <a href="#waitlist" className="hover:text-white">Waitlist</a>
        </div>
        <a href="#waitlist" className="btn-secondary !py-2 !px-4 text-sm">Join waitlist</a>
      </nav>

      {/* background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="pill mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pinkBright animate-pulse" />
            Private beta · iOS launching soon
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Meet traders{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pinkBright to-brand-blueBright">
              near you.
            </span>
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl">
            Niche Network is the social app for traders. Swipe to meet people in
            your city, build trading groups, and grab coffee with people who
            actually get it.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <EmailForm />
            <button
              type="button"
              onClick={onWatchDemo}
              className="btn-secondary max-w-fit !py-2 text-sm"
            >
              <PlayIcon className="h-4 w-4" /> Watch demo
            </button>
          </div>

          {/* tiny social proof row */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['from-brand-pinkBright to-brand-blue','from-brand-blue to-brand-pinkBright','from-brand-pink to-brand-pinkBright','from-brand-greenBright to-brand-blue'].map((g, i) => (
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-bg bg-gradient-to-br ${g}`} />
              ))}
            </div>
            <div className="text-sm text-white/60">
              <span className="text-white font-medium">Traders in 40+ cities</span> are joining the waitlist.
            </div>
          </div>
        </div>

        {/* Right: phone */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-8 bg-[radial-gradient(closest-side,rgba(255,95,162,0.25),transparent)]" />
          <div className="relative animate-float">
            <PhoneFrame className="shadow-glowPink">
              <DiscoveryScreen />
            </PhoneFrame>
          </div>

          {/* floating chip 1 — social, no PnL */}
          <div className="hidden sm:flex absolute -left-4 top-10 card !p-3 items-center gap-2 text-xs animate-fade-in">
            <span className="h-7 w-7 rounded-full bg-brand-pink/20 text-brand-pinkBright flex items-center justify-center">
              <HeartIcon className="h-3.5 w-3.5" />
            </span>
            New match · Maya, Brooklyn
          </div>
          {/* floating chip 2 */}
          <div className="hidden sm:flex absolute -right-2 bottom-16 card !p-3 items-center gap-2 text-xs animate-fade-in">
            <span className="h-7 w-7 rounded-full bg-brand-blue/20 text-brand-blueBright flex items-center justify-center">
              <MapPinIcon className="h-3.5 w-3.5" />
            </span>
            12 traders within 5 mi
          </div>
        </div>
      </div>
    </section>
  );
}
