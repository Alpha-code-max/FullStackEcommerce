import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ProductOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput, z.ZodTypeDef, Prisma.ProductOrderByWithRelationInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
export const ProductOrderByWithRelationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional()
}).strict();
