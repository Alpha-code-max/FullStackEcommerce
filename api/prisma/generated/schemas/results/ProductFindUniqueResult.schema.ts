import { z } from 'zod';
export const ProductFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}));