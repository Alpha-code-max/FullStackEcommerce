import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductOrderByWithRelationInputObjectSchema } from './objects/ProductOrderByWithRelationInput.schema';
import { ProductWhereInputObjectSchema } from './objects/ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';
import { ProductCountAggregateInputObjectSchema } from './objects/ProductCountAggregateInput.schema';

export const ProductCountSchema: z.ZodType<Prisma.ProductCountArgs, z.ZodTypeDef, Prisma.ProductCountArgs> = z.object({ orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProductCountAggregateInputObjectSchema ]).optional() }).strict();

export const ProductCountZodSchema = z.object({ orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProductCountAggregateInputObjectSchema ]).optional() }).strict();