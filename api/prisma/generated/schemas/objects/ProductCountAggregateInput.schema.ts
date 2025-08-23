import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductCountAggregateInputType, z.ZodTypeDef, Prisma.ProductCountAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  image: z.literal(true).optional(),
  price: z.literal(true).optional(),
  description: z.literal(true).optional(),
  category: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProductCountAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  image: z.literal(true).optional(),
  price: z.literal(true).optional(),
  description: z.literal(true).optional(),
  category: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
