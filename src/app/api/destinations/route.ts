import { NextResponse } from 'next/server';
import { INITIAL_DESTINATIONS } from '@/data/destinations';
import { Continent, Category, Destination } from '@/types/trip';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').trim().toLowerCase();
    const continent = searchParams.get('continent') as Continent || 'All';
    const category = searchParams.get('category') as Category || 'All';
    const maxBudget = Number(searchParams.get('maxBudget')) || 1000;
    const minRating = Number(searchParams.get('minRating')) || 0;
    const sortBy = searchParams.get('sortBy') || 'featured';

    let results: Destination[] = [...INITIAL_DESTINATIONS];

    // Optional query to Geoapify or OpenTripMap if external API key is provided
    const apiKey = process.env.GEOAPIFY_API_KEY || process.env.OPENTRIPMAP_API_KEY;
    if (apiKey && query && query.length > 2) {
      try {
        // Fetch external places if API key is provided
        const externalRes = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${apiKey}&limit=3`,
          { next: { revalidate: 3600 } }
        );
        if (externalRes.ok) {
          const extData = await externalRes.json();
          if (extData.features && extData.features.length > 0) {
            // merge or enhance if matches
            console.log('Fetched live geocoding data:', extData.features.length);
          }
        }
      } catch (err) {
        console.warn('External geocoding fetch fallback:', err);
      }
    }

    // Filter by Search Query
    if (query) {
      results = results.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.country.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          dest.highlights.some((h) => h.toLowerCase().includes(query))
      );
    }

    // Filter by Continent
    if (continent && continent !== 'All') {
      results = results.filter((dest) => dest.continent === continent);
    }

    // Filter by Category
    if (category && category !== 'All') {
      results = results.filter((dest) => dest.category === category);
    }

    // Filter by Budget
    if (maxBudget < 500) {
      results = results.filter((dest) => dest.dailyBudget <= maxBudget);
    }

    // Filter by Rating
    if (minRating > 0) {
      results = results.filter((dest) => dest.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case 'rating-desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'budget-asc':
        results.sort((a, b) => a.dailyBudget - b.dailyBudget);
        break;
      case 'budget-desc':
        results.sort((a, b) => b.dailyBudget - a.dailyBudget);
        break;
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destinations', message: (error as Error).message },
      { status: 500 }
    );
  }
}
