
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';
import { JobCategory, JobType } from '../types';

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string;
    category?: string;
    location?: string;
    type?: string;
  }) => void;
}

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Common locations
  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Chicago, IL',
    'Boston, MA',
    'Austin, TX',
    'Remote'
  ];
  
  // Convert enum types to options
  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'other', label: 'Other' }
  ];
  
  const jobTypeOptions = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      category: category || undefined,
      location: location || undefined,
      type: jobType || undefined
    });
  };
  
  const resetFilters = () => {
    setQuery('');
    setCategory('');
    setLocation('');
    setJobType('');
    onSearch({ query: '' });
  };
  
  // Run search when component mounts to show initial results
  useEffect(() => {
    onSearch({ query: '' });
  }, [onSearch]);

  return (
    <div className="bg-white rounded-lg shadow border border-border p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search job title or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="md:w-auto"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </Button>
          
          <Button 
            type="submit" 
            className="bg-brand-600 hover:bg-brand-700"
          >
            Search Jobs
          </Button>
        </div>
        
        {isFilterExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Job Type
              </label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {jobTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {isFilterExpanded && (
          <div className="mt-4 flex justify-end">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilters;
