// src/store/productStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import type { Product } from '@/types/product';

interface ProductState {
  products: Product[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;

  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  createProduct: (payload: Partial<Product>) => Promise<{ success: boolean; message?: string; data?: Product }>;
  updateProduct: (id: string, payload: Partial<Product>) => Promise<{ success: boolean; message?: string; data?: Product }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message?: string }>;
  setSelectedCategory: (category: string | null) => void;
  getFilteredProducts: () => Product[];
  clearError: () => void;
  clearMessages: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      selectedCategory: null,
      isLoading: false,
      error: null,
      successMessage: null,

      // Fixed: Use your api instance (axios) consistently
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/api/products');
          const data = response.data;

          // Backend returns { message: "...", products: [...] }
          const products = Array.isArray(data.products) ? data.products : [];

          set({ products });
        } catch (err: any) {
          console.error('Fetch products error:', err);
          const message = err.response?.data?.message || err.message || 'Failed to fetch products';
          set({ error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      getProductById: (id: string) => {
        const { products } = get();
        return products.find((p) => p.id === id);
      },

      createProduct: async (payload: Partial<Product>) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await api.post('/api/products', payload);
          const newProduct: Product = response.data.product || response.data;

          set((state) => ({
            products: [...(Array.isArray(state.products) ? state.products : []), newProduct],
            successMessage: response.data.message || 'Product added successfully',
            error: null,
          }));

          return { success: true, data: newProduct };
        } catch (err: any) {
          console.error('Create product error:', err);
          const message = err.response?.data?.message || err.message || 'Failed to create product';
          set({ error: message });
          return { success: false, message };
        } finally {
          set({ isLoading: false });
        }
      },

      updateProduct: async (id: string, payload: Partial<Product>) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await api.put(`/api/products/${id}`, payload);
          const updatedProduct: Product = response.data.product || response.data.data || response.data;

          set((state) => ({
            products: state.products.map((p) => (p.id === id ? updatedProduct : p)),
            successMessage: 'Product updated successfully',
          }));

          return { success: true, data: updatedProduct };
        } catch (err: any) {
          const message = err.response?.data?.message || 'Failed to update product';
          set({ error: message });
          return { success: false, message };
        } finally {
          set({ isLoading: false });
        }
      },

      deleteProduct: async (id: string) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await api.delete(`/api/products/${id}`);

          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            successMessage: 'Product deleted successfully',
          }));

          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || 'Failed to delete product';
          set({ error: message });
          return { success: false, message };
        } finally {
          set({ isLoading: false });
        }
      },

      setSelectedCategory: (category: string | null) => {
        set({ selectedCategory: category });
      },

      getFilteredProducts: () => {
        const { products, selectedCategory } = get();
        const safeProducts = Array.isArray(products) ? products : [];
        if (!selectedCategory) return safeProducts;
        return safeProducts.filter((p) => p.category === selectedCategory);
      },

      clearError: () => set({ error: null }),
      clearMessages: () => set({ error: null, successMessage: null }),
    }),
    {
      name: 'product-storage',
      partialize: (state) => ({
        products: Array.isArray(state.products) ? state.products : [],
        selectedCategory: state.selectedCategory,
      }),
    }
  )
);