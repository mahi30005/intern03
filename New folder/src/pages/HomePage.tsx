
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductContext';
import ProductGrid from '@/components/product/ProductGrid';
import MainLayout from '@/components/layout/MainLayout';

const HomePage = () => {
  const { featuredProducts, loading } = useProducts();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to ShopHub
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover amazing products at unbeatable prices. Shop now and enjoy fast shipping on all orders.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/products">
                <Button size="lg" className="rounded-full">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg" className="rounded-full">
                  Browse Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Check out our latest featured products
              </p>
            </div>
            <Link to="/products">
              <Button variant="ghost">View All Products</Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-8 text-center">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/products?category=electronics" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-4xl">🎧</div>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary">Electronics</Button>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=clothing" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-4xl">👕</div>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary">Clothing</Button>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=books" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-4xl">📚</div>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary">Books</Button>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=home" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-4xl">🏠</div>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary">Home & Kitchen</Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Shop?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                Create an account today and get 10% off your first order!
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
