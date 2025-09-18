import { z } from "zod";
import { OrderItemSchema } from "./orderItem.schema";

export const OrderSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),  // ObjectId string
  items: z.array(OrderItemSchema), // 👈 reuse schema
  status: z.enum(["PENDING","PAID","SHIPPED","DELIVERED","CANCELLED"]).optional(),
  total: z.number().positive(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


const OrderInputSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
})
export type OrderType = z.infer<typeof OrderSchema>;