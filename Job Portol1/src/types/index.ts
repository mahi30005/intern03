
export type UserRole = 'job_seeker' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  title?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: Date;
}

export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote';

export type JobCategory = 
  | 'technology' 
  | 'healthcare' 
  | 'education' 
  | 'finance' 
  | 'marketing' 
  | 'sales' 
  | 'design' 
  | 'engineering'
  | 'customer_service'
  | 'other';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  type: JobType;
  category: JobCategory;
  logo?: string;
  applyUrl?: string;
  createdAt: Date;
  expiresAt: Date;
  featured: boolean;
  employerId: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'rejected' | 'accepted';
  createdAt: Date;
}
