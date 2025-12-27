'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { createProduct, isLoading, error, clearError } = useProductStore();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '', // ← now matches backend
    stock: '10',    // ← default stock quantity
  });

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    router.replace('/products');
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    clearError?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  clearError?.(); // Clear any previous error at start

  const payload = {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    stock: Number(form.stock) || 0,
    categoryId: form.categoryId || null,
    userId: user?._id, // ensure this exists
  };

  const result = await createProduct(payload);

  console.log('Create product result:', result); // Keep this temporarily to confirm

  if (result?.success) {
    clearError?.(); // Explicitly clear error on success
    router.push('/products'); // This should now always trigger
    return;
  }

  // Optional: if failed, error is already set by store
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-10 h-10 text-blue-600" />
            Add New Product
          </h1>
          <p className="text-gray-600 mt-2">Fill in the details to add a new building material to the catalog.</p>
        </div>

        <Card className="bg-white shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Product Details</h2>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., Dangote Cement (50kg Bag)"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Premium quality cement suitable for all construction projects..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              {/* Price & Stock Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₦)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="5000"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="10"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Category ID (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category ID (Optional)</Label>
                <Input
                  id="categoryId"
                  type="text"
                  placeholder="e.g., 507f1f77bcf86cd799439011 (MongoDB ObjectId)"
                  value={form.categoryId}
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                  Leave empty if no category assigned. Use the actual category ObjectId from your DB.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end gap-4">
              <Link href="/products">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg flex items-center gap-2"
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}