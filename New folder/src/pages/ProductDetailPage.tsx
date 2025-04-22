
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ChevronLeft, Plus, Minus } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <MainLayout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/products')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/50 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain aspect-square"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground capitalize">{product.category}</p>
            </div>
            
            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            
            {!product.inStock ? (
              <div className="inline-flex text-destructive font-medium bg-destructive/10 px-3 py-1 rounded-md">
                Out of Stock
              </div>
            ) : (
              <div className="inline-flex text-green-600 font-medium bg-green-100 px-3 py-1 rounded-md">
                In Stock
              </div>
            )}
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="mr-4">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-none rounded-l-md"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-none rounded-r-md"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full md:w-auto" 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
