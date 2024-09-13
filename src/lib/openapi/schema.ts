import { z } from 'zod';
import type { components } from '$lib/openapi/adminapi.schema';
import {
    AccountCategory,
    AccountLocality,
    CreateAccountNetworkCurrencyId,
} from '$lib/openapi/types';

export const AccountSchema: z.ZodType<
    components['requestBodies']['create-account']['content']['application/json']
> = z
    .object({
        entity_id: z.string(),
        account_category: z.nativeEnum(AccountCategory),
        account_locality: z.nativeEnum(AccountLocality),
        label: z.string().min(2),
        network_currency_id: z.nativeEnum(CreateAccountNetworkCurrencyId),
        IBAN: z.string(),
        BIC: z.string(),
    })
    .superRefine((data, ctx) => {
        if (
            data.account_category === AccountCategory['Bank account'] &&
            data.account_locality === AccountLocality['External']
        ) {
            if (data.IBAN.length < 32) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'IBAN is required for external bank accounts',
                    path: ['IBAN'],
                });
            }
            if (data.BIC.length < 8) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'BIC is required for external bank accounts',
                    path: ['BIC'],
                });
            }
        }
    });
