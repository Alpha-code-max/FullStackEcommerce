'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { products, categories } from '@/data/products';
import { Product, Category } from '@/types/product';

type ProductContextType = {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  priceRange: [number, number];
  maxPrice: number;
  filteredProducts: Product[];
  selectedCategoryInfo: Category | undefined;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  handleClearFilters: () => void;
};

// Create context with a default undefined value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate max price once
  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price));
  }, []);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, priceRange]);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, maxPrice]);
  };

  // Get selected category info
  const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);

  // Create context value object
  const contextValue = {
    products,
    categories,
    selectedCategory,
    searchQuery,
    priceRange,
    maxPrice,
    filteredProducts,
    selectedCategoryInfo,
    setSelectedCategory,
    setSearchQuery,
    setPriceRange,
    handleClearFilters,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use the product context
export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}