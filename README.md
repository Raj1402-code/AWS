# 🌐 Trip Wise — Smart Travel Planner

**Trip Wise** is a modern, responsive travel planning web application built with **React / Next.js**, **Tailwind CSS**, **Framer Motion**, and **WebGL2 Particles**.

Designed with clean glassmorphic interfaces, interactive 3D physics hover effects, momentum scrolling, and persistent local storage itinerary management — all running **100% on the frontend with zero backend dependencies**.

---

## ✨ Features

### 1. 🌍 Destination Exploration
- **Interactive 3D Hover Tilt:** Cards react in real-time to cursor movements using spring physics and dynamic specular glare.
- **Continuous Ambient Float:** Staggered floating animations across cards create a weightless aesthetic.
- **Curated World Destinations:** Handcrafted destination guides featuring high-resolution photography, climate details, GPS coordinates, budget ratings, and top highlights.
- **WebGL2 Interactive Particle Background:** Powered by the open-source `<Particles />` component from React Bits with parallax hover reaction and click light bursts.

### 2. 🔍 Instant Search, Filter & Sort
- **Sticky Glassmorphic Search Bar:** Quick debounced search across destination names, countries, tags, and vibes.
- **Fluid Morphing Filter Pills:** Smooth sliding indicator using Framer Motion `layoutId` transitions.
- **Multi-Category Filtering:** Filter by Continent (Europe, Asia, Americas, Africa, Oceania), Category (Beach, Mountain, Historic, City, Culinary), Budget slider ($50 to $500+/day), and Minimum Rating.
- **Dynamic Sorting:** Sort by Featured, Highest Rated, Budget (Low to High / High to Low), and Alphabetical (A-Z).
- **Automatic Grid Reordering:** Smooth layout animations reposition remaining cards automatically when filters change.

### 3. 📖 Destination Details Modal
- **Shared Layout Expansion:** Smoothly expands from the clicked card into a comprehensive details modal without harsh page reloads.
- **Photo Gallery:** Multi-image preview with instant thumbnail switching.
- **Travel Insights:** Climate information, estimated daily budgets, optimal duration recommendations, and top attractions.
- **Itinerary Action:** Direct addition/removal with celebratory particle burst and flight animation.

### 4. 🧳 "My Trip" Itinerary Management
- **100% Client-Side Local Storage Persistence:** Automatically saves your itinerary locally (`localStorage`) so your custom trip plan persists across browser refreshes.
- **Interactive Drag & Reorder:** Reorder destinations using Framer Motion's `<Reorder.Group>` with spring physics.
- **Swipe-to-Delete:** Drag items to delete with smooth removal transitions.
- **Day & Budget Calculator:** Increment/decrement days per destination with real-time budget calculations.
- **Export & Share:** One-click copy formatted travel summary to your clipboard.
- **Responsive Mobile Bottom Sheet:** Transforms into a touch-friendly bottom sheet on mobile devices with drag-to-dismiss gesture.

### 5. 🎨 Polished States
- **Loading State:** Shimmering floating glass skeleton cards with orbiting compass indicator.
- **Empty State:** Clean illustration with instant one-click filter reset.
- **Error Fallback:** Interactive fallback with retry button.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) — 100% Static Frontend
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Glassmorphism
- **Animations:** Framer Motion, GSAP, Lenis (momentum scroll)
- **Background:** React Bits WebGL2 Particles
- **Icons:** Lucide React
- **Storage:** Browser `localStorage`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📦 Deployment

Since **Trip Wise** is completely client-side and requires no backend, it can be deployed directly to:
- **Vercel** (`vercel deploy`)
- **Netlify**
- **GitHub Pages**
