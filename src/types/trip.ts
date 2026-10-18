export type Continent = 'All' | 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania';

export type Category = 
  | 'All' 
  | 'Beach & Island' 
  | 'Mountain & Nature' 
  | 'Historic & Heritage' 
  | 'Futuristic City' 
  | 'Culinary & Art';

export type BudgetTier = '$' | '$$' | '$$$' | '$$$$';

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: Continent;
  category: Category;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  secondaryImages?: string[];
  description: string;
  fullOverview: string;
  dailyBudget: number; // in USD
  budgetTier: BudgetTier;
  bestSeason: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  recommendedStayDays: number;
  tags: string[];
  climate: {
    temp: string;
    weather: string;
  };
  featured?: boolean;
}

export interface ItineraryItem {
  id: string;
  destination: Destination;
  addedAt: string;
  plannedDays: number;
  notes?: string;
}

export interface FilterOptions {
  searchQuery: string;
  continent: Continent;
  category: Category;
  maxBudget: number;
  minRating: number;
  sortBy: 'featured' | 'rating-desc' | 'budget-asc' | 'budget-desc' | 'name-asc';
}
