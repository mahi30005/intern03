
import { TMDB_API_KEY, TMDB_BASE_URL } from "../utils/constants";

// Types for movie data
export interface Movie {
  id: number;
  title: string;
  name?: string; // For TV shows
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string; // For TV shows
  media_type?: string;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const fetchFromTMDB = async (endpoint: string): Promise<any> => {
  const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${TMDB_API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
};

export const getMoviesByCategory = async (category: string): Promise<Movie[]> => {
  try {
    let endpoint = '';
    
    switch (category) {
      case 'trending':
        endpoint = '/trending/all/week';
        break;
      case 'topRated':
        endpoint = '/movie/top_rated';
        break;
      case 'action':
        endpoint = '/discover/movie?with_genres=28';
        break;
      case 'comedy':
        endpoint = '/discover/movie?with_genres=35';
        break;
      case 'horror':
        endpoint = '/discover/movie?with_genres=27';
        break;
      case 'romance':
        endpoint = '/discover/movie?with_genres=10749';
        break;
      case 'documentary':
        endpoint = '/discover/movie?with_genres=99';
        break;
      default:
        endpoint = '/trending/all/week';
    }
    
    const data = await fetchFromTMDB(endpoint) as MovieResponse;
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
};

export const getMovieDetails = async (id: string, mediaType = 'movie'): Promise<any> => {
  try {
    const data = await fetchFromTMDB(`/${mediaType}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching details for ${mediaType} ${id}:`, error);
    throw error;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  
  try {
    const data = await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}`) as MovieResponse;
    return data.results.filter(item => 
      (item.media_type === 'movie' || item.media_type === 'tv') && 
      (item.poster_path || item.backdrop_path)
    );
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getFeaturedMovie = async (): Promise<Movie | null> => {
  try {
    const trending = await fetchFromTMDB('/trending/all/day') as MovieResponse;
    // Pick a random movie from the top 5 trending
    const randomIndex = Math.floor(Math.random() * Math.min(5, trending.results.length));
    return trending.results[randomIndex] || null;
  } catch (error) {
    console.error('Error fetching featured movie:', error);
    return null;
  }
};
