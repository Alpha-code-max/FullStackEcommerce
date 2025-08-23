import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductSelectObjectSchema: z.ZodType<Prisma.ProductSelect, z.ZodTypeDef, Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  price: z.boolean().optional(),
  description: z.boolean().optional(),
  category: z.boolean().optional()
}).strict();
export const ProductSelectObjectZodSchema = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  price: z.boolean().optional(),
  description: z.boolean().optional(),
  category: z.boolean().optional()
}).strict();
