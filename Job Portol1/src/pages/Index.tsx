
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import JobCard from '@/components/JobCard';
import Footer from '@/components/Footer';
import { Job } from '../types';
import { mockJobs } from '../data/mockData';
import { Briefcase, Search, User } from 'lucide-react';

const Index = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    // Get featured jobs from mock data (in a real app, would be an API call)
    const featured = mockJobs.filter(job => job.featured).slice(0, 3);
    setFeaturedJobs(featured);
  }, []);
  
  const categories = [
    { name: 'Technology', icon: <Briefcase className="h-10 w-10" />, count: 120 },
    { name: 'Marketing', icon: <Search className="h-10 w-10" />, count: 85 },
    { name: 'Design', icon: <Briefcase className="h-10 w-10" />, count: 65 },
    { name: 'Sales', icon: <User className="h-10 w-10" />, count: 92 },
    { name: 'Finance', icon: <Briefcase className="h-10 w-10" />, count: 78 },
    { name: 'Engineering', icon: <Briefcase className="h-10 w-10" />, count: 110 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Jobs</h2>
              <p className="text-muted-foreground mt-2">Handpicked job opportunities for you</p>
            </div>
            <Link to="/jobs">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Jobs
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Job Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Explore Job Categories</h2>
            <p className="text-muted-foreground mt-2">Find jobs in your area of expertise</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/jobs?category=${category.name.toLowerCase()}`}
                className="flex flex-col items-center p-6 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-brand-50 text-brand-600 rounded-full mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-muted-foreground mt-2">
                  {category.count} open positions
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">How JobMatch Works</h2>
            <p className="text-muted-foreground mt-2">Simple steps to find your dream job or perfect candidate</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-muted-foreground">
                Register as a job seeker to find opportunities or as an employer to post job openings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {`${window.innerWidth < 768 ? 'Browse or Post Jobs' : 'Browse or Post'}`}
              </h3>
              <p className="text-muted-foreground">
                Search for jobs that match your skills or post job openings to find the perfect candidates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply or Hire</h3>
              <p className="text-muted-foreground">
                Apply for jobs with just a few clicks or review applications and hire top talent.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take the Next Step in Your Career?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through JobMatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/jobs">Find Jobs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-brand-700">
              <Link to="/post-job">Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
