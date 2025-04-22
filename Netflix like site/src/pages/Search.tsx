
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchResults from '@/components/search/SearchResults';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const query = searchParams.get('q') || '';
  
  useEffect(() => {
    document.title = query 
      ? `Search Results for "${query}" - BingeByte Theater` 
      : 'Search - BingeByte Theater';
    
    setSearchQuery(query);
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        <form onSubmit={handleSearch} className="mb-8 flex gap-2 max-w-2xl">
          <Input
            type="text"
            placeholder="Search for movies, TV shows, actors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-netflix-gray border-netflix-gray text-white"
          />
          <Button type="submit" className="flex-shrink-0">
            <SearchIcon className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
        
        {query && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Search Results for "{query}"
            </h2>
          </div>
        )}
        
        <SearchResults query={query} />
      </div>
    </div>
  );
};

export default Search;
