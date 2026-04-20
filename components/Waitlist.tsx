'use client';

import { useEffect, useState } from 'react';
import EmailForm from './EmailForm';

export default function Waitlist() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancel = false;
    fetch('/api/subscribe')
      .then((r) => r.json())
      .then((d) => { if (!cancel) setCount(typeof d.total === 'number' ? d.total : 0); })
      .catch(() => { if (!cancel) setCount(0); });
    return () => { cancel = true; };
  }, []);

  // Base floor so the counter doesn't look empty on day one.
  const displayCount = count === null ? null : Math.max(count, 0) + 247;

  return (
    <section id="waitlist" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,95,162,0.14),transparent_60%)]" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 pill mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pinkBright animate-pulse" />
          Early access
        </div>
        <h2 className="text-3xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          Meet the traders{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pinkBright via-brand-blueBright to-brand-pinkBright">
            in your city first.
          </span>
        </h2>
        <p className="mt-5 text-white/60 text-lg max-w-2xl mx-auto">
          Join the waitlist today. We&apos;ll text you the second Niche Network
          goes live in your city — plus early access perks for the first wave.
        </p>

        <div className="mt-8 flex justify-center">
          <EmailForm />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <Stat label="On the waitlist" value={displayCount === null ? '—' : displayCount.toLocaleString()} highlight />
          <Stat label="Cities" value="40+" />
          <Stat label="Trades supported" value="Stocks · Options · Futures · Forex · Crypto" small />
          <Stat label="iOS launch" value="Q3" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label, value, highlight, small,
}: { label: string; value: string; highlight?: boolean; small?: boolean }) {
  return (
    <div className={`card !p-4 ${highlight ? '!border-brand-pink/30 !bg-brand-pink/5' : ''}`}>
      <div className={`${small ? 'text-sm' : 'text-2xl'} font-semibold ${highlight ? 'text-brand-pinkBright' : 'text-white'}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-white/50">{label}</div>
    </div>
  );
}
