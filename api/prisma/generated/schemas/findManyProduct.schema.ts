import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductOrderByWithRelationInputObjectSchema } from './objects/ProductOrderByWithRelationInput.schema';
import { ProductWhereInputObjectSchema } from './objects/ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';
import { ProductScalarFieldEnumSchema } from './enums/ProductScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductFindManySelectSchema: z.ZodType<Prisma.ProductSelect, z.ZodTypeDef, Prisma.ProductSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    image: z.boolean().optional(),
    price: z.boolean().optional(),
    description: z.boolean().optional(),
    category: z.boolean().optional()
  }).strict();

export const ProductFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    image: z.boolean().optional(),
    price: z.boolean().optional(),
    description: z.boolean().optional(),
    category: z.boolean().optional()
  }).strict();

export const ProductFindManySchema: z.ZodType<Prisma.ProductFindManyArgs, z.ZodTypeDef, Prisma.ProductFindManyArgs> = z.object({ select: ProductFindManySelectSchema.optional(),  orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict();

export const ProductFindManyZodSchema = z.object({ select: ProductFindManySelectSchema.optional(),  orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict();