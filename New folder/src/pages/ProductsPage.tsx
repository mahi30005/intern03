
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilter from '@/components/product/CategoryFilter';
import { useProducts } from '@/contexts/ProductContext';
import { Category } from '@/types';

const ProductsPage = () => {
  const { 
    filteredProducts, 
    loading, 
    error, 
    filterByCategory, 
    searchProducts,
    currentCategory,
    currentSearchQuery 
  } = useProducts();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category') as Category | null;
    const query = searchParams.get('q');
    
    if (category) {
      filterByCategory(category);
    }
    
    if (query) {
      setSearchQuery(query);
      searchProducts(query);
    }
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (currentCategory !== 'all') {
      params.set('category', currentCategory);
    }
    
    if (currentSearchQuery) {
      params.set('q', currentSearchQuery);
    }
    
    setSearchParams(params);
  }, [currentCategory, currentSearchQuery, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };

  if (error) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="text-center">
            <h2 className="text-xl font-bold text-destructive">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              Browse our collection of products
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full md:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-0 top-0 rounded-l-none">
                Search
              </Button>
            </div>
          </form>
        </div>
        
        <CategoryFilter className="mb-8" />
        
        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
