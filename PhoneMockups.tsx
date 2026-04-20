'use client';

import React from 'react';
import {
  MapPinIcon, UsersIcon, FeedIcon, LockIcon, ChatIcon, FilterIcon,
  TrendUp, TrendDown, HeartIcon, CommentIcon, ShareIcon, SearchIcon,
  SendIcon, XIcon, CheckIcon, BellIcon,
} from './icons';

// ------------------------------------------------------------------
// Phone frame used by every mockup. Fixed aspect-ratio so screens
// look right regardless of container size.
// ------------------------------------------------------------------
export function PhoneFrame({
  children,
  className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`phone-frame w-[280px] md:w-[320px] aspect-[9/19] ${className}`}>
      <div className="phone-screen w-full h-full flex flex-col">
        <StatusBar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] text-white/70 font-medium">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="h-[6px] w-[6px] rounded-full bg-white/70" />
        <span className="h-[6px] w-[6px] rounded-full bg-white/70" />
        <span className="h-[6px] w-[6px] rounded-full bg-white/70" />
      </span>
    </div>
  );
}

// ------------------------------------------------------------------
// DISCOVERY SCREEN — swipe-style card, but social (not dating).
// ------------------------------------------------------------------
export function DiscoveryScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-3">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4 text-white/70" />
          <span className="text-xs text-white/70">Within 25 mi</span>
        </div>
        <div className="text-sm font-semibold">Discover</div>
        <BellIcon className="h-4 w-4 text-white/70" />
      </div>

      {/* trader card */}
      <div className="px-4 flex-1">
        <div className="relative h-full rounded-3xl overflow-hidden border border-line bg-gradient-to-b from-[#1B1E26] to-[#0E1014]">
          {/* avatar area */}
          <div className="h-[55%] bg-gradient-to-br from-brand-blue/30 via-brand-green/20 to-transparent relative">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute top-3 left-3 flex gap-1.5">
              <span className="pill !py-1 !px-2 text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-greenBright" /> Online
              </span>
              <span className="pill !py-1 !px-2 text-[10px]">
                <MapPinIcon className="h-3 w-3" /> 2.4 mi
              </span>
            </div>
            {/* miniature avatar */}
            <div className="absolute bottom-3 left-4 flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-greenBright to-brand-blue flex items-center justify-center text-lg font-bold text-black">
                MA
              </div>
              <div>
                <div className="text-sm font-semibold">Maya A.</div>
                <div className="text-[11px] text-white/60">Options · Swing · 4y exp.</div>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="p-3 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="pill !py-1 !px-2 text-[10px]">$SPY</span>
              <span className="pill !py-1 !px-2 text-[10px]">$NVDA</span>
              <span className="pill !py-1 !px-2 text-[10px]">Macro</span>
              <span className="pill !py-1 !px-2 text-[10px]">Futures</span>
            </div>
            <p className="text-[11px] text-white/70 line-clamp-2">
              Looking for other NYC traders to swap setups on Sunday mornings. Mostly options flows + macro.
            </p>
          </div>

          {/* action buttons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            <button className="h-10 w-10 rounded-full bg-bg-elevated border border-line flex items-center justify-center text-brand-redBright">
              <XIcon className="h-5 w-5" />
            </button>
            <button className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-greenBright to-brand-green flex items-center justify-center text-black shadow-glow">
              <CheckIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <BottomNav active="discover" />
    </div>
  );
}

// ------------------------------------------------------------------
// PUBLIC FEED SCREEN
// ------------------------------------------------------------------
export function FeedScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="text-sm font-semibold">Feed</div>
        <div className="flex gap-2">
          <SearchIcon className="h-4 w-4 text-white/70" />
          <BellIcon className="h-4 w-4 text-white/70" />
        </div>
      </div>

      <div className="px-3 flex gap-2 pb-2 overflow-x-auto">
        {['For you', 'Equities', 'Options', 'Futures', 'Crypto'].map((t, i) => (
          <span
            key={t}
            className={`pill text-[10px] whitespace-nowrap ${i === 0 ? '!bg-white/10 !border-white/20' : ''}`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        <FeedPost
          initials="JR"
          name="Jamie R."
          time="3m"
          text="Breaking out of 4h compression on $NVDA. Watching 1,020 as the trigger."
          pnl="+$2,480"
          up
          likes={128}
          comments={24}
        />
        <FeedPost
          initials="AK"
          name="Alex K."
          time="12m"
          text="Getting stopped out on my $TSLA puts. Discipline > conviction today."
          pnl="-$310"
          likes={48}
          comments={9}
        />
        <FeedPost
          initials="SM"
          name="Sara M."
          time="48m"
          text="Anyone else building a watchlist around AI infra names this week? Sharing mine in my group."
          likes={212}
          comments={56}
        />
      </div>

      <BottomNav active="feed" />
    </div>
  );
}

function FeedPost({
  initials, name, time, text, pnl, up, likes, comments,
}: {
  initials: string; name: string; time: string; text: string;
  pnl?: string; up?: boolean; likes: number; comments: number;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-card p-3">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-greenBright flex items-center justify-center text-[11px] font-bold text-black">
          {initials}
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-semibold leading-tight">{name}</div>
          <div className="text-[10px] text-white/50">Trader · {time}</div>
        </div>
        {pnl && (
          <span
            className={`pill !py-0.5 !px-2 text-[10px] ${up ? '!text-brand-greenBright !bg-brand-green/10 !border-brand-green/20' : '!text-brand-redBright !bg-brand-red/10 !border-brand-red/20'}`}
          >
            {up ? <TrendUp className="h-3 w-3" /> : <TrendDown className="h-3 w-3" />}
            {pnl}
          </span>
        )}
      </div>
      <p className="text-[12px] text-white/80 mt-2 leading-snug">{text}</p>
      <div className="mt-2 flex items-center gap-3 text-[10px] text-white/50">
        <span className="flex items-center gap-1"><HeartIcon className="h-3 w-3" /> {likes}</span>
        <span className="flex items-center gap-1"><CommentIcon className="h-3 w-3" /> {comments}</span>
        <span className="flex items-center gap-1"><ShareIcon className="h-3 w-3" /> Share</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// NETWORK (private) FEED SCREEN
// ------------------------------------------------------------------
export function NetworkScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LockIcon className="h-4 w-4 text-brand-greenBright" />
          <div className="text-sm font-semibold">My Network</div>
        </div>
        <span className="pill !py-0.5 !px-2 text-[10px]">12 traders</span>
      </div>

      <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
        {['Maya', 'Jamie', 'Alex', 'Sara', 'Dev', 'Lin'].map((n, i) => (
          <div key={n} className="shrink-0 flex flex-col items-center gap-1">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-[11px] font-bold text-black bg-gradient-to-br ${['from-brand-greenBright to-brand-green','from-brand-blue to-brand-greenBright','from-brand-redBright to-brand-red','from-white to-white/70','from-brand-greenBright to-brand-blue','from-brand-blue to-brand-redBright'][i]}`}>
              {n[0]}
            </div>
            <span className="text-[9px] text-white/60">{n}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-brand-green/30 flex items-center justify-center">
              <UsersIcon className="h-4 w-4 text-brand-greenBright" />
            </div>
            <div className="text-[12px] font-semibold">3 new posts in your groups</div>
          </div>
        </div>

        <FeedPost
          initials="DV"
          name="Dev V."
          time="5m"
          text="Group idea: weekly call at 9pm ET to review each other's setups. Who's in?"
          likes={9}
          comments={4}
        />
        <FeedPost
          initials="LI"
          name="Lin C."
          time="1h"
          text="Sharing my options Greeks cheatsheet with the network — link in chat 🔒"
          likes={22}
          comments={11}
        />
      </div>

      <BottomNav active="network" />
    </div>
  );
}

// ------------------------------------------------------------------
// CHAT SCREEN
// ------------------------------------------------------------------
export function ChatScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* header */}
      <div className="px-4 pt-3 pb-3 flex items-center gap-3 border-b border-line/60">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-greenBright flex items-center justify-center text-[11px] font-bold text-black">
          MA
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold leading-tight">Maya A.</div>
          <div className="text-[10px] text-brand-greenBright">Online now</div>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-[12px]">
        <Bubble from="them">Hey! Saw your post on $NVDA — that setup looks clean.</Bubble>
        <Bubble from="me">Thanks! Watching 1,020 as the trigger today.</Bubble>
        <Bubble from="them">Same zone I had on my chart. Mind if I share yours with my group?</Bubble>
        <Bubble from="me">Go for it 🙌</Bubble>
        <Bubble from="them">Wanna grab coffee this weekend? Couple of us meet at the Brooklyn one.</Bubble>
      </div>

      {/* input */}
      <div className="px-3 py-2 border-t border-line/60 flex items-center gap-2">
        <div className="flex-1 rounded-full bg-bg-elevated border border-line px-3 py-2 text-[11px] text-white/60">
          Message Maya…
        </div>
        <button className="h-9 w-9 rounded-full bg-brand-greenBright flex items-center justify-center text-black">
          <SendIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Bubble({ from, children }: { from: 'me' | 'them'; children: React.ReactNode }) {
  return (
    <div className={`flex ${from === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[78%] px-3 py-2 rounded-2xl leading-snug ${
          from === 'me'
            ? 'bg-brand-greenBright text-black rounded-br-sm'
            : 'bg-bg-elevated border border-line text-white rounded-bl-sm'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// PROFILE SCREEN
// ------------------------------------------------------------------
export function ProfileScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* Gradient header */}
      <div className="h-24 bg-gradient-to-br from-brand-greenBright/30 via-brand-blue/20 to-brand-red/10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>
      <div className="-mt-10 px-4">
        <div className="h-20 w-20 rounded-2xl border-4 border-bg bg-gradient-to-br from-brand-greenBright to-brand-blue flex items-center justify-center text-2xl font-bold text-black">
          JH
        </div>
        <div className="mt-2">
          <div className="text-base font-semibold">Jordan H.</div>
          <div className="text-[11px] text-white/60 flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" /> Austin, TX · 3y trading
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="pill !py-1 !px-2 text-[10px]">Options</span>
          <span className="pill !py-1 !px-2 text-[10px]">Momentum</span>
          <span className="pill !py-1 !px-2 text-[10px]">$SPY</span>
          <span className="pill !py-1 !px-2 text-[10px]">$TSLA</span>
        </div>
      </div>

      <div className="mt-3 px-4 grid grid-cols-3 gap-2 text-center text-[10px]">
        <div className="rounded-xl bg-bg-card border border-line py-2">
          <div className="text-sm font-bold">148</div>
          <div className="text-white/50">Connections</div>
        </div>
        <div className="rounded-xl bg-bg-card border border-line py-2">
          <div className="text-sm font-bold text-brand-greenBright">+12.4%</div>
          <div className="text-white/50">YTD shared</div>
        </div>
        <div className="rounded-xl bg-bg-card border border-line py-2">
          <div className="text-sm font-bold">38</div>
          <div className="text-white/50">Ideas</div>
        </div>
      </div>

      <div className="px-4 mt-3">
        <div className="rounded-2xl border border-line bg-bg-card p-3">
          <div className="text-[11px] text-white/70 font-semibold">About</div>
          <p className="text-[11px] text-white/60 mt-1 leading-snug">
            Full-time trader focused on US equities and options. Love talking macro
            and sharing setups. Open to meetups in Austin.
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <BottomNav active="profile" />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Bottom nav shared across screens
// ------------------------------------------------------------------
function BottomNav({ active }: { active: 'discover' | 'feed' | 'network' | 'chat' | 'profile' }) {
  const items: { key: typeof active; icon: React.ReactNode; label: string }[] = [
    { key: 'discover', icon: <MapPinIcon className="h-4 w-4" />, label: 'Discover' },
    { key: 'feed', icon: <FeedIcon className="h-4 w-4" />, label: 'Feed' },
    { key: 'network', icon: <UsersIcon className="h-4 w-4" />, label: 'Network' },
    { key: 'chat', icon: <ChatIcon className="h-4 w-4" />, label: 'Chats' },
    { key: 'profile', icon: <div className="h-4 w-4 rounded-full bg-gradient-to-br from-brand-greenBright to-brand-blue" />, label: 'Me' },
  ];
  return (
    <div className="border-t border-line/60 bg-bg-soft/95 backdrop-blur px-2 py-2 flex justify-between items-center">
      {items.map((it) => (
        <div
          key={it.key}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            active === it.key ? 'text-brand-greenBright bg-brand-green/5' : 'text-white/50'
          }`}
        >
          {it.icon}
          <span className="text-[9px]">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
