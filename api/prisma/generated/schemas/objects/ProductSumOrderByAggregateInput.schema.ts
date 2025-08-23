import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ProductSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput, z.ZodTypeDef, Prisma.ProductSumOrderByAggregateInput> = z.object({
  price: SortOrderSchema.optional()
}).strict();
export const ProductSumOrderByAggregateInputObjectZodSchema = z.object({
  price: SortOrderSchema.optional()
}).strict();
