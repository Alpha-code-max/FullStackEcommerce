import { z } from 'zod';
import type { Prisma } from '@prisma/client';


import { JsonValueSchema as jsonSchema } from './helpers/json-helpers';

export const ProductAggregateRawObjectSchema = z.object({
  pipeline: jsonSchema.array().optional(),
  options: jsonSchema.optional()
}).strict();
export const ProductAggregateRawObjectZodSchema = z.object({
  pipeline: jsonSchema.array().optional(),
  options: jsonSchema.optional()
}).strict();
