const steps = [
  {
    n: '01',
    title: 'Create your profile',
    desc: 'Your trading style, what you trade, experience, location. One screen — no bio essays.',
  },
  {
    n: '02',
    title: 'Discover traders',
    desc: 'Swipe through traders near you or globally. Filter by instrument, strategy, and experience.',
  },
  {
    n: '03',
    title: 'Connect and message',
    desc: 'Match, DM, swap setups, and link up in real life with traders who actually get it.',
  },
  {
    n: '04',
    title: 'Build your network',
    desc: 'Form private groups, share ideas in your own feed, and grow your edge together.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="pill mb-4">How it works</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            From solo trader to a real community in 4 steps.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-6 right-6 h-px bg-gradient-to-r from-brand-green/40 via-brand-blue/40 to-brand-red/40" />
          {steps.map((s, i) => (
            <div key={s.n} className="relative card hover:border-white/20 transition">
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-line text-brand-greenBright font-mono text-sm">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-white/60">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 -right-3 h-2 w-2 rounded-full bg-brand-greenBright shadow-glow" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
