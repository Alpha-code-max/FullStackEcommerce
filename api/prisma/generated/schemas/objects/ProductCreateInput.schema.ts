import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductCreateInputObjectSchema: z.ZodType<Prisma.ProductCreateInput, z.ZodTypeDef, Prisma.ProductCreateInput> = z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}).strict();
export const ProductCreateInputObjectZodSchema = z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}).strict();
