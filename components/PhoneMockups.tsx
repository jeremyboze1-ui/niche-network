'use client';

import React from 'react';
import {
  MapPinIcon, UsersIcon, FeedIcon, LockIcon, ChatIcon, FilterIcon,
  HeartIcon, CommentIcon, ShareIcon, SearchIcon,
  SendIcon, XIcon, BellIcon,
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

// Re-usable avatar with a warm gradient background.
function Avatar({
  initials,
  size = 'md',
  gradient = 'from-brand-pinkBright to-brand-blue',
}: {
  initials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: string;
}) {
  const sizes: Record<string, string> = {
    sm: 'h-8 w-8 text-[11px] rounded-xl',
    md: 'h-10 w-10 text-xs rounded-2xl',
    lg: 'h-14 w-14 text-base rounded-2xl',
    xl: 'h-20 w-20 text-2xl rounded-3xl',
  };
  return (
    <div
      className={`${sizes[size]} bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-black`}
    >
      {initials}
    </div>
  );
}

// ------------------------------------------------------------------
// DISCOVERY SCREEN — Tinder-style profile card for traders.
// Only profile pic, name, age, city, niche, experience, short bio.
// No PnL, no win-rates, no charts.
// ------------------------------------------------------------------
export function DiscoveryScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <FilterIcon className="h-4 w-4 text-white/70" />
        <div className="text-sm font-semibold">Discover</div>
        <BellIcon className="h-4 w-4 text-white/70" />
      </div>

      {/* filter chips */}
      <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
        <span className="pill !py-1 !px-2 text-[10px] !bg-brand-pink/15 !border-brand-pink/30 !text-brand-pinkBright whitespace-nowrap">
          Ages 19–25
        </span>
        <span className="pill !py-1 !px-2 text-[10px] !bg-brand-pink/15 !border-brand-pink/30 !text-brand-pinkBright whitespace-nowrap">
          Los Angeles
        </span>
        <span className="pill !py-1 !px-2 text-[10px] !bg-brand-pink/15 !border-brand-pink/30 !text-brand-pinkBright whitespace-nowrap">
          Futures
        </span>
      </div>

      {/* trader profile card */}
      <div className="px-4 flex-1">
        <div className="relative h-full rounded-[28px] overflow-hidden border border-line bg-gradient-to-b from-[#1E1620] to-[#0E1014] shadow-glowPink">
          {/* photo area */}
          <div className="h-[58%] bg-gradient-to-br from-brand-pinkBright/40 via-brand-blue/20 to-transparent relative flex items-end">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="pill !py-1 !px-2 text-[10px] !bg-black/40 !border-white/15">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-greenBright" /> Online
              </span>
              <span className="pill !py-1 !px-2 text-[10px] !bg-black/40 !border-white/15">
                <MapPinIcon className="h-3 w-3" /> 2.4 mi
              </span>
            </div>
            <div className="relative p-4 pb-3 w-full">
              <Avatar initials="JO" size="xl" gradient="from-brand-pinkBright to-brand-blue" />
            </div>
          </div>

          {/* body */}
          <div className="px-4 pt-3 pb-20 space-y-2">
            <div className="flex items-end gap-1.5">
              <div className="text-lg font-bold leading-none">Jordan</div>
              <div className="text-lg font-semibold text-white/70 leading-none">21</div>
            </div>
            <div className="text-[11px] text-white/60 flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" /> Los Angeles, CA
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="pill !py-1 !px-2 text-[10px] !bg-brand-pink/10 !border-brand-pink/25 !text-brand-pinkBright">
                Futures
              </span>
              <span className="pill !py-1 !px-2 text-[10px]">
                Trading for 2 years
              </span>
            </div>
            <p className="text-[11px] text-white/75 leading-snug pt-1">
              Looking to build a trading group with people in my area. I trade NQ futures.
            </p>
          </div>

          {/* action buttons */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-5">
            <button className="h-12 w-12 rounded-full bg-bg-elevated border border-line flex items-center justify-center text-white/70">
              <XIcon className="h-5 w-5" />
            </button>
            <button className="h-14 w-14 rounded-full bg-gradient-to-br from-brand-pinkBright to-brand-pink flex items-center justify-center text-white shadow-glowPink">
              <HeartIcon className="h-6 w-6" />
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
// PUBLIC FEED SCREEN — social posts (meetups, intros, group chats).
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

      <div className="px-3 flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        {['For you', 'Nearby', 'Futures', 'Options', 'Crypto'].map((t, i) => (
          <span
            key={t}
            className={`pill text-[10px] whitespace-nowrap ${i === 0 ? '!bg-brand-pink/15 !border-brand-pink/30 !text-brand-pinkBright' : ''}`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2 no-scrollbar">
        <FeedPost
          initials="JR"
          name="Jamie R."
          city="Los Angeles, CA"
          time="3m"
          text="Any NQ futures traders in LA wanna meet up for coffee this weekend? Thinking Saturday morning in Santa Monica."
          likes={84}
          comments={22}
          gradient="from-brand-pinkBright to-brand-blue"
        />
        <FeedPost
          initials="AK"
          name="Alex K."
          city="Austin, TX"
          time="18m"
          text="New to the app 👋 22, trading options for a year. Looking to make friends who take this seriously."
          likes={131}
          comments={47}
          gradient="from-brand-blue to-brand-pinkBright"
        />
        <FeedPost
          initials="SM"
          name="Sara M."
          city="Miami, FL"
          time="1h"
          text="Starting a small group chat for crypto traders in South Florida. Reply here if you want an invite 🌴"
          likes={208}
          comments={63}
          gradient="from-brand-greenBright to-brand-blue"
        />
      </div>

      <BottomNav active="feed" />
    </div>
  );
}

function FeedPost({
  initials, name, city, time, text, likes, comments, gradient,
}: {
  initials: string; name: string; city: string; time: string; text: string;
  likes: number; comments: number; gradient: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-card p-3">
      <div className="flex items-center gap-2">
        <Avatar initials={initials} size="sm" gradient={gradient} />
        <div className="flex-1">
          <div className="text-[12px] font-semibold leading-tight">{name}</div>
          <div className="text-[10px] text-white/50 flex items-center gap-1">
            <MapPinIcon className="h-2.5 w-2.5" /> {city} · {time}
          </div>
        </div>
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
// MY CIRCLE SCREEN — private group of people you've connected with.
// ------------------------------------------------------------------
export function NetworkScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LockIcon className="h-4 w-4 text-brand-pinkBright" />
          <div className="text-sm font-semibold">My Circle</div>
        </div>
        <span className="pill !py-0.5 !px-2 text-[10px]">12 friends</span>
      </div>

      <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { n: 'Maya', g: 'from-brand-pinkBright to-brand-blue' },
          { n: 'Jamie', g: 'from-brand-blue to-brand-pinkBright' },
          { n: 'Alex', g: 'from-brand-pink to-brand-pinkBright' },
          { n: 'Sara', g: 'from-brand-greenBright to-brand-blue' },
          { n: 'Dev', g: 'from-brand-pinkBright to-brand-greenBright' },
          { n: 'Lin', g: 'from-brand-blue to-brand-pink' },
        ].map(({ n, g }) => (
          <div key={n} className="shrink-0 flex flex-col items-center gap-1">
            <div className={`h-11 w-11 rounded-full flex items-center justify-center text-[11px] font-bold text-black bg-gradient-to-br ${g}`}>
              {n[0]}
            </div>
            <span className="text-[9px] text-white/60">{n}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2 no-scrollbar">
        <div className="rounded-2xl border border-brand-pink/30 bg-brand-pink/5 p-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-brand-pink/20 flex items-center justify-center">
              <UsersIcon className="h-4 w-4 text-brand-pinkBright" />
            </div>
            <div className="text-[12px] font-semibold">3 new posts from your circle</div>
          </div>
        </div>

        <FeedPost
          initials="DV"
          name="Dev V."
          city="Los Angeles, CA"
          time="5m"
          text="Anyone down to grab dinner Friday night? Thinking of starting a weekly thing with the LA futures crew."
          likes={9}
          comments={4}
          gradient="from-brand-pinkBright to-brand-greenBright"
        />
        <FeedPost
          initials="LI"
          name="Lin C."
          city="Brooklyn, NY"
          time="1h"
          text="Just added two new people to our options group chat — say hi when you get a sec 👋"
          likes={22}
          comments={11}
          gradient="from-brand-blue to-brand-pink"
        />
      </div>

      <BottomNav active="network" />
    </div>
  );
}

// ------------------------------------------------------------------
// CHAT SCREEN — conversational, about meeting up.
// ------------------------------------------------------------------
export function ChatScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* header */}
      <div className="px-4 pt-3 pb-3 flex items-center gap-3 border-b border-line/60">
        <Avatar initials="MA" size="sm" gradient="from-brand-pinkBright to-brand-blue" />
        <div className="flex-1">
          <div className="text-sm font-semibold leading-tight">Maya A.</div>
          <div className="text-[10px] text-brand-pinkBright">Online now</div>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-[12px] no-scrollbar">
        <Bubble from="them">Hey! Saw your profile — also trading futures in LA 🙌</Bubble>
        <Bubble from="me">No way, that's awesome. How long have you been at it?</Bubble>
        <Bubble from="them">About 3 years. You?</Bubble>
        <Bubble from="me">Almost 2. Would love to meet other people doing it seriously.</Bubble>
        <Bubble from="them">Same! A few of us grab coffee Saturday mornings in Santa Monica. Wanna come?</Bubble>
        <Bubble from="me">I'm in 🙌</Bubble>
      </div>

      {/* input */}
      <div className="px-3 py-2 border-t border-line/60 flex items-center gap-2">
        <div className="flex-1 rounded-full bg-bg-elevated border border-line px-3 py-2 text-[11px] text-white/60">
          Message Maya…
        </div>
        <button className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-pinkBright to-brand-pink flex items-center justify-center text-white">
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
            ? 'bg-gradient-to-br from-brand-pinkBright to-brand-pink text-white rounded-br-sm'
            : 'bg-bg-elevated border border-line text-white rounded-bl-sm'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// PROFILE SCREEN — Friends / Groups / Posts. No PnL.
// ------------------------------------------------------------------
export function ProfileScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* Gradient header */}
      <div className="h-24 bg-gradient-to-br from-brand-pinkBright/40 via-brand-blue/20 to-brand-pink/10 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>
      <div className="-mt-10 px-4">
        <Avatar initials="JH" size="xl" gradient="from-brand-pinkBright to-brand-blue" />
        <div className="mt-2">
          <div className="flex items-end gap-1.5">
            <div className="text-base font-semibold leading-none">Jordan H.</div>
            <div className="text-sm font-medium text-white/60 leading-none">21</div>
          </div>
          <div className="text-[11px] text-white/60 flex items-center gap-1 mt-1">
            <MapPinIcon className="h-3 w-3" /> Los Angeles, CA · Trading for 2 years
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="pill !py-1 !px-2 text-[10px] !bg-brand-pink/10 !border-brand-pink/25 !text-brand-pinkBright">Futures</span>
          <span className="pill !py-1 !px-2 text-[10px]">Options</span>
          <span className="pill !py-1 !px-2 text-[10px]">Day trading</span>
        </div>
      </div>

      <div className="mt-3 px-4 grid grid-cols-3 gap-2 text-center text-[10px]">
        <div className="rounded-2xl bg-bg-card border border-line py-2">
          <div className="text-sm font-bold">148</div>
          <div className="text-white/50">Friends</div>
        </div>
        <div className="rounded-2xl bg-bg-card border border-line py-2">
          <div className="text-sm font-bold">6</div>
          <div className="text-white/50">Groups</div>
        </div>
        <div className="rounded-2xl bg-bg-card border border-line py-2">
          <div className="text-sm font-bold">38</div>
          <div className="text-white/50">Posts</div>
        </div>
      </div>

      <div className="px-4 mt-3">
        <div className="rounded-2xl border border-line bg-bg-card p-3">
          <div className="text-[11px] text-white/70 font-semibold">About</div>
          <p className="text-[11px] text-white/60 mt-1 leading-snug">
            Looking to build a trading group with people in my area. I trade NQ
            futures. Always down to grab coffee and talk shop.
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
    { key: 'discover', icon: <HeartIcon className="h-4 w-4" />, label: 'Discover' },
    { key: 'feed', icon: <FeedIcon className="h-4 w-4" />, label: 'Feed' },
    { key: 'network', icon: <UsersIcon className="h-4 w-4" />, label: 'Circle' },
    { key: 'chat', icon: <ChatIcon className="h-4 w-4" />, label: 'Chats' },
    { key: 'profile', icon: <div className="h-4 w-4 rounded-full bg-gradient-to-br from-brand-pinkBright to-brand-blue" />, label: 'Me' },
  ];
  return (
    <div className="border-t border-line/60 bg-bg-soft/95 backdrop-blur px-2 py-2 flex justify-between items-center">
      {items.map((it) => (
        <div
          key={it.key}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            active === it.key ? 'text-brand-pinkBright bg-brand-pink/5' : 'text-white/50'
          }`}
        >
          {it.icon}
          <span className="text-[9px]">{it.label}</span>
        </div>
      ))}
    </div>
  );
}
