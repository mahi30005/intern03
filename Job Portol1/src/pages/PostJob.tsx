
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { JobCategory, JobType } from '../types';
import { toast } from "@/components/ui/use-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  
  // Mock job post function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert requirements and responsibilities to arrays
    const reqArray = requirements.split('\n').filter(item => item.trim() !== '');
    const respArray = responsibilities.split('\n').filter(item => item.trim() !== '');
    
    // In a real app, this would be an API call
    setTimeout(() => {
      console.log('Job posted:', {
        title,
        company,
        location,
        description,
        salary,
        type: jobType,
        category,
        requirements: reqArray,
        responsibilities: respArray,
      });
      
      toast({
        title: "Job Posted Successfully",
        description: "Your job has been posted and is now live.",
      });
      
      setIsSubmitting(false);
      navigate('/jobs');
    }, 1500);
  };
  
  // Options for select inputs
  const jobTypeOptions = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];
  
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-brand-700 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Post a New Job</h1>
            <p className="text-xl opacity-90">
              Reach thousands of qualified candidates and find the perfect match for your position.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Job Title *
                </label>
                <Input
                  id="title"
                  placeholder="e.g. Frontend Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location *
                  </label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="jobType" className="block text-sm font-medium">
                    Job Type *
                  </label>
                  <Select value={jobType} onValueChange={setJobType} required>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium">
                    Category *
                  </label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="salary" className="block text-sm font-medium">
                  Salary Range (optional)
                </label>
                <Input
                  id="salary"
                  placeholder="e.g. $50,000 - $70,000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Job Description *
                </label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the job"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="requirements" className="block text-sm font-medium">
                  Requirements *
                </label>
                <Textarea
                  id="requirements"
                  placeholder="List each requirement on a new line"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Enter each requirement on a new line.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="responsibilities" className="block text-sm font-medium">
                  Responsibilities *
                </label>
                <Textarea
                  id="responsibilities"
                  placeholder="List each responsibility on a new line"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Enter each responsibility on a new line.
                </p>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Posting...</span>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    </>
                  ) : (
                    'Post Job'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostJob;
