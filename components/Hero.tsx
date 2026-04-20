'use client';

import EmailForm from './EmailForm';
import { DiscoveryScreen, PhoneFrame } from './PhoneMockups';
import { LogoMark, PlayIcon, TrendDown, TrendUp } from './icons';

// Fake ticker used in the hero bar — pure visual, not pulling live prices.
const tickers = [
  { s: 'SPY', p: '$524.18', d: '+0.62%', up: true },
  { s: 'QQQ', p: '$452.90', d: '+1.04%', up: true },
  { s: 'NVDA', p: '$1,021.20', d: '+2.18%', up: true },
  { s: 'TSLA', p: '$182.64', d: '-1.26%', up: false },
  { s: 'AAPL', p: '$218.90', d: '+0.41%', up: true },
  { s: 'BTC', p: '$68,420', d: '-0.87%', up: false },
  { s: 'ETH', p: '$3,421', d: '+0.32%', up: true },
  { s: 'AMD', p: '$162.40', d: '+1.86%', up: true },
];

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
        <a href="#waitlist" className="btn-secondary !py-2 !px-3 text-sm">Join waitlist</a>
      </nav>

      {/* background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="pill mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-greenBright animate-pulse" />
            Private beta · iOS launching soon
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Meet traders{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-greenBright to-brand-blueBright">
              near you.
            </span>
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl">
            Niche Network is the social app built for traders. Connect with people
            nearby, share setups, build groups, and grow your edge together.
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
              {['from-brand-greenBright to-brand-green','from-brand-blue to-brand-greenBright','from-brand-redBright to-brand-red','from-white to-white/60'].map((g, i) => (
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-bg bg-gradient-to-br ${g}`} />
              ))}
            </div>
            <div className="text-sm text-white/60">
              <span className="text-white font-medium">Early traders</span> are joining the waitlist every day.
            </div>
          </div>
        </div>

        {/* Right: phone */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-8 bg-[radial-gradient(closest-side,rgba(34,227,155,0.25),transparent)]" />
          <div className="relative animate-float">
            <PhoneFrame className="shadow-glow">
              <DiscoveryScreen />
            </PhoneFrame>
          </div>

          {/* floating chip 1 */}
          <div className="hidden sm:flex absolute -left-4 top-10 card !p-3 items-center gap-2 text-xs animate-fade-in">
            <span className="h-6 w-6 rounded-full bg-brand-green/20 text-brand-greenBright flex items-center justify-center">
              <TrendUp className="h-3 w-3" />
            </span>
            New idea shared · +1.4%
          </div>
          {/* floating chip 2 */}
          <div className="hidden sm:flex absolute -right-2 bottom-16 card !p-3 items-center gap-2 text-xs animate-fade-in">
            <span className="h-6 w-6 rounded-full bg-brand-blue/20 text-brand-blueBright flex items-center justify-center">
              +3
            </span>
            traders within 5 mi
          </div>
        </div>
      </div>

      {/* Ticker — the track is duplicated exactly once so translateX(-50%) loops seamlessly. */}
      <div className="relative border-y border-line/60 bg-black/30 overflow-hidden">
        <div className="ticker-track py-3">
          {[...tickers, ...tickers].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-white/80">${t.s}</span>
              <span className="text-white/60 tabular-nums">{t.p}</span>
              <span className={`flex items-center gap-1 tabular-nums ${t.up ? 'text-brand-greenBright' : 'text-brand-redBright'}`}>
                {t.up ? <TrendUp className="h-3 w-3" /> : <TrendDown className="h-3 w-3" />}
                {t.d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
