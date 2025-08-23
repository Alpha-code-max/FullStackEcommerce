import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductCountOrderByAggregateInputObjectSchema } from './ProductCountOrderByAggregateInput.schema';
import { ProductAvgOrderByAggregateInputObjectSchema } from './ProductAvgOrderByAggregateInput.schema';
import { ProductMaxOrderByAggregateInputObjectSchema } from './ProductMaxOrderByAggregateInput.schema';
import { ProductMinOrderByAggregateInputObjectSchema } from './ProductMinOrderByAggregateInput.schema';
import { ProductSumOrderByAggregateInputObjectSchema } from './ProductSumOrderByAggregateInput.schema'

export const ProductOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput, z.ZodTypeDef, Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProductOrderByWithAggregationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  image: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputObjectSchema).optional()
}).strict();
