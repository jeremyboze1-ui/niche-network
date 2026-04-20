import { NextResponse } from 'next/server';
import { startSession, verifyAdminPassword } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!verifyAdminPassword(password)) {
    // Small artificial delay so login failures aren't trivially brute-forced.
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
  }

  startSession();
  return NextResponse.json({ ok: true });
}
