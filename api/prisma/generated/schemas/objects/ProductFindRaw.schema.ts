import { z } from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from './helpers/json-helpers';

export const ProductFindRawObjectSchema = z.object({
  filter: jsonSchema.optional(),
  options: jsonSchema.optional()
}).strict();
export const ProductFindRawObjectZodSchema = z.object({
  filter: jsonSchema.optional(),
  options: jsonSchema.optional()
}).strict();
