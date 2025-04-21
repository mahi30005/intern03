
import { Job, User, Application } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'job_seeker',
    avatar: '/placeholder.svg',
    title: 'Software Engineer',
    bio: 'Experienced software engineer with 5 years of experience in web development.',
    location: 'San Francisco, CA',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@techcorp.com',
    role: 'employer',
    avatar: '/placeholder.svg',
    company: 'TechCorp Inc.',
    bio: 'Leading technology company specializing in innovative solutions.',
    location: 'New York, NY',
    website: 'https://techcorp.example.com',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@jobboard.com',
    role: 'admin',
    createdAt: new Date('2023-01-01')
  }
];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user interfaces.',
    requirements: [
      'Strong knowledge of React and TypeScript',
      '3+ years of experience in frontend development',
      'Understanding of modern CSS and responsive design',
      'Experience with state management libraries (Redux, Context API)'
    ],
    responsibilities: [
      'Develop user interface components using React',
      'Collaborate with designers to implement UI/UX designs',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and team discussions'
    ],
    salary: '$90,000 - $120,000',
    type: 'full_time',
    category: 'technology',
    logo: '/placeholder.svg',
    createdAt: new Date('2023-04-10'),
    expiresAt: new Date('2023-05-10'),
    featured: true,
    employerId: '2'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataSystems LLC',
    location: 'Remote',
    description: 'DataSystems is seeking a Backend Engineer to develop and maintain our server-side applications.',
    requirements: [
      'Strong experience with Node.js and Express',
      'Knowledge of SQL and NoSQL databases',
      'Understanding of RESTful API design',
      'Experience with cloud services (AWS, GCP)'
    ],
    responsibilities: [
      'Design and implement server-side applications',
      'Optimize application performance and scalability',
      'Develop database schemas and models',
      'Collaborate with frontend developers for API integration'
    ],
    salary: '$100,000 - $130,000',
    type: 'remote',
    category: 'technology',
    logo: '/placeholder.svg',
    createdAt: new Date('2023-04-05'),
    expiresAt: new Date('2023-05-05'),
    featured: false,
    employerId: '2'
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'CreativeHub',
    location: 'New York, NY',
    description: 'CreativeHub is looking for a talented Product Designer to create intuitive and engaging user experiences.',
    requirements: [
      'Strong portfolio demonstrating UX/UI design skills',
      'Proficiency in design tools (Figma, Sketch)',
      'Experience with design systems',
      'Understanding of user research and testing'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with developers to implement designs',
      'Conduct user research and usability testing',
      'Contribute to the company\'s design system'
    ],
    salary: '$85,000 - $110,000',
    type: 'full_time',
    category: 'design',
    logo: '/placeholder.svg',
    createdAt: new Date('2023-04-08'),
    expiresAt: new Date('2023-05-08'),
    featured: true,
    employerId: '2'
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'GrowthBoost',
    location: 'Chicago, IL',
    description: 'GrowthBoost is seeking a Marketing Specialist to develop and implement marketing strategies.',
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      'Experience with digital marketing channels',
      'Knowledge of SEO and SEM',
      'Excellent communication and analytical skills'
    ],
    responsibilities: [
      'Develop and execute marketing campaigns',
      'Analyze campaign performance and optimize strategies',
      'Create engaging content for various channels',
      'Collaborate with sales and product teams'
    ],
    salary: '$70,000 - $90,000',
    type: 'full_time',
    category: 'marketing',
    logo: '/placeholder.svg',
    createdAt: new Date('2023-04-12'),
    expiresAt: new Date('2023-05-12'),
    featured: false,
    employerId: '2'
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    description: 'AnalyticsPro is looking for a Data Scientist to analyze complex data and derive actionable insights.',
    requirements: [
      'Advanced degree in Statistics, Computer Science, or related field',
      'Strong experience with Python and data analysis libraries',
      'Knowledge of machine learning algorithms',
      'Experience with big data technologies'
    ],
    responsibilities: [
      'Analyze large datasets to identify patterns and trends',
      'Develop machine learning models for prediction and classification',
      'Create data visualizations and reports',
      'Collaborate with engineering and product teams'
    ],
    salary: '$110,000 - $140,000',
    type: 'full_time',
    category: 'technology',
    logo: '/placeholder.svg',
    createdAt: new Date('2023-04-15'),
    expiresAt: new Date('2023-05-15'),
    featured: true,
    employerId: '2'
  },
  {
    id: '6',
    title: 'Financial Analyst',
    company: 'CapitalGrowth',
    location: 'New York, NY',
    description: 'CapitalGrowth is seeking a Financial Analyst to assist with financial planning and analysis.',
    requirements: [
      'Bachelor\'s degree in Finance, Economics, or related field',
      'Strong analytical and financial modeling skills',
      'Proficiency in Excel and financial software',
      'Knowledge of accounting principles'
    ],
    responsibilities: [
      'Develop financial models and forecasts',
      'Analyze financial performance and identify trends',
      'Prepare reports and presentations for management',
      'Support budgeting and planning processes'
    ],
    salary: '$80,000 - $100,000',
    type: 'full_time',
    category: 'finance',
    logo: '/placeholder.svg',
    createdAt: new Date('2023-04-18'),
    expiresAt: new Date('2023-05-18'),
    featured: false,
    employerId: '2'
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    userId: '1',
    resume: 'resume-url',
    coverLetter: 'I am excited to apply for this position...',
    status: 'pending',
    createdAt: new Date('2023-04-20')
  },
  {
    id: '2',
    jobId: '3',
    userId: '1',
    resume: 'resume-url',
    coverLetter: 'With my experience in design...',
    status: 'reviewing',
    createdAt: new Date('2023-04-22')
  }
];

// Helper functions to work with mock data
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getApplicationsByUserId = (userId: string): Application[] => {
  return mockApplications.filter(app => app.userId === userId);
};

export const getApplicationsByJobId = (jobId: string): Application[] => {
  return mockApplications.filter(app => app.jobId === jobId);
};

export const getFilteredJobs = (
  search: string = '', 
  category?: string, 
  location?: string, 
  type?: string
): Job[] => {
  return mockJobs.filter(job => {
    const matchesSearch = 
      search === '' || 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesCategory = !category || job.category === category;
    const matchesLocation = !location || job.location.includes(location);
    const matchesType = !type || job.type === type;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });
};
