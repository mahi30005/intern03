
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie, getFeaturedMovie } from '@/services/movieApi';
import { TMDB_IMAGE_BASE_URL } from '@/utils/constants';

const Hero = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFeaturedMovie = async () => {
      try {
        const featured = await getFeaturedMovie();
        setMovie(featured);
      } catch (error) {
        console.error('Error loading featured movie:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedMovie();
  }, []);
  
  if (loading) {
    return (
      <div className="w-full h-[80vh] bg-netflix-darkgray animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Loading featured content...</p>
      </div>
    );
  }
  
  if (!movie) {
    return null;
  }
  
  const backdropUrl = `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`;
  
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Backdrop Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="hero-gradient" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>
            
            <div className="flex items-center mb-4 text-sm">
              <span className="text-green-500 font-semibold mr-2">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="text-gray-400 mr-2">
                {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4) || 'New'}
              </span>
              <span className="px-1 text-xs border border-gray-600 rounded mr-2">HD</span>
            </div>
            
            <p className="text-gray-300 text-lg mb-6 line-clamp-3">
              {movie.overview}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white hover:bg-white/90 text-black">
                <Play className="mr-2 h-5 w-5" /> Play
              </Button>
              
              <Link to={`/movie/${movie.id}`}>
                <Button variant="secondary" className="bg-gray-600/80 hover:bg-gray-700/80 text-white">
                  <Info className="mr-2 h-5 w-5" /> More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
