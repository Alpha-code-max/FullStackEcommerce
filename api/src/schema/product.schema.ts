// src/schemas/product.schema.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),        // Prisma will generate
  name: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string().optional(),
  description: z.string(),
  stock: z.number().optional(),
  userId: z.number().optional(),    // added for relation
  createdAt: z.date().optional(),   // Prisma will generate
});

// ✅ Schema for input
export const ProductInputSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
});


// Types for TypeScript
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductInputType = z.infer<typeof ProductInputSchema>;
