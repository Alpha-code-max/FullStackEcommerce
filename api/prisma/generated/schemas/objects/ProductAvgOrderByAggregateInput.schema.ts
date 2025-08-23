import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ProductAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput, z.ZodTypeDef, Prisma.ProductAvgOrderByAggregateInput> = z.object({
  price: SortOrderSchema.optional()
}).strict();
export const ProductAvgOrderByAggregateInputObjectZodSchema = z.object({
  price: SortOrderSchema.optional()
}).strict();
