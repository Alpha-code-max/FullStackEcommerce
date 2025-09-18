// src/schemas/product.schema.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),        
  name: z.string(),
  price: z.number(),
  categoryId: z.string().optional(),   // ObjectId
  image: z.string().optional(),
  description: z.string(),
  stock: z.number().optional(),
  userId: z.string().optional(),                  // required, ObjectId
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// ✅ Schema for input
export const ProductInputSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  user: true,
  categoryId: true,
});


// Types for TypeScript
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductInputType = z.infer<typeof ProductInputSchema>;
