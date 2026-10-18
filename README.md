# 🌌 Trip Wise — Smart Zero-Gravity Travel Planner

**Trip Wise** is a smart travel planner web application built with **React / Next.js**, **Tailwind CSS**, and **Framer Motion**, rendered in a zero-gravity **"antigravity" aesthetic**.

It features floating cosmic UI elements, smooth physics-based 3D hover effects, glassmorphic card layouts, and an interactive itinerary manager that persists directly in your browser.

---

## 🚀 Key Features

### 1. 🪐 Destination Exploration & Antigravity Physics
- **Gentle Zero-G Floating:** Every destination card floats gently up and down with organic staggered intervals (`y: [0, -10, 0]`), creating an atmospheric zero-gravity feeling.
- **3D Physics-Based Tilt on Hover:** Cards use Framer Motion springs (`useMotionValue`, `useSpring`, `useTransform`) to react to cursor movements with realistic dynamic specular glare.
- **Rich Destination Data:** Curated collection of world destinations with coordinates, high-resolution imagery, best seasons, climate indicators, budget tiers, and top highlights.
- **External API Compatibility:** Integrates with Next.js API route (`/api/destinations`), supporting live OpenTripMap or Geoapify providers with fallback.

### 2. 🔍 Search, Filter, and Sort
- **Sticky Glassmorphic Search Bar:** Glides gracefully over the viewport with backdrop-blur and cosmic glow.
- **Instant Search:** Search across destination titles, countries, vibes, and keywords with debounced live querying.
- **Multi-dimensional Filters:**
  - **Category Pills:** Beach & Island, Mountain & Nature, Historic & Heritage, Futuristic City, Culinary & Art.
  - **Continents:** Europe, Asia, Americas, Africa, Oceania.
  - **Max Daily Budget Slider:** Custom range from $50 (Backpacker) to $500+ (Luxury).
  - **Minimum Rating:** Filter by 4.5★+, 4.8★+, or 4.9★+.
- **Dynamic Sorting Options:**
  - ⭐ Top Featured
  - 🌟 Highest Rated (Desc)
  - 💸 Budget: Low to High
  - 💎 Budget: High to Low
  - 🔤 Alphabetical (A-Z)
- **Active Filter Badges & Quick Reset:** Clear all filters with a single click.

### 3. ✨ Destination Details Modal
- **Physics Expansion:** Clicking any card smoothly launches a glassmorphic details modal with spring physics.
- **Interactive Photo Gallery:** Multi-angle photo preview with thumbnail selectors.
- **Complete Travel Insights:** Includes full description overview, weather & temperature indicators, GPS coordinates, must-experience highlights, and recommended stay length.
- **"Add to Itinerary" Action:** Instant feedback with confetti celebration and sync status.

### 4. 🧳 Itinerary Management ("My Trip")
- **Slide-out Drawer:** Easily toggleable drawer with a dynamic badge counter on the navigation bar.
- **Browser Local Storage Persistence:** Automatically saves your itinerary locally (`localStorage`) so your custom trip plan persists after page reloads.
- **Animated List Transitions:** Destination cards animate gracefully on entrance and removal (`AnimatePresence`).
- **Interactive Day Duration Adjuster:** Increment or decrement days per destination with real-time budget calculations.
- **Trip Summary Dashboard:** Live metrics displaying total planned days, estimated cost, and unique countries explored.
- **Export / Share Travel Plan:** One-click copy formatted travel summary to your clipboard.

### 5. 📱 Fully Responsive & Animated UI States
- **Mobile, Tablet, and Desktop Optimized:** Clean responsive grid layouts and touch-friendly controls.
- **Floating Loading Skeletons:** Shimmering glass skeleton cards with staggered antigravity float during data fetching.
- **Empty State:** Animated zero-g compass and prompt with quick filter reset when no results match.
- **Error State:** Cosmic alert state with a one-click retry uplink.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism, glow utilities, and cosmic color palette
- **Motion & Physics:** [Framer Motion](https://www.framer.com/motion/) (3D tilt, spring animations, AnimatePresence)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Celebration FX:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to GitHub & Vercel

### Git Repository Setup:
```bash
git init
git add .
git commit -m "feat: initial commit for Trip Wise smart travel planner"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/trip-wise.git
git push -u origin main
```
*Note: Ensure your GitHub repository visibility is set to **Public** before the deadline.*
