
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const OrderSuccessPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Redirecting...
  }

  return (
    <MainLayout>
      <div className="container py-16 max-w-md mx-auto text-center">
        <div className="rounded-full w-20 h-20 bg-primary/20 flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mt-6 mb-3">Order Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We've received your order and will process it soon.
        </p>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="font-medium mb-4">What's Next?</h2>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              You'll receive an email confirmation shortly.
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              Your order will be processed and packed.
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              You can track your order status in your account.
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
              Once shipped, you'll receive shipping updates.
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders">
            <Button>
              View My Orders
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;
