import { z } from 'zod';
export const ProductGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    image: z.number(),
    price: z.number(),
    description: z.number(),
    category: z.number()
  }).optional(),
  _sum: z.object({
    price: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    price: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    image: z.string().nullable(),
    price: z.number().nullable(),
    description: z.string().nullable(),
    category: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    image: z.string().nullable(),
    price: z.number().nullable(),
    description: z.string().nullable(),
    category: z.string().nullable()
  }).nullable().optional()
}));