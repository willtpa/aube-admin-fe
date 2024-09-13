import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail, type ServerLoadEvent } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';
import { uuidv7 } from 'uuidv7';
import { AccountSchema } from '$lib/openapi/schema';
import type { PageServerLoad } from './$types';
import { APIError } from '$lib/openapi/error';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const entityId: string = event.params['entityId'] as string;

    const entityRes = await apiClient.GET('/admin/api/v1/entities/{entity-id}', {
        params: {
            path: {
                'entity-id': entityId,
            },
        },
    });

    if (entityRes.error != null) {
        throw new APIError(entityRes.response.status, entityRes.error);
    }

    return {
        form: await superValidate(zod(AccountSchema)),
        entity: entityRes.data,
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(AccountSchema));

        if (!form.valid) return fail(400, { form });

        const { error } = await apiClient.POST('/admin/api/v1/accounts', {
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
