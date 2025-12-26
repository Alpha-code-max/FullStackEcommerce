// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import type { User, LoginPayload, RegisterPayload } from '@/types/user';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;

  register: (payload: RegisterPayload) => Promise<ApiResponse>;
  login: (payload: LoginPayload) => Promise<ApiResponse>;
  loadUser: () => Promise<ApiResponse<User | null>>;
  logout: () => Promise<ApiResponse>;
  clearMessages: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      successMessage: null,
      isAuthenticated: false,

      register: async (payload: RegisterPayload) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await api.post('/user/register', payload);
          const backendMessage = response.data.message || 'Registration successful';

          const user = response.data.data.user as User;

          set({
            user,
            isAuthenticated: true,
            successMessage: backendMessage,
          });

          return { success: true, message: backendMessage, data: response.data.data };
        } catch (err: any) {
          const backendMessage =
            err.response?.data?.message ||
            err.response?.data?.errors?.[0]?.message ||
            'Registration failed. Please try again.';

          set({ error: backendMessage });
          return { success: false, message: backendMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const response = await api.post('/user/login', payload);
          const backendMessage = response.data.message || 'Login successful';

          const user = response.data.data.user as User;

          set({
            user,
            isAuthenticated: true,
            successMessage: backendMessage,
          });

          return { success: true, message: backendMessage, data: response.data.data };
        } catch (err: any) {
          const backendMessage = err.response?.data?.message || 'Invalid email or password';
          set({ error: backendMessage });
          return { success: false, message: backendMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      loadUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get('/user/me');
          const user = response.data.data.user as User;

          set({ user, isAuthenticated: true });
          return { success: true, data: user };
        } catch (err: any) {
          set({ user: null, isAuthenticated: false });
          return { success: false };
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          await api.post('/user/logout');
          set({ user: null, isAuthenticated: false, successMessage: 'Logged out successfully' });
          return { success: true, message: 'Logged out successfully' };
        } catch (err: any) {
          const backendMessage = err.response?.data?.message || 'Logout failed';
          set({ error: backendMessage });
          return { success: false, message: backendMessage };
        } finally {
          set({ isLoading: false });
        }
      },

      clearMessages: () => set({ error: null, successMessage: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              name: state.user.name,
              email: state.user.email,
              role: state.user.role,
              address: state.user.address,
              // Add any other safe, serializable fields
            }
          : null,
        isAuthenticated: state.isAuthenticated,
      }),
      // Optional: Advanced serialization if needed
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
    }
  )
);