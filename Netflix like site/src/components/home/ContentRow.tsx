
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie, getMoviesByCategory } from '@/services/movieApi';
import MovieCard from './MovieCard';

interface ContentRowProps {
  title: string;
  categoryId: string;
}

const ContentRow = ({ title, categoryId }: ContentRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByCategory(categoryId);
        setMovies(data);
      } catch (err) {
        setError('Failed to load movies');
        console.error(`Error loading ${categoryId} movies:`, err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [categoryId]);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
    
    rowRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setScrollPosition(scrollLeft + scrollAmount);
  };
  
  if (loading) {
    return (
      <div className="content-row">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-40 h-60 bg-netflix-darkgray rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error || movies.length === 0) {
    return (
      <div className="content-row">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-400">
          {error || 'No movies available in this category.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="content-row relative group">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {/* Scroll Buttons */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => scroll('left')}
          className="bg-netflix-black/80 hover:bg-netflix-black rounded-full h-10 w-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => scroll('right')}
          className="bg-netflix-black/80 hover:bg-netflix-black rounded-full h-10 w-10"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Movies Row */}
      <div 
        ref={rowRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
