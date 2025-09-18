'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';
import { Category } from '@/types/product';

type SearchAndFilterProps = {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  priceRange: [number, number];
  maxPrice: number;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  handleClearFilters: () => void;
};

export function SearchAndFilter({
  categories,
  selectedCategory,
  searchQuery,
  priceRange,
  maxPrice,
  setSelectedCategory,
  setSearchQuery,
  setPriceRange,
  handleClearFilters
}: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '' || 
                          priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products and services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-sm mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">Price Range</h3>
                <span className="text-xs text-gray-500">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
              </div>
              <Slider
                defaultValue={[0, maxPrice]}
                value={priceRange}
                min={0}
                max={maxPrice}
                step={100}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-2"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}