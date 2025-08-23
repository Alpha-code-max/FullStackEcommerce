import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductSelectObjectSchema } from './ProductSelect.schema'

export const ProductArgsObjectSchema = z.object({
  select: z.lazy(() => ProductSelectObjectSchema).optional()
}).strict();
export const ProductArgsObjectZodSchema = z.object({
  select: z.lazy(() => ProductSelectObjectSchema).optional()
}).strict();
