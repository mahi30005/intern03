
import React from 'react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import { useProducts } from '@/contexts/ProductContext';

interface CategoryFilterProps {
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ className }) => {
  const { filterByCategory, currentCategory } = useProducts();
  
  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Kitchen' },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={currentCategory === category.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterByCategory(category.value)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
