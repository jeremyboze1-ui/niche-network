'use client';

import { useState } from 'react';
import {
  ChatScreen, DiscoveryScreen, FeedScreen, NetworkScreen, PhoneFrame, ProfileScreen,
} from './PhoneMockups';

const tabs = [
  { key: 'discover', label: 'Discovery', render: () => <DiscoveryScreen /> },
  { key: 'feed', label: 'Feed', render: () => <FeedScreen /> },
  { key: 'network', label: 'Network', render: () => <NetworkScreen /> },
  { key: 'chat', label: 'Chat', render: () => <ChatScreen /> },
  { key: 'profile', label: 'Profile', render: () => <ProfileScreen /> },
] as const;

type TabKey = typeof tabs[number]['key'];

export default function AppPreview() {
  const [active, setActive] = useState<TabKey>('feed');
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section id="preview" className="relative py-24 md:py-32 bg-bg-soft/40 border-y border-line/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="pill mb-4">App preview</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              A real app, built for how traders actually connect.
            </h2>
            <p className="mt-4 text-white/60 text-lg">
              Swipe, post, DM, and build your circle. Here&apos;s what the experience
              will feel like on day one.
            </p>
          </div>

          {/* Tab selector */}
          <div className="inline-flex flex-wrap gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  active === t.key
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main phone showcase: one featured + grid of smaller screens */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <PhoneFrame className="shadow-glow">
              {current.render()}
            </PhoneFrame>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tabs
                .filter((t) => t.key !== active)
                .map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className="card hover:border-white/20 transition text-left p-3 flex flex-col gap-3"
                  >
                    <div className="mx-auto w-full aspect-[9/19] max-w-[160px] rounded-2xl border border-line overflow-hidden">
                      <div className="phone-screen w-full h-full">
                        {/* Mini previews scale down the same screens */}
                        <div className="origin-top-left scale-[0.5] w-[200%] h-[200%]">
                          {t.render()}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.label}</div>
                      <div className="text-xs text-white/50 mt-0.5">
                        {t.key === 'discover' && 'Find traders near you'}
                        {t.key === 'feed' && 'Public trading feed'}
                        {t.key === 'network' && 'Your private circle'}
                        {t.key === 'chat' && 'DMs & group threads'}
                        {t.key === 'profile' && 'Your trader identity'}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
