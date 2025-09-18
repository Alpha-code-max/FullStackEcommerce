'use client';

import { ReactNode } from 'react';
import { ProductProvider } from '@/context/ProductContext';

export function ProductsWrapper({ children }: { children: ReactNode }) {
  return <ProductProvider>{children}</ProductProvider>;
}