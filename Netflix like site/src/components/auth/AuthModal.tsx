
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type AuthType = 'login' | 'signup';

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthType>('login');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check for auth parameter in URL
    const params = new URLSearchParams(location.search);
    const auth = params.get('auth');
    
    if (auth === 'login' || auth === 'signup') {
      setAuthType(auth);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location]);
  
  const handleClose = () => {
    setOpen(false);
    // Remove the auth parameter from URL
    navigate(location.pathname, { replace: true });
  };
  
  const toggleAuthType = () => {
    const newType = authType === 'login' ? 'signup' : 'login';
    setAuthType(newType);
    navigate(`${location.pathname}?auth=${newType}`, { replace: true });
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-netflix-darkgray border-netflix-gray">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {authType === 'login' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {authType === 'login' 
              ? 'Welcome back to BingeByte Theater' 
              : 'Create your BingeByte Theater account'}
          </DialogDescription>
        </DialogHeader>
        
        {authType === 'login' ? (
          <LoginForm onSuccess={handleClose} />
        ) : (
          <SignupForm onSuccess={handleClose} />
        )}
        
        <div className="mt-4 text-center text-gray-400 text-sm">
          {authType === 'login' ? (
            <p>
              New to BingeByte Theater?{' '}
              <button 
                className="text-white underline" 
                onClick={toggleAuthType}
              >
                Sign up now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                className="text-white underline" 
                onClick={toggleAuthType}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
