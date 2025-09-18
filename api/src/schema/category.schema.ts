import { z } from "zod";

const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  products: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type CategoryType = z.infer<typeof CategorySchema>;
