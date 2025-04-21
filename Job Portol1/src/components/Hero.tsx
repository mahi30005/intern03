
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Discover Your Next Career Opportunity
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect with top employers and find the perfect job match for your skills and experience.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search job title or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-black h-12 rounded-md w-full"
              />
            </div>
            <Button type="submit" size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              Search Jobs
            </Button>
          </form>
          
          <div className="mt-8">
            <p className="text-sm mb-3">Popular Searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Software Engineer', 'Data Scientist', 'Product Manager', 'UI/UX Designer', 'Marketing'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    navigate(`/jobs?search=${encodeURIComponent(term)}`);
                  }}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
