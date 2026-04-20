'use client';

import { useRef } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AppPreview from '@/components/AppPreview';
import HowItWorks from '@/components/HowItWorks';
import VideoSection, { VideoSectionHandle } from '@/components/VideoSection';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const videoRef = useRef<VideoSectionHandle>(null);

  return (
    <main className="min-h-screen bg-bg text-white">
      <Hero onWatchDemo={() => videoRef.current?.openFirst()} />
      <Features />
      <AppPreview />
      <HowItWorks />
      <VideoSection ref={videoRef} />
      <Waitlist />
      <Footer />
    </main>
  );
}
