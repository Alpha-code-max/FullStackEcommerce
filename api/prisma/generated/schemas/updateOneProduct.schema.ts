import { z } from 'zod';
import { ProductSelectObjectSchema } from './objects/ProductSelect.schema';
import { ProductUpdateInputObjectSchema } from './objects/ProductUpdateInput.schema';
import { ProductUncheckedUpdateInputObjectSchema } from './objects/ProductUncheckedUpdateInput.schema';
import { ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';

// Schema for updating a single product record
export const ProductUpdateOneSchema = z.object({ 
  select: ProductSelectObjectSchema.optional(),  
  data: z.union([ProductUpdateInputObjectSchema, ProductUncheckedUpdateInputObjectSchema]), 
  where: ProductWhereUniqueInputObjectSchema 
})
