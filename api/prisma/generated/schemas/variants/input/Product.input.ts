import { z } from 'zod';

// prettier-ignore
export const ProductInputSchema = z.object({
    name: z.string(),
    image: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string()
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
