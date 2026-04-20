'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight, CheckIcon } from './icons';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailForm({
  placeholder = 'you@trading.com',
  ctaLabel = 'Get notified at launch',
  compact = false,
}: {
  placeholder?: string;
  ctaLabel?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
        return;
      }
      setStatus('success');
      setMessage(data.message || "You're on the list.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 rounded-2xl border border-brand-pink/30 bg-brand-pink/10 px-4 py-3 text-sm ${compact ? '' : 'max-w-md'}`}>
        <span className="h-8 w-8 rounded-full bg-brand-pinkBright/20 text-brand-pinkBright flex items-center justify-center">
          <CheckIcon className="h-4 w-4" />
        </span>
        <span className="text-white/90">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`w-full ${compact ? '' : 'max-w-md'}`}>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm outline-none placeholder:text-white/40 focus:border-brand-pinkBright/60 focus:bg-white/10 transition"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? 'Adding…' : ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {status === 'error' && (
        <div className="mt-2 text-xs text-brand-redBright">{message}</div>
      )}
      <div className="mt-2 text-xs text-white/40">
        No spam. One email when we launch on the App Store.
      </div>
    </form>
  );
}
