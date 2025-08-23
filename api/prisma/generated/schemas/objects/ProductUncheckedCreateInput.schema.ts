import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateInput, z.ZodTypeDef, Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}).strict();
export const ProductUncheckedCreateInputObjectZodSchema = z.object({
  id: z.string().max(24).optional(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string()
}).strict();
