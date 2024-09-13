import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';
import { uuidv7 } from 'uuidv7';
import type { components } from '$lib/openapi/adminapi.schema';
import { CountryCode2, Gender } from '$lib/openapi/types';

const schema: z.ZodType<components['schemas']['CreateEntityIndividual']> = z.object({
    entity_type: z.literal('individual'),
    email: z.string().email(),
    gender: z.nativeEnum(Gender, {
        message: 'Please select a gender',
    }),
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    street: z.string().min(2),
    city: z.string().min(2),
    postal_code: z.string().min(2),
    country: z.nativeEnum(CountryCode2, {
        message: 'Please select a country',
    }),
    nationality: z.nativeEnum(CountryCode2, {
        message: 'Please select a nationality',
    }),
    birth_country: z.nativeEnum(CountryCode2, {
        message: 'Please select a country',
    }),
    birth_date: z.string().date(),
    birth_place: z.string().min(2),
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
