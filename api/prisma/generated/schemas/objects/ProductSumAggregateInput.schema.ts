import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductSumAggregateInputObjectSchema: z.ZodType<Prisma.ProductSumAggregateInputType, z.ZodTypeDef, Prisma.ProductSumAggregateInputType> = z.object({
  price: z.literal(true).optional()
}).strict();
export const ProductSumAggregateInputObjectZodSchema = z.object({
  price: z.literal(true).optional()
}).strict();
