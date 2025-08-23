import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductMaxAggregateInputObjectSchema: z.ZodType<Prisma.ProductMaxAggregateInputType, z.ZodTypeDef, Prisma.ProductMaxAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  image: z.literal(true).optional(),
  price: z.literal(true).optional(),
  description: z.literal(true).optional(),
  category: z.literal(true).optional()
}).strict();
export const ProductMaxAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  image: z.literal(true).optional(),
  price: z.literal(true).optional(),
  description: z.literal(true).optional(),
  category: z.literal(true).optional()
}).strict();
