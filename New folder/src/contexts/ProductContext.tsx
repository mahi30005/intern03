
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category } from '@/types';
import { products as mockProducts } from '@/data/mockData';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  filteredProducts: Product[];
  filterByCategory: (category: Category) => void;
  searchProducts: (query: string) => void;
  getProductById: (id: string) => Product | undefined;
  featuredProducts: Product[];
  currentCategory: Category;
  currentSearchQuery: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  
  // Load products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, we would fetch from an API
        // For demo, we'll use mock data with a small delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const applyFilters = (category: Category, searchQuery: string) => {
    let filtered = [...products];
    
    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  };

  const filterByCategory = (category: Category) => {
    setCurrentCategory(category);
    applyFilters(category, currentSearchQuery);
  };

  const searchProducts = (query: string) => {
    setCurrentSearchQuery(query);
    applyFilters(currentCategory, query);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Get featured products
  const featuredProducts = products.filter(product => product.featured);

  return (
    <ProductContext.Provider value={{ 
      products,
      loading,
      error,
      filteredProducts,
      filterByCategory,
      searchProducts,
      getProductById,
      featuredProducts,
      currentCategory,
      currentSearchQuery
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
