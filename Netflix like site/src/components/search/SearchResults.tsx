
import { useState, useEffect } from 'react';
import { Movie, searchMovies } from '@/services/movieApi';
import MovieCard from '../home/MovieCard';

interface SearchResultsProps {
  query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const searchResults = await searchMovies(query);
        setResults(searchResults);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to load search results');
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-full aspect-[2/3] bg-netflix-darkgray rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <p className="text-gray-400">
          {query ? `No results found for "${query}"` : 'Enter a search term to find movies and TV shows'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="w-full">
            <MovieCard movie={movie} size="large" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
