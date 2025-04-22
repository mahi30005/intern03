
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '@/components/movie/MovieDetails';

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    document.title = 'Movie Details - BingeByte Theater';
  }, []);
  
  return (
    <div className="pt-16">
      <MovieDetails />
    </div>
  );
};

export default Movie;
