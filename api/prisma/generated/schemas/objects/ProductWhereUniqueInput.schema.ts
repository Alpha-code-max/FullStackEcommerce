import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ProductWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProductWhereUniqueInput, z.ZodTypeDef, Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string().max(24)
}).strict();
export const ProductWhereUniqueInputObjectZodSchema = z.object({
  id: z.string().max(24)
}).strict();
