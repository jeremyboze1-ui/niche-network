const steps = [
  {
    n: '01',
    title: 'Build your profile',
    desc: 'Add a photo, your age, city, what you trade, and a short bio. Takes a minute.',
  },
  {
    n: '02',
    title: 'Swipe through traders',
    desc: 'Filter by age, location, and what they trade. Tap the heart on people you want to meet.',
  },
  {
    n: '03',
    title: 'Match and message',
    desc: 'When you both tap the heart, you can chat. Swap intros, plan a coffee, start a group.',
  },
  {
    n: '04',
    title: 'Build your circle',
    desc: 'Keep your closest trading friends close. Plan meetups, share the journey, stay in touch.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="pill mb-4">How it works</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            From solo trader to real friendships in 4 steps.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-6 right-6 h-px bg-gradient-to-r from-brand-pink/40 via-brand-pinkBright/40 to-brand-blue/40" />
          {steps.map((s, i) => (
            <div key={s.n} className="relative card hover:border-white/20 transition">
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black border border-line text-brand-pinkBright font-mono text-sm">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-white/60">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 -right-3 h-2 w-2 rounded-full bg-brand-pinkBright shadow-glowPink" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
