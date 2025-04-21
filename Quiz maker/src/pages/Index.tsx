
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleQuizzes, getCurrentUser } from '@/utils/quizData';
import { User } from '@/utils/types';

const Index = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isAuthenticated: false,
    });
  };

  const featuredQuizzes = sampleQuizzes.slice(0, 3);
  
  const filteredQuizzes = sampleQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-quiz-primary/90 to-quiz-highlight/90 text-white py-16 md:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Learn, Create, and Challenge Yourself
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Create interactive quizzes or test your knowledge with quizzes made by others.
                Track your progress and compete on the leaderboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/quizzes">
                  <Button size="lg" variant="default" className="bg-white text-quiz-primary hover:bg-gray-100 w-full sm:w-auto">
                    Start a Quiz
                  </Button>
                </Link>
                <Link to={user?.isAuthenticated ? "/create" : "/auth"}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    {user?.isAuthenticated ? "Create a Quiz" : "Sign Up Free"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Quizzes */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredQuizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/quizzes">
                <Button variant="outline">View All Quizzes</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Find Quizzes */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Find a Quiz</h2>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10"
                />
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              {searchTerm && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Search Results</h3>
                  {filteredQuizzes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredQuizzes.map(quiz => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-muted rounded-lg">
                      <p className="text-muted-foreground">No quizzes found matching your search.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-12 text-center">Why Use QuizMaster?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-quiz-dark p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-quiz-light dark:bg-quiz-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-quiz-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn Anything</h3>
                <p className="text-muted-foreground">
                  Explore quizzes across various topics or create your own to share knowledge.
                </p>
              </div>
              
              <div className="bg-white dark:bg-quiz-dark p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-quiz-light dark:bg-quiz-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-quiz-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Compete & Compare</h3>
                <p className="text-muted-foreground">
                  See how you stack up against others on our global leaderboards.
                </p>
              </div>
              
              <div className="bg-white dark:bg-quiz-dark p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-quiz-light dark:bg-quiz-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-quiz-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your performance and see your improvement over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-r from-quiz-primary to-quiz-highlight text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Join thousands of users who are already learning and creating quizzes on QuizMaster.
            </p>
            <Link to={user?.isAuthenticated ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-white text-quiz-primary hover:bg-gray-100">
                {user?.isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-quiz-dark text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-quiz-primary to-quiz-highlight flex items-center justify-center text-white font-bold">Q</div>
                <span className="text-xl font-bold">QuizMaster</span>
              </div>
              <p className="text-sm text-gray-400">
                The ultimate platform for creating and taking quizzes to test and expand your knowledge.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/quizzes" className="hover:text-white transition">Quizzes</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white transition">Leaderboard</Link></li>
                <li><Link to="/auth" className="hover:text-white transition">Login / Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Science</a></li>
                <li><a href="#" className="hover:text-white transition">History</a></li>
                <li><a href="#" className="hover:text-white transition">Entertainment</a></li>
                <li><a href="#" className="hover:text-white transition">Sports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2025 QuizMaster. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
