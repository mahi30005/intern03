
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CartItem as ICartItem } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash, IndianRupee } from 'lucide-react';

interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const itemTotal = product.price * quantity;

  return (
    <div className="flex py-4 border-b last:border-0">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link 
              to={`/products/${product.id}`}
              className="text-sm font-medium hover:text-primary"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-sm font-medium flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {itemTotal.toLocaleString('en-IN')}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-l-md"
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-2 text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-r-md"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(product.id)}
          >
            <Trash className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
