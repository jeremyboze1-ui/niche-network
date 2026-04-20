import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { listSubscribers } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const subscribers = listSubscribers();
  return NextResponse.json({ ok: true, subscribers });
}
