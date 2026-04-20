import {
  MapPinIcon, UsersIcon, FeedIcon, LockIcon, ChatIcon, FilterIcon, SparkIcon,
} from './icons';

const features = [
  {
    title: 'Discover traders near you',
    desc: 'Swipe through traders in your city with setups, style, and experience that matches yours.',
    icon: MapPinIcon,
    accent: 'from-brand-greenBright to-brand-green',
  },
  {
    title: 'Build your network',
    desc: 'Connect, follow back, and form tight groups of traders you actually want to hear from.',
    icon: UsersIcon,
    accent: 'from-brand-blue to-brand-greenBright',
  },
  {
    title: 'Public trading feed',
    desc: 'See what the market is saying. Share your ideas and jump into the conversation.',
    icon: FeedIcon,
    accent: 'from-brand-blueBright to-brand-blue',
  },
  {
    title: 'Private network feed',
    desc: 'Your inner circle only. A private feed for the traders you trust.',
    icon: LockIcon,
    accent: 'from-brand-green to-brand-blue',
  },
  {
    title: 'Direct messaging',
    desc: 'Chat 1-on-1 or in group threads. Swap charts, setups, and meet up in real life.',
    icon: ChatIcon,
    accent: 'from-white to-white/60',
  },
  {
    title: 'Filter by what they trade',
    desc: 'Options, futures, crypto, equities — find traders who trade exactly what you do.',
    icon: FilterIcon,
    accent: 'from-brand-redBright to-brand-red',
  },
  {
    title: 'Premium perks',
    desc: 'Unlimited connections, advanced filters, and early access to new features.',
    icon: SparkIcon,
    accent: 'from-brand-greenBright to-brand-blueBright',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="pill mb-4">Features</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Everything a trader needs, in one social app.
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Built to help you meet sharper traders, share better ideas, and compound your network
            the same way you compound your portfolio.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group card hover:border-white/20 transition relative overflow-hidden"
            >
              <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${f.accent} opacity-20 blur-2xl group-hover:opacity-30 transition`} />
              <div className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} text-black`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="relative mt-1.5 text-sm text-white/60">{f.desc}</p>
              <div className="relative mt-4 text-[11px] text-white/40 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                Included in launch
                {i === features.length - 1 && (
                  <span className="pill !py-0 !px-2 !text-[10px] ml-2 !bg-brand-green/10 !border-brand-green/20 !text-brand-greenBright">
                    Premium
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
