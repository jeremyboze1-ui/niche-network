import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { listSubscribers } from '@/lib/db';

export const runtime = 'nodejs';

function escapeCsv(value: string) {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const rows = listSubscribers();
  const header = 'email,source,created_at\n';
  const body = rows.map((r) => [r.email, r.source, r.created_at].map(escapeCsv).join(',')).join('\n');
  const csv = header + body + (body ? '\n' : '');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="niche-network-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
