
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchFilters from '@/components/SearchFilters';
import JobCard from '@/components/JobCard';
import Footer from '@/components/Footer';
import { Job } from '../types';
import { getFilteredJobs } from '../data/mockData';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Parse query params
  const getQueryParam = (param: string): string | undefined => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get(param);
    return value ? value : undefined;
  };
  
  // Get initial search filters from URL
  const initialSearch = getQueryParam('search') || '';
  const initialCategory = getQueryParam('category');
  const initialLocation = getQueryParam('location');
  const initialType = getQueryParam('type');
  
  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filteredJobs = getFilteredJobs(
        initialSearch,
        initialCategory,
        initialLocation,
        initialType
      );
      setJobs(filteredJobs);
      setLoading(false);
    }, 500);
  }, [initialSearch, initialCategory, initialLocation, initialType]);
  
  const handleSearch = (filters: {
    query: string;
    category?: string;
    location?: string;
    type?: string;
  }) => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filteredJobs = getFilteredJobs(
        filters.query,
        filters.category,
        filters.location,
        filters.type
      );
      setJobs(filteredJobs);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-brand-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Find Your Perfect Job</h1>
            <p className="text-xl opacity-90">
              Browse through available positions and discover opportunities that match your skills.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <SearchFilters onSearch={handleSearch} />
          
          <div className="mt-8">
            {loading ? (
              <div className="py-20 text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brand-600 border-r-transparent"></div>
                <p className="mt-4 text-lg text-muted-foreground">Loading jobs...</p>
              </div>
            ) : jobs.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  <div className="text-muted-foreground">
                    Sorted by: <span className="font-medium text-foreground">Newest</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
