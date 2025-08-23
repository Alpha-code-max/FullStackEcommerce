import { z } from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'name', 'image', 'price', 'description', 'category'])