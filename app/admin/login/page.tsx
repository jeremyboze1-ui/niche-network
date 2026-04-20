'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoMark } from '@/components/icons';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Login failed.');
        setLoading(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg hero-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <LogoMark className="h-10 w-10" />
          <span className="font-semibold tracking-tight text-lg">Niche Network</span>
        </div>

        <form onSubmit={onSubmit} className="card space-y-4">
          <div>
            <h1 className="text-xl font-semibold">Admin sign in</h1>
            <p className="text-sm text-white/60 mt-1">
              For the Niche Network team only.
            </p>
          </div>

          <div>
            <label htmlFor="pw" className="text-xs text-white/60">
              Admin password
            </label>
            <input
              id="pw"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand-greenBright/60 focus:bg-white/10 transition"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-xs text-brand-redBright">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="text-[11px] text-white/40 text-center">
            Not the admin? <a href="/" className="text-white/60 hover:text-white underline">Back to site</a>
          </div>
        </form>
      </div>
    </main>
  );
}
