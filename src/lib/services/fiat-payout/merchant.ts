import { z } from 'zod';

export const MerchantSchema = z.object({
    id: z.number(),
    name: z.string(),
    key: z.string(),
    email: z.string(),
});

export const MerchantResponseSchema = z.object({
    merchants: z.array(MerchantSchema),
    count: z.number(),
});

export type Merchant = z.infer<typeof MerchantSchema>;
export type MerchantResponse = z.infer<typeof MerchantResponseSchema>;
