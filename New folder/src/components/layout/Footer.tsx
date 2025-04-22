
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-br from-soft-purple to-soft-blue">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary">
              MaaHub
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Your one-stop shop for all your needs, with a wide selection of quality products.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/products" className="hover:text-primary transition">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="hover:text-primary transition">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-primary transition">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=books" className="hover:text-primary transition">Books</Link>
              </li>
              <li>
                <Link to="/products?category=home" className="hover:text-primary transition">Home & Kitchen</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="hover:text-primary transition">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition">Register</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary transition">Orders</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-primary transition">My Account</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">Contact</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MaaHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              This is a demo e-commerce website.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
