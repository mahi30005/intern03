
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMovieDetails } from '@/services/movieApi';
import { TMDB_IMAGE_BASE_URL } from '@/utils/constants';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const details = await getMovieDetails(id);
        setMovie(details);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  const goBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading movie details...</p>
      </div>
    );
  }
  
  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error || 'Movie not found'}</p>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    );
  }
  
  const backdropUrl = movie.backdrop_path 
    ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`
    : null;
    
  const posterUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
    : '/placeholder.svg';
  
  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="fixed top-20 left-4 z-50 md:left-6 bg-black/50 hover:bg-black/70"
        onClick={goBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      {/* Hero Section with backdrop */}
      {backdropUrl && (
        <div className="relative w-full h-[60vh] md:h-[70vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="hero-gradient" />
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <div className="container mx-auto px-4 relative">
        <div className={`${backdropUrl ? '-mt-40 md:-mt-64' : 'mt-24'} flex flex-col md:flex-row gap-8`}>
          {/* Poster */}
          <div className="w-48 md:w-64 mx-auto md:mx-0 flex-shrink-0">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
          
          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title || movie.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              {movie.release_date && (
                <span className="text-gray-400">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              
              {movie.runtime && (
                <span className="text-gray-400">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              
              <span className="text-green-500 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              
              {movie.adult && (
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-xs rounded">
                  18+
                </span>
              )}
              
              <span className="px-1.5 py-0.5 border border-gray-600 text-xs rounded">
                HD
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="bg-white hover:bg-white/90 text-black">
                <Play className="mr-2 h-5 w-5" /> Play
              </Button>
              
              <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600">
                <Plus className="mr-2 h-5 w-5" /> My List
              </Button>
              
              <Button variant="outline" className="border-gray-600">
                <ThumbsUp className="mr-2 h-5 w-5" /> Rate
              </Button>
            </div>
            
            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Overview</h3>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
            
            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Genres</h3>
                  <p className="text-gray-300">
                    {movie.genres.map((genre: any) => genre.name).join(', ')}
                  </p>
                </div>
              )}
              
              {/* Cast */}
              {movie.credits && movie.credits.cast && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Cast</h3>
                  <p className="text-gray-300">
                    {movie.credits.cast.slice(0, 5).map((person: any) => person.name).join(', ')}
                    {movie.credits.cast.length > 5 && ', and more'}
                  </p>
                </div>
              )}
              
              {/* Director */}
              {movie.credits && movie.credits.crew && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Director</h3>
                  <p className="text-gray-300">
                    {movie.credits.crew
                      .filter((person: any) => person.job === 'Director')
                      .map((person: any) => person.name)
                      .join(', ') || 'Unknown'}
                  </p>
                </div>
              )}
              
              {/* Production */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Production</h3>
                  <p className="text-gray-300">
                    {movie.production_companies.slice(0, 2).map((company: any) => company.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
