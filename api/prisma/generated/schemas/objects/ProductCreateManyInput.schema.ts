import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductCreateManyInputObjectSchema: z.ZodType<Prisma.ProductCreateManyInput, z.ZodTypeDef, Prisma.ProductCreateManyInput> = z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}).strict();
export const ProductCreateManyInputObjectZodSchema = z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}).strict();
