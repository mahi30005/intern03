
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/utils/quizData';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-quiz-dark shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-quiz-primary to-quiz-highlight flex items-center justify-center text-white font-bold">Q</div>
          <span className="text-xl font-bold bg-gradient-to-r from-quiz-primary to-quiz-highlight bg-clip-text text-transparent">QuizMaster</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition">Home</Link>
          <Link to="/quizzes" className="text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition">Quizzes</Link>
          <Link to="/leaderboard" className="text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition">Leaderboard</Link>
          
          {user && user.isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition">Dashboard</Link>
              <Button variant="ghost" onClick={onLogout}>Logout</Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-quiz-secondary flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 hover:text-quiz-primary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-3 bg-white dark:bg-quiz-dark shadow-md">
          <Link 
            to="/" 
            className="block text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/quizzes" 
            className="block text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Quizzes
          </Link>
          <Link 
            to="/leaderboard" 
            className="block text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Leaderboard
          </Link>
          
          {user && user.isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="block text-gray-700 dark:text-gray-200 hover:text-quiz-primary dark:hover:text-quiz-primary transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Button variant="ghost" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
                Logout
              </Button>
              <div className="flex items-center space-x-2 py-2">
                <div className="w-8 h-8 rounded-full bg-quiz-secondary flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link to="/auth?tab=register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
