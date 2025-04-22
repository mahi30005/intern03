
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash, Plus, Package, ShoppingCart, Users } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { products, orders, users } from '@/data/mockData';
import { Product, Category } from '@/types';
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    category: 'electronics' as Category,
    image: '/placeholder.svg',
    inStock: true,
    featured: false,
  });
  
  // Redirect if not admin
  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [user, isAdmin, navigate]);

  // Handle product form changes
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setProductFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  // Handle checkbox/switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProductFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setProductFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Set up form for editing
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({ ...product });
  };
  
  // Reset form
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setProductFormData({
      id: '',
      name: '',
      description: '',
      price: 0,
      category: 'electronics',
      image: '/placeholder.svg',
      inStock: true,
      featured: false,
    });
  };
  
  // Save product (edit or create)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Edit existing product
      const index = products.findIndex(p => p.id === editingProduct.id);
      if (index !== -1) {
        products[index] = { ...productFormData };
        toast.success('Product updated successfully');
      }
    } else {
      // Add new product
      const newProduct = {
        ...productFormData,
        id: `${products.length + 1}`,
      };
      products.push(newProduct);
      toast.success('Product added successfully');
    }
    
    handleCancelEdit();
  };
  
  // Delete product
  const handleDeleteProduct = (id: string) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      toast.success('Product deleted successfully');
    }
  };

  if (!user || !isAdmin) {
    return null; // Redirecting...
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              {!editingProduct && (
                <Button onClick={() => setActiveTab('addProduct')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              )}
            </div>
            
            {/* Add/Edit Product Form */}
            {(editingProduct || activeTab === 'addProduct') && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
                  <CardDescription>
                    {editingProduct ? 'Update product details' : 'Fill in the details for the new product'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={productFormData.name}
                          onChange={handleProductChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={productFormData.price}
                          onChange={handleProductChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={productFormData.description}
                        onChange={handleProductChange}
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productFormData.category}
                          onValueChange={(value) => handleSelectChange('category', value)}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                            <SelectItem value="home">Home & Kitchen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          name="image"
                          value={productFormData.image}
                          onChange={handleProductChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="inStock"
                          checked={productFormData.inStock}
                          onCheckedChange={(checked) => handleSwitchChange('inStock', checked)}
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={productFormData.featured}
                          onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Products Table */}
            {!editingProduct && activeTab !== 'addProduct' && (
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {products.map((product) => (
                        <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 rounded-md object-cover"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                {product.featured && (
                                  <Badge variant="outline" className="mt-1">Featured</Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle capitalize">{product.category}</td>
                          <td className="p-4 align-middle">${product.price.toFixed(2)}</td>
                          <td className="p-4 align-middle">
                            {product.inStock ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>
                            )}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Orders</h2>
            </div>
            
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No orders yet</h3>
                  <p className="text-muted-foreground">Orders will appear here as customers make purchases.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="bg-muted/50">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <CardDescription>
                            Placed on {new Date(order.createdAt).toLocaleDateString()} by User #{order.userId}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          <Select defaultValue={order.status}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
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
                ))
              )}
            </div>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Users</h2>
            </div>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {users.map((user) => (
                      <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">#{user.id}</td>
                        <td className="p-4 align-middle">{user.name}</td>
                        <td className="p-4 align-middle">{user.email}</td>
                        <td className="p-4 align-middle">
                          {user.isAdmin ? (
                            <Badge>Admin</Badge>
                          ) : (
                            <Badge variant="outline">Customer</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
