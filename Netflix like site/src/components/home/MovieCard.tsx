
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/services/movieApi';
import { TMDB_IMAGE_BASE_URL } from '@/utils/constants';
import { Play, Plus, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
}

const MovieCard = ({ movie, size = 'large' }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getImageSize = () => {
    switch (size) {
      case 'small':
        return 'w-56 md:w-64';
      case 'medium':
        return 'w-72 md:w-80';
      case 'large':
        return 'w-80 md:w-96'; // Significantly increased size
      case 'extra-large':
      default:
        return 'w-96 md:w-[500px]'; // Even larger option
    }
  };
  
  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
    : '/placeholder.svg';
  
  const mediaType = movie.media_type || 'movie';
  const title = movie.title || movie.name || 'Untitled';
  const year = (movie.release_date || movie.first_air_date || '').substring(0, 4);
  
  return (
    <div 
      className={`movie-card ${getImageSize()} group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10 shadow-xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/${mediaType}/${movie.id}`}>
        <img 
          src={posterUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="font-bold text-white text-lg line-clamp-1 mb-2">{title}</h3>
          
          {isHovered && (
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-2">
                <Button size="icon" className="h-9 w-9 rounded-full bg-white hover:bg-white/90">
                  <Play className="h-4 w-4 text-black" />
                </Button>
                <Button size="icon" className="h-9 w-9 rounded-full bg-netflix-gray/80 hover:bg-netflix-gray">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-9 w-9 rounded-full bg-netflix-gray/80 hover:bg-netflix-gray">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center text-sm space-x-2">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                {year && <span className="text-gray-400">{year}</span>}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
