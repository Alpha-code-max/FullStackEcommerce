import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ProductMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput, z.ZodTypeDef, Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
export const ProductMinOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
