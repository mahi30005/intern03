
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Briefcase } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  // Helper to format the date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Helper to capitalize and format job type
  const formatJobType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  return (
    <div className={`job-card ${job.featured ? 'border-l-4 border-l-brand-600' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:mr-4 mb-4 md:mb-0 flex-shrink-0">
          <img 
            src={job.logo || "/placeholder.svg"} 
            alt={`${job.company} logo`} 
            className="w-16 h-16 rounded-md object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                <Link to={`/jobs/${job.id}`} className="hover:text-brand-600 transition-colors">
                  {job.title}
                </Link>
              </h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
            
            <div className="flex flex-wrap mt-2 md:mt-0 gap-2">
              <Badge variant={job.featured ? "default" : "outline"} className={job.featured ? "bg-brand-600" : ""}>
                {formatJobType(job.type)}
              </Badge>
              <Badge variant="outline">{job.category.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</Badge>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row md:items-center text-sm text-muted-foreground">
            <div className="flex items-center mr-4 mb-2 md:mb-0">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Posted {formatDate(job.createdAt)}</span>
            </div>
            {job.salary && (
              <div className="md:ml-4 mt-2 md:mt-0">
                <span className="font-medium text-foreground">{job.salary}</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link to={`/jobs/${job.id}`}>View Details</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/jobs/${job.id}/apply`}>Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
