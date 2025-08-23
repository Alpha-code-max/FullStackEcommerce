import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProductAvgAggregateInputType, z.ZodTypeDef, Prisma.ProductAvgAggregateInputType> = z.object({
  price: z.literal(true).optional()
}).strict();
export const ProductAvgAggregateInputObjectZodSchema = z.object({
  price: z.literal(true).optional()
}).strict();
