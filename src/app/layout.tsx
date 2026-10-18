import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trip Wise | Smart Zero-Gravity Travel Planner',
  description:
    'Explore breathtaking destinations with antigravity physics, smart filtering, and persistent interactive itinerary planning.',
  keywords: ['travel', 'planner', 'trip wise', 'antigravity', 'destinations', 'itinerary'],
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
