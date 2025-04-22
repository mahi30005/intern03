import { Product, User, Order } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation.',
    price: 15999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    inStock: true,
    rating: 4.5,
    featured: true
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt in various colors.',
    price: 1499,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    inStock: true,
    rating: 4.2
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected with this smart watch.',
    price: 24999,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    inStock: true,
    rating: 4.7,
    featured: true
  },
  {
    id: '4',
    name: 'Bestselling Novel',
    description: 'The latest bestselling fiction novel everyone is talking about.',
    price: 899,
    category: 'books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    inStock: true,
    rating: 4.8
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Work comfortably with this ergonomic design office chair.',
    price: 249.99,
    category: 'home',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.4
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with excellent sound quality.',
    price: 89.99,
    category: 'electronics',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.3
  },
  {
    id: '7',
    name: 'Denim Jeans',
    description: 'Classic denim jeans for everyday wear.',
    price: 49.99,
    category: 'clothing',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.1
  },
  {
    id: '8',
    name: 'Cookbook Collection',
    description: 'Set of popular cookbooks with recipes from around the world.',
    price: 34.99,
    category: 'books',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.6,
    featured: true
  },
  {
    id: '9',
    name: 'Decorative Throw Pillows',
    description: 'Set of 2 decorative throw pillows to enhance your living space.',
    price: 29.99,
    category: 'home',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.0
  },
  {
    id: '10',
    name: 'Fitness Tracker',
    description: 'Monitor your daily activity and health metrics.',
    price: 79.99,
    category: 'electronics',
    image: '/placeholder.svg',
    inStock: false,
    rating: 4.4
  },
  {
    id: '11',
    name: 'Winter Jacket',
    description: 'Stay warm with this insulated winter jacket.',
    price: 129.99,
    category: 'clothing',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.7
  },
  {
    id: '12',
    name: 'Self-improvement Book',
    description: 'Bestselling self-improvement book to enhance your life.',
    price: 19.99,
    category: 'books',
    image: '/placeholder.svg',
    inStock: true,
    rating: 4.9,
    featured: true
  }
];

export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    isAdmin: true
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    isAdmin: false
  }
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {
        product: products[0],
        quantity: 1
      },
      {
        product: products[3],
        quantity: 2
      }
    ],
    total: 229.97,
    status: 'delivered',
    createdAt: '2023-01-15T12:00:00Z',
    address: {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA'
    }
  }
];
