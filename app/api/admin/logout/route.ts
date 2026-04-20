import { NextResponse } from 'next/server';
import { endSession } from '@/lib/auth';

export const runtime = 'nodejs';

// Logout always clears whatever session cookie the browser has.
// Safe to call even if not signed in — it's idempotent.
export async function POST() {
  endSession();
  return NextResponse.json({ ok: true });
}
