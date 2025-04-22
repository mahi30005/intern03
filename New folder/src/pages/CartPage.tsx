
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { items, itemCount, clearCart } = useCart();

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {itemCount === 0 ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="mt-2">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg border shadow-sm">
                <div className="p-6 space-y-6">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                
                <div className="p-6 border-t flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  
                  <Link to="/products">
                    <Button variant="ghost">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
