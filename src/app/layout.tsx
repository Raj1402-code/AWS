import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trip Wise — Smart Travel Planner & Itinerary Builder',
  description:
    'Explore curated global destinations with interactive 3D preview cards, instant search, multi-factor filtering, and persistent itinerary planning.',
  keywords: ['travel', 'planner', 'trip wise', 'destinations', 'itinerary', 'vacation'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="bg-space-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
