import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Niche Network — The social app for traders',
  description:
    'Meet traders near you. Build your network, share ideas, and grow together. Join the waitlist for the social app built for traders.',
  openGraph: {
    title: 'Niche Network — The social app for traders',
    description:
      'Meet traders near you. Build your network, share ideas, and grow together.',
    type: 'website',
  },
  themeColor: '#0A0B0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
