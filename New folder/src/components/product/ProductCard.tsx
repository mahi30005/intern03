
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, IndianRupee } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="space-y-1">
            <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <p className="font-semibold flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {product.price.toLocaleString('en-IN')}
          </p>
          <Button 
            size="sm" 
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
