'use client';

import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { Product, Category } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';

type ProductGridProps = {
  filteredProducts: Product[];
  selectedCategoryInfo: Category | undefined;
  handleClearFilters: () => void;
};

export function ProductGrid({
  filteredProducts = [],
  selectedCategoryInfo,
  handleClearFilters,
}: ProductGridProps) {
  return (
    <div className="lg:col-span-3">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            {selectedCategoryInfo?.name || 'All Products'}
          </h3>
          {selectedCategoryInfo?.description && (
            <p className="text-gray-600 text-sm mt-1 max-w-lg">
              {selectedCategoryInfo.description}
            </p>
          )}
        </div>
        <Badge
          variant="secondary"
          className="mt-3 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
        >
          {filteredProducts.length} {filteredProducts.length === 1 ? 'service' : 'services'}
        </Badge>
      </div>

      {/* Products Grid */}
      <AnimatePresence>
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white shadow-sm rounded-full w-16 h-16 flex items-center justify-center mb-4 border border-gray-200">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              We couldn’t find any results. Adjust your filters or explore all available
              services.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
