import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema'

export const ProductScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput, z.ZodTypeDef, Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  image: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  price: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  category: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const ProductScalarWhereWithAggregatesInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  image: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  price: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  category: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
