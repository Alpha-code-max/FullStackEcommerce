'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTitle } from '@/components/PageTitle';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { CallToAction } from '@/components/CallToAction';
import { useState, useMemo, useEffect } from 'react';
import { products, categories } from '@/data/products';

export default function Home() {
  // State initialization
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000); // Default value
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]); // Default range
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Calculate max price on component mount
  useEffect(() => {
    const calculatedMaxPrice = Math.max(...products.map(p => p.price));
    setMaxPrice(calculatedMaxPrice);
    setPriceRange([0, calculatedMaxPrice]);
  }, []);

  // Filter products when filters change
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, priceRange]);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
  };

  // Get selected category info
  const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTitle />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search and Filter Sidebar */}
          <div className="lg:col-span-1">
            <SearchAndFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              priceRange={priceRange}
              maxPrice={maxPrice}
              setSelectedCategory={setSelectedCategory}
              setSearchQuery={setSearchQuery}
              setPriceRange={setPriceRange}
              handleClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <ProductGrid 
            filteredProducts={filteredProducts}
            selectedCategoryInfo={selectedCategoryInfo}
            handleClearFilters={handleClearFilters}
          />
        </div>

        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}