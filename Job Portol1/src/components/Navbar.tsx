
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  
  // Mock authentication state - in a real app, this would come from an auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'job_seeker' | 'employer' | null>(null);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const openLoginModal = () => {
    setAuthType('login');
    setIsAuthModalOpen(true);
  };
  
  const openRegisterModal = () => {
    setAuthType('register');
    setIsAuthModalOpen(true);
  };
  
  // Mock login function - in a real app, this would actually authenticate the user
  const handleSuccessfulAuth = (role: 'job_seeker' | 'employer') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setIsAuthModalOpen(false);
  };
  
  // Mock logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-brand-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobMatch</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/jobs" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md font-medium">
              Jobs
            </Link>
            {isAuthenticated && userRole === 'employer' && (
              <Link to="/post-job" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md font-medium">
                Post a Job
              </Link>
            )}
            <Link to="/companies" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md font-medium">
              Companies
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md font-medium">
                  Profile
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={openLoginModal}>
                  Login
                </Button>
                <Button className="bg-brand-600 text-white hover:bg-brand-700" onClick={openRegisterModal}>
                  Register
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-600 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/jobs" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
            {isAuthenticated && userRole === 'employer' && (
              <Link 
                to="/post-job" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Post a Job
              </Link>
            )}
            <Link 
              to="/companies" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Companies
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-100"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="px-3 py-3 flex flex-col space-y-2">
                <Button variant="outline" onClick={() => {
                  openLoginModal();
                  setIsMenuOpen(false);
                }}>
                  Login
                </Button>
                <Button className="bg-brand-600 text-white hover:bg-brand-700" onClick={() => {
                  openRegisterModal();
                  setIsMenuOpen(false);
                }}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        type={authType} 
        onSuccess={handleSuccessfulAuth}
      />
    </nav>
  );
};

export default Navbar;
