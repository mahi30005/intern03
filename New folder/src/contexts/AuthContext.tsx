
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { users } from '@/data/mockData';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, we would call an API here
      // For now, we'll simulate with a delay and mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Very simple password check for demo
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast.success('Logged in successfully');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, we would call an API here
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (users.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app this would be saved to a database)
      const newUser: User = {
        id: `${users.length + 1}`,
        email,
        name,
        isAdmin: false
      };
      
      users.push(newUser); // Add to our mock data
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAdmin: user?.isAdmin || false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
