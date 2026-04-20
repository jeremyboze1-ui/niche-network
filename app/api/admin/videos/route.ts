import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { addVideo, listVideos } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, videos: listVideos() });
}

/**
 * Normalizes a user-pasted YouTube / Vimeo link into an embeddable URL.
 * If it's already an embed URL we pass it through unchanged.
 * If it's not a recognized format, we return the original — the <iframe> may or may not work,
 * but we don't want to reject arbitrary valid URLs.
 */
function normalizeVideoUrl(raw: string): string {
  const url = raw.trim();
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // youtube.com/watch?v=<id>
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') {
        const id = u.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (u.pathname.startsWith('/shorts/')) {
        const id = u.pathname.split('/')[2];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      // already /embed/<id>
      if (u.pathname.startsWith('/embed/')) return url;
    }
    // vimeo.com/<id>
    if (u.hostname.endsWith('vimeo.com') && /^\/\d+/.test(u.pathname)) {
      const id = u.pathname.split('/')[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    /* fall through */
  }
  return url;
}

export async function POST(req: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const description = typeof body?.description === 'string' ? body.description.trim() : '';
  const rawUrl = typeof body?.url === 'string' ? body.url.trim() : '';
  const thumbnail_url = typeof body?.thumbnail_url === 'string' ? body.thumbnail_url.trim() : '';

  if (!title) return NextResponse.json({ ok: false, error: 'Title is required.' }, { status: 400 });
  if (!rawUrl) return NextResponse.json({ ok: false, error: 'Video URL is required.' }, { status: 400 });

  try {
    // Sanity-check that the URL parses at all.
    // eslint-disable-next-line no-new
    new URL(rawUrl);
  } catch {
    return NextResponse.json({ ok: false, error: 'Please provide a valid URL.' }, { status: 400 });
  }

  const url = normalizeVideoUrl(rawUrl);
  const video = addVideo({
    title,
    description: description || undefined,
    url,
    thumbnail_url: thumbnail_url || undefined,
  });

  return NextResponse.json({ ok: true, video });
}
