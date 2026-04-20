import {
  MapPinIcon, UsersIcon, FeedIcon, LockIcon, ChatIcon, FilterIcon, SparkIcon,
} from './icons';

const features = [
  {
    title: 'Swipe to meet traders nearby',
    desc: 'Profiles built for traders — name, city, what they trade, experience, and a short bio. Tap the heart if you vibe.',
    icon: MapPinIcon,
    accent: 'from-brand-pinkBright to-brand-pink',
  },
  {
    title: 'Build your circle',
    desc: 'Keep the people you actually want to stay in touch with close. Start group chats, plan meetups, grow real friendships.',
    icon: UsersIcon,
    accent: 'from-brand-pinkBright to-brand-blue',
  },
  {
    title: 'Social feed for traders',
    desc: 'See who just moved to your city, who\u2019s starting a group, and who\u2019s down to grab coffee this weekend.',
    icon: FeedIcon,
    accent: 'from-brand-blueBright to-brand-pinkBright',
  },
  {
    title: 'Private circle feed',
    desc: 'A quieter, invite-only space for your closest trading friends. No noise, no strangers.',
    icon: LockIcon,
    accent: 'from-brand-pink to-brand-blue',
  },
  {
    title: 'Direct & group messaging',
    desc: 'Chat 1-on-1 or spin up a group with your crew. Plan meetups, share memes, stay close.',
    icon: ChatIcon,
    accent: 'from-white to-white/60',
  },
  {
    title: 'Filter how you want',
    desc: 'Narrow down by age, city, and what they trade \u2014 options, futures, crypto, forex, or stocks.',
    icon: FilterIcon,
    accent: 'from-brand-pinkBright to-brand-pink',
  },
  {
    title: 'Premium perks',
    desc: 'Unlimited swipes, advanced filters, and early access to new cities and features.',
    icon: SparkIcon,
    accent: 'from-brand-pinkBright to-brand-blueBright',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="pill mb-4">Features</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            A social app built just for traders.
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Not a trading platform. Not a chart tool. Niche Network is the place
            to meet, connect, and build real friendships with people who trade
            like you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group card hover:border-white/20 transition relative overflow-hidden"
            >
              <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${f.accent} opacity-20 blur-2xl group-hover:opacity-30 transition`} />
              <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.accent} text-black`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="relative mt-1.5 text-sm text-white/60">{f.desc}</p>
              <div className="relative mt-4 text-[11px] text-white/40 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-white/30" />
                Included in launch
                {i === features.length - 1 && (
                  <span className="pill !py-0 !px-2 !text-[10px] ml-2 !bg-brand-pink/10 !border-brand-pink/25 !text-brand-pinkBright">
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
