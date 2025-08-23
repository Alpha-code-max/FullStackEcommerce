import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ProductCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput, z.ZodTypeDef, Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
export const ProductCountOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
