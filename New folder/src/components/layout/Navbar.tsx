import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/contexts/ProductContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const { searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-br from-soft-purple to-soft-blue/50 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">MaaHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            {user && (
              <Link to="/orders" className="text-sm font-medium transition-colors hover:text-primary">
                My Orders
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                Admin
              </Link>
            )}
          </nav>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 items-center justify-center max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/account" className="text-sm font-medium">
                Hi, {user.name.split(' ')[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                {itemCount}
              </Badge>
            )}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                {itemCount}
              </Badge>
            )}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {user && (
              <Link 
                to="/orders" 
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            <div className="pt-2 border-t">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/account" 
                    className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-sm font-medium p-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" className="absolute right-0 top-0 rounded-l-none">
                Search
              </Button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
