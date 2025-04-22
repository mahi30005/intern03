
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { Address } from '@/types';

interface CheckoutFormProps {
  onSubmit: (address: Address) => void;
  isSubmitting: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
  const [address, setAddress] = useState<Address>({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    for (const [key, value] of Object.entries(address)) {
      if (!value) {
        toast.error(`Please fill in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Shipping Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter your shipping details for delivery
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            value={address.streetAddress}
            onChange={handleChange}
            placeholder="123 Main St"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="New York"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="NY"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              placeholder="10001"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={address.country}
              onValueChange={(value) => handleSelectChange('country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="pt-2">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This is a demo site. No actual payment will be processed.
        </p>
        <p className="text-xs text-muted-foreground mb-6">
          In a real e-commerce site, payment gateway integration would be implemented here.
        </p>
      </div>
      
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Complete Order'}
      </Button>
    </form>
  );
};

export default CheckoutForm;
