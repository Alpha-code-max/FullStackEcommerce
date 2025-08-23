import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ProductMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput, z.ZodTypeDef, Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
export const ProductMaxOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
