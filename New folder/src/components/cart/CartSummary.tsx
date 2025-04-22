
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { subtotal, itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Simple tax calculation (e.g., 10%)
  const tax = subtotal * 0.1;
  
  // Simple shipping calculation
  const shipping = subtotal > 100 ? 0 : 10;
  
  const total = subtotal + tax + shipping;
  
  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { redirect: '/checkout' } });
      return;
    }
    
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {subtotal.toLocaleString('en-IN')}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span className="flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {tax.toLocaleString('en-IN')}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span className="flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                {shipping.toLocaleString('en-IN')}
              </span>
            )}
          </span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span className="flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {total.toLocaleString('en-IN')}
          </span>
        </div>
        
        {shipping === 0 && (
          <p className="text-xs text-green-600">
            You qualify for free shipping!
          </p>
        )}
        
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">
            Add ₹{(100 - subtotal).toLocaleString('en-IN')} more to qualify for free shipping.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={itemCount === 0}
        >
          {user ? 'Proceed to Checkout' : 'Login to Checkout'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
