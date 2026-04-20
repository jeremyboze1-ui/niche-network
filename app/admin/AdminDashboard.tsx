'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoMark, PlayIcon, XIcon } from '@/components/icons';

interface Subscriber {
  id: number;
  email: string;
  source: string;
  created_at: string;
}

interface Video {
  id: number;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
  created_at: string;
}

type Tab = 'videos' | 'emails';

export default function AdminDashboard({
  initialSubscribers,
  initialVideos,
  initialTotal,
}: {
  initialSubscribers: Subscriber[];
  initialVideos: Video[];
  initialTotal: number;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('videos');
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [videos, setVideos] = useState(initialVideos);
  const [total, setTotal] = useState(initialTotal);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  async function refresh() {
    try {
      const [eRes, vRes] = await Promise.all([
        fetch('/api/admin/emails'),
        fetch('/api/admin/videos'),
      ]);
      const e = await eRes.json();
      const v = await vRes.json();
      if (e.ok) {
        setSubscribers(e.subscribers);
        setTotal(e.subscribers.length);
      }
      if (v.ok) setVideos(v.videos);
    } catch {
      /* no-op */
    }
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Header */}
      <header className="border-b border-line/60 bg-bg-soft/60 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <div>
              <div className="font-semibold tracking-tight">Niche Network</div>
              <div className="text-[11px] text-white/50">Admin dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="btn-secondary !py-2 !px-3 text-sm">View site</a>
            <button onClick={logout} className="btn-secondary !py-2 !px-3 text-sm">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Waitlist emails" value={total.toLocaleString()} accent="green" />
          <StatCard label="Videos published" value={videos.length.toLocaleString()} accent="blue" />
          <StatCard label="Last signup" value={subscribers[0]?.email ?? '—'} accent="plain" small />
        </div>

        {/* Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 mb-6">
          <TabButton active={tab === 'videos'} onClick={() => setTab('videos')}>Videos</TabButton>
          <TabButton active={tab === 'emails'} onClick={() => setTab('emails')}>Waitlist emails</TabButton>
        </div>

        {tab === 'videos' && (
          <VideosPanel videos={videos} setVideos={setVideos} onRefresh={refresh} />
        )}
        {tab === 'emails' && (
          <EmailsPanel subscribers={subscribers} onRefresh={refresh} />
        )}
      </main>
    </div>
  );
}

function StatCard({
  label, value, accent, small,
}: { label: string; value: string; accent: 'green' | 'blue' | 'plain'; small?: boolean }) {
  const color =
    accent === 'green'
      ? 'text-brand-greenBright'
      : accent === 'blue'
      ? 'text-brand-blueBright'
      : 'text-white';
  return (
    <div className="card">
      <div className="text-xs text-white/50">{label}</div>
      <div className={`mt-2 ${small ? 'text-base' : 'text-3xl'} font-semibold ${color} truncate`}>
        {value}
      </div>
    </div>
  );
}

function TabButton({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm transition ${
        active ? 'bg-white text-black font-semibold' : 'text-white/70 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

// ---------- VIDEOS PANEL ----------

function VideosPanel({
  videos, setVideos, onRefresh,
}: {
  videos: Video[];
  setVideos: (v: Video[]) => void;
  onRefresh: () => Promise<void>;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumb, setThumb] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, url, thumbnail_url: thumb }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'Could not save.');
        setSaving(false);
        return;
      }
      setVideos([data.video, ...videos]);
      setTitle(''); setDescription(''); setUrl(''); setThumb('');
      setSuccess('Video added — it\'s now live on your landing page.');
    } catch {
      setError('Network error.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm('Remove this video from the landing page?')) return;
    const res = await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setVideos(videos.filter((v) => v.id !== id));
    } else {
      alert('Could not delete.');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Add video form */}
      <div className="lg:col-span-2">
        <div className="card">
          <h2 className="text-base font-semibold">Add a new video</h2>
          <p className="text-xs text-white/50 mt-1">
            Paste a YouTube or Vimeo link. It will show up on the landing page immediately.
          </p>

          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <LabeledInput
              label="Title *"
              value={title}
              onChange={setTitle}
              required
              placeholder="Launch teaser"
            />
            <LabeledInput
              label="Video URL * (YouTube or Vimeo)"
              value={url}
              onChange={setUrl}
              required
              placeholder="https://youtu.be/..."
            />
            <LabeledTextarea
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Short caption shown under the thumbnail"
            />
            <LabeledInput
              label="Custom thumbnail URL (optional)"
              value={thumb}
              onChange={setThumb}
              placeholder="https://..."
            />

            {error && <div className="text-xs text-brand-redBright">{error}</div>}
            {success && <div className="text-xs text-brand-greenBright">{success}</div>}

            <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
              {saving ? 'Saving…' : 'Publish video'}
            </button>
          </form>
        </div>

        <div className="mt-4 card !p-4 text-xs text-white/60">
          <div className="font-semibold text-white/80 mb-1">Tip</div>
          We use embed URLs (YouTube / Vimeo) so you never have to worry about hosting or bandwidth.
          Upload your video to YouTube, set it to Public or Unlisted, copy the URL, and paste it here.
        </div>
      </div>

      {/* Video list */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Published videos</h2>
          <button onClick={onRefresh} className="btn-secondary !py-1.5 !px-3 text-xs">
            Refresh
          </button>
        </div>

        {videos.length === 0 ? (
          <div className="card text-center py-10 text-sm text-white/50">
            <div className="mx-auto h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <PlayIcon className="h-5 w-5 text-white/60" />
            </div>
            No videos yet. Add your first one on the left.
          </div>
        ) : (
          <ul className="space-y-3">
            {videos.map((v) => (
              <li key={v.id} className="card !p-3 flex items-center gap-3">
                <div className="h-14 w-24 rounded-lg bg-black overflow-hidden shrink-0 flex items-center justify-center">
                  {v.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.thumbnail_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <PlayIcon className="h-5 w-5 text-white/60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{v.title}</div>
                  <div className="text-[11px] text-white/50 truncate">{v.url}</div>
                  {v.description && (
                    <div className="text-[11px] text-white/60 line-clamp-2 mt-0.5">{v.description}</div>
                  )}
                </div>
                <button
                  onClick={() => remove(v.id)}
                  aria-label="Delete"
                  className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-brand-redBright hover:bg-brand-red/10 flex items-center justify-center"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ---------- EMAILS PANEL ----------

function EmailsPanel({
  subscribers, onRefresh,
}: { subscribers: Subscriber[]; onRefresh: () => Promise<void> }) {
  const [q, setQ] = useState('');
  const filtered = q
    ? subscribers.filter((s) => s.email.toLowerCase().includes(q.toLowerCase()))
    : subscribers;

  function copyAll() {
    const text = subscribers.map((s) => s.email).join('\n');
    navigator.clipboard?.writeText(text);
  }

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="p-4 flex flex-wrap items-center gap-3 border-b border-line/60">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search emails…"
          className="flex-1 min-w-[180px] rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-brand-greenBright/60"
        />
        <button onClick={onRefresh} className="btn-secondary !py-2 !px-3 text-xs">
          Refresh
        </button>
        <button onClick={copyAll} className="btn-secondary !py-2 !px-3 text-xs">
          Copy all
        </button>
        <a
          href="/api/admin/emails/export"
          className="btn-primary !py-2 !px-3 text-xs"
        >
          Download CSV
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Source</th>
              <th className="text-left px-4 py-3 font-medium">Signed up</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-10 text-white/50">
                  No emails yet. Share your site — they&apos;ll show up here instantly.
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-line/60 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-mono text-xs">{s.email}</td>
                <td className="px-4 py-3 text-xs text-white/60">{s.source}</td>
                <td className="px-4 py-3 text-xs text-white/60 whitespace-nowrap">
                  {new Date(s.created_at + 'Z').toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Tiny form inputs ----------

function LabeledInput({
  label, value, onChange, placeholder, required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-brand-greenBright/60"
      />
    </div>
  );
}

function LabeledTextarea({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-brand-greenBright/60 resize-y"
      />
    </div>
  );
}
