import { NextResponse } from 'next/server';
import { addSubscriber, countSubscribers } from '@/lib/db';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ ok: false, error: 'Email is too long.' }, { status: 400 });
    }

    const result = addSubscriber(email, 'landing');
    const total = countSubscribers();

    return NextResponse.json({
      ok: true,
      duplicate: !!result.duplicate,
      total,
      message: result.duplicate
        ? "You're already on the list — we'll be in touch."
        : "You're on the list. We'll ping you at launch.",
    });
  } catch (err) {
    console.error('subscribe error', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  // Public-safe: return the current waitlist count for social-proof displays.
  return NextResponse.json({ total: countSubscribers() });
}
