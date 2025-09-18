import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number().positive(),
  productName: z.string().optional(), // 👈 matches new field
});


export type OrderItemType = z.infer<typeof OrderItemSchema>;

