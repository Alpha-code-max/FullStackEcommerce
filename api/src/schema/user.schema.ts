// src/schemas/user.schema.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),                             // ObjectId as string
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),   // Must be valid email
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(1, "Address is required"),
  order: z.array(z.string()),
  createdAt: z.date(),
  role: z.enum(["user", "admin"]),
});

// ✅ Schema for registering a new user (exclude id & createdAt)
export const UserInputSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  order: true
});

export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

// Types for TypeScript
export type UserType = z.infer<typeof UserSchema>;
export type UserInputType = z.infer<typeof UserInputSchema>;
export type UserLoginType = z.infer<typeof UserLoginSchema>;

