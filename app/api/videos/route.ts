import { NextResponse } from 'next/server';
import { listVideos } from '@/lib/db';

export const runtime = 'nodejs';

// Public endpoint — returns videos for display on the landing page.
export async function GET() {
  const videos = listVideos();
  return NextResponse.json({ videos });
}
