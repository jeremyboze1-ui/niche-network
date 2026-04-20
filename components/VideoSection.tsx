'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { PlayIcon, XIcon } from './icons';

interface Video {
  id: number;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
}

export interface VideoSectionHandle {
  openFirst: () => void;
}

const VideoSection = forwardRef<VideoSectionHandle>(function VideoSection(_props, ref) {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [active, setActive] = useState<Video | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancel = false;
    fetch('/api/videos')
      .then((r) => r.json())
      .then((d) => { if (!cancel) setVideos(d.videos || []); })
      .catch(() => { if (!cancel) setVideos([]); });
    return () => { cancel = true; };
  }, []);

  useImperativeHandle(ref, () => ({
    openFirst: () => {
      if (videos && videos.length > 0) {
        setActive(videos[0]);
      } else {
        // If we don't have any videos yet, scroll to the section so visitors know what's coming.
        document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  }));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null);
    }
    if (active) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="videos" className="py-24 md:py-32 bg-bg-soft/40 border-y border-line/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <div className="pill mb-4">Watch</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            See Niche Network in motion.
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Short demos, product tours, and founder updates — posted as we roll out to the App Store.
          </p>
        </div>

        {videos === null && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card animate-pulse h-56" />
            ))}
          </div>
        )}

        {videos && videos.length === 0 && (
          <div className="card text-center py-16">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <PlayIcon className="h-6 w-6 text-white/70" />
            </div>
            <div className="text-lg font-semibold">Videos coming soon</div>
            <p className="text-white/50 text-sm max-w-md mx-auto mt-2">
              The team is cooking the first product demos. Drop your email and we&apos;ll send them to you the moment they&apos;re live.
            </p>
          </div>
        )}

        {videos && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <button
                key={v.id}
                onClick={() => setActive(v)}
                className="group text-left card hover:border-white/20 transition overflow-hidden !p-0"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  {v.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={v.thumbnail_url}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-greenBright/30 via-brand-blue/20 to-brand-red/10" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="h-14 w-14 rounded-full bg-white/10 backdrop-blur border border-white/30 flex items-center justify-center shadow-glow group-hover:scale-110 transition">
                      <PlayIcon className="h-6 w-6 translate-x-0.5 text-white" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-base font-semibold">{v.title}</div>
                  {v.description && (
                    <p className="mt-1 text-sm text-white/60 line-clamp-2">{v.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Video modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur"
          onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
        >
          <div className="relative w-full max-w-4xl">
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute -top-10 right-0 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <XIcon className="h-5 w-5" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-black border border-line">
              <div className="aspect-video">
                <iframe
                  src={active.url}
                  title={active.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <div className="text-lg font-semibold">{active.title}</div>
                {active.description && (
                  <p className="mt-1 text-sm text-white/60">{active.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default VideoSection;
