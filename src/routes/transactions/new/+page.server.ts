import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';
import { uuidv7 } from 'uuidv7';
import type { components } from '$lib/openapi/adminapi.schema';
import { APIError } from '$lib/openapi/error';

const schema: z.ZodType<components['schemas']['CreateTransaction']> = z
    .object({
        from_account_id: z.string(),
        to_account_id: z.string(),
        amount: z.string(),
    })
    .superRefine((data, ctx) => {
        if (+data.amount <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Amount must be positive',
                path: ['amount'],
            });
        }

        if (data.from_account_id === data.to_account_id) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Payer and Recipient must be different',
                path: ['to_account_id'],
            });
        }
    });

export const load: PageServerLoad = async () => {
    const { data, error, response } = await apiClient.GET('/admin/api/v1/accounts', {});

    if (error != null) {
        throw new APIError(response.status, error);
    }

    return {
        accounts: data,
        form: await superValidate(zod(schema)),
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) return fail(400, { form });

        const { error } = await apiClient.POST('/admin/api/v1/transactions', {
            params: {
                header: {
                    'content-type': 'application/json',
                    'X-Idempotency-Key': uuidv7(),
                },
            },
            body: form.data,
        });

        if (error != null) {
            return message(form, error);
        }

        return message(form, 'Transaction created sucessfully!');
    },
};
