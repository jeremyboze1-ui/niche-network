import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { deleteVideo } from '@/lib/db';

export const runtime = 'nodejs';

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 });
  }
  const removed = deleteVideo(id);
  return NextResponse.json({ ok: removed });
}
