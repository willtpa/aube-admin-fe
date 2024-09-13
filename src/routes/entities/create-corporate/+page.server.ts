import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';
import { uuidv7 } from 'uuidv7';
import type { components } from '$lib/openapi/adminapi.schema';
import { CountryCode2 } from '$lib/openapi/types';

const schema: z.ZodType<components['schemas']['CreateEntityCorporate']> = z.object({
    entity_type: z.literal('corporate'),
    email: z.string().email(),
    street: z.string().min(2),
    city: z.string().min(2),
    postal_code: z.string().min(2),
    country: z.nativeEnum(CountryCode2, {
        message: 'Please select a country',
    }),
    company_name: z.string().min(2),
    incorporation_date: z.string().date(),
    registration_country: z.nativeEnum(CountryCode2, {
        message: 'Please select a country',
    }),
});

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(schema)),
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) return fail(400, { form });

        const { error } = await apiClient.POST('/admin/api/v1/entities', {
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

        return message(form, 'Entity created sucessfully!');
    },
};
