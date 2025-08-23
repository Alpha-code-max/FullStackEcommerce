import { z } from 'zod';

// prettier-ignore
export const ProductModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string()
}).strict();

export type ProductModelType = z.infer<typeof ProductModelSchema>;
