
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { orders } from '@/data/mockData';
import { Order } from '@/types';

const OrdersPage = () => {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    if (user) {
      // Filter orders for current user
      const filteredOrders = orders.filter(order => order.userId === user.id);
      setUserOrders(filteredOrders);
    }
  }, [user]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold">Please Log In</h2>
          <p className="mt-2 text-muted-foreground">
            You need to be logged in to view your orders.
          </p>
          <Link to="/login">
            <Button className="mt-4">
              Login
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {userOrders.length === 0 ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No orders yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/products">
              <Button className="mt-2">
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item) => (
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
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <address className="not-italic text-sm text-muted-foreground">
                          {order.address.fullName}<br />
                          {order.address.streetAddress}<br />
                          {order.address.city}, {order.address.state} {order.address.postalCode}<br />
                          {order.address.country}
                        </address>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Order Summary</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>${(order.total * 0.1).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>
                              {order.total > 100 ? (
                                <span className="text-green-600">Free</span>
                              ) : (
                                `$10.00`
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between font-medium pt-1">
                            <span>Total</span>
                            <span>${(order.total + (order.total * 0.1) + (order.total > 100 ? 0 : 10)).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
