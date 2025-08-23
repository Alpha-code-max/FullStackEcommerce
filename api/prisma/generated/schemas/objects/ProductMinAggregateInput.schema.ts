import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductMinAggregateInputObjectSchema: z.ZodType<Prisma.ProductMinAggregateInputType, z.ZodTypeDef, Prisma.ProductMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  image: z.literal(true).optional(),
  price: z.literal(true).optional(),
  description: z.literal(true).optional(),
  category: z.literal(true).optional()
}).strict();
export const ProductMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  image: z.literal(true).optional(),
  price: z.literal(true).optional(),
  description: z.literal(true).optional(),
  category: z.literal(true).optional()
}).strict();
