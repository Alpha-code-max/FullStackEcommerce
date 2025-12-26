'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useAuthStore } from '@/store/authStore';

export default function ProductsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { products, isLoading, error, fetchProducts } = useProductStore();

  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = isAuthenticated && user?.role === 'admin';

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search query
  const displayedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    if (searchQuery.trim() === '') {
      return products; // Show all if no search
    }

    const lowerQuery = searchQuery.toLowerCase().trim();

    return products.filter(product => {
      const name = (product.name ?? '').toLowerCase();
      const description = (product.description ?? '').toLowerCase();

      return name.includes(lowerQuery) || description.includes(lowerQuery);
    });
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Title + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              All Products
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Browse our full range of high-quality building materials at competitive prices.
            </p>
          </div>

          {isAdmin && (
            <Link href="/admin/products/add">
              <Button className="mt-6 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 px-6 py-3">
                <Plus className="w-5 h-5" />
                Add New Product
              </Button>
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <Input
            type="text"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-6 text-lg rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Product Grid */}
        <div className="w-full">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-600">{error}</p>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                {searchQuery ? 'No products found matching your search.' : 'No products available yet.'}
              </p>
            </div>
          ) : (
            <ProductGrid
              filteredProducts={displayedProducts}
              selectedCategoryInfo={{ id: 'all', name: 'All Products' }}
              handleClearFilters={() => setSearchQuery('')} // Clears search
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}