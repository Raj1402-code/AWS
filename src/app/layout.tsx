import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trip Wise — Smart Travel Planner & Itinerary Builder',
  description:
    'Explore curated global destinations with interactive 3D preview cards, instant search, multi-factor filtering, and persistent itinerary planning.',
  keywords: ['travel', 'planner', 'trip wise', 'destinations', 'itinerary', 'vacation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-space-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
