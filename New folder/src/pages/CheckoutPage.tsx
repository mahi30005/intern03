
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Address } from '@/types';
import { orders } from '@/data/mockData';
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if no items in cart or not logged in
  React.useEffect(() => {
    if (itemCount === 0) {
      navigate('/cart');
    }
    
    if (!user) {
      navigate('/login', { state: { redirect: '/checkout' } });
    }
  }, [itemCount, user, navigate]);

  const handleCheckout = (address: Address) => {
    setIsSubmitting(true);
    
    // Simulate order processing with a delay
    setTimeout(() => {
      // Create new order
      const newOrder = {
        id: `order_${Date.now()}`,
        userId: user?.id || '',
        items: [...items],
        total: subtotal,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        address
      };
      
      // Add to orders in our mock data
      orders.push(newOrder);
      
      // Clear cart and redirect to success page
      clearCart();
      setIsSubmitting(false);
      
      toast.success('Order placed successfully!');
      navigate('/order-success');
    }, 1500);
  };

  if (!user || itemCount === 0) {
    return null; // Redirecting...
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Link to="/cart">
            <Button variant="ghost" className="mr-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
              <CheckoutForm 
                onSubmit={handleCheckout} 
                isSubmitting={isSubmitting} 
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h3 className="font-medium text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex py-2 border-b last:border-0">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-sm font-medium">
                        <h3>{item.product.name}</h3>
                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(subtotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {subtotal > 100 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$10.00`
                    )}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${(subtotal + (subtotal * 0.1) + (subtotal > 100 ? 0 : 10)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
