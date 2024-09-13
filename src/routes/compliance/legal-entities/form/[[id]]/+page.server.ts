import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';
import {
    createCorporateSchema,
    createIndividualSchema,
    updateCorporateSchema,
    updateIndividualSchema,
} from './schemas';
import { v7 as uuidv7 } from 'uuid';

export const load: PageServerLoad = async ({ params, fetch }) => {
    if (params.id) {
        const {
            data,
            error: responseError,
            response,
        } = await apiClient.GET('/admin/api/v1/compliance/legal-entities/{legal-entity-id}', {
            fetch: fetch,
            params: {
                path: {
                    'legal-entity-id': params.id,
                },
            },
        });

        if (responseError) {
            error(response.status, {
                ...responseError,
                message: responseError.detail,
                status: response.status,
            });
        }

        if (data.entity_type === 'individual') {
            return {
                legalEntityIndividualForm: await superValidate(data, zod(updateIndividualSchema)),
            };
        } else if (data.entity_type === 'corporate') {
            return {
                legalEntityCorporateForm: await superValidate(data, zod(updateCorporateSchema)),
            };
        }
    }

    return {
        legalEntityIndividualForm: await superValidate(zod(createIndividualSchema)),
        legalEntityCorporateForm: await superValidate(zod(createCorporateSchema)),
    };
};

export const actions: Actions = {
    individual: async ({ params, request, fetch }) => {
        if (params.id) {
            return await updateIndividual(request, fetch, params.id);
        }

        return await createIndividual(request, fetch);
    },
    corporate: async ({ params, request, fetch }) => {
        if (params.id) {
            return await updateCorporate(request, fetch, params.id);
        }

        return await createCorporate(request, fetch);
    },
};

async function createIndividual(request: Request, fetch: typeof window.fetch) {
    const form = await superValidate(request, zod(createIndividualSchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.POST(
        '/admin/api/v1/compliance/legal-entities',
        {
            fetch: fetch,
            params: {
                header: {
                    'X-Idempotency-Key': uuidv7(),
                },
            },
            body: { ...form.data, entity_type: 'individual' },
        },
    );

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    message(form, 'Individual legal entity created successfully!');

    return redirect(302, `/compliance/legal-entities`);
}

async function updateIndividual(request: Request, fetch: typeof window.fetch, id: string) {
    const form = await superValidate(request, zod(updateIndividualSchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.PUT(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}',
        {
            fetch: fetch,
            params: {
                path: {
                    'legal-entity-id': id,
                },
            },
            body: { ...form.data, entity_type: 'individual' },
        },
    );

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    message(form, 'Individual legal entity edited successfully!');

    return redirect(302, `/compliance/legal-entities`);
}

async function createCorporate(request: Request, fetch: typeof window.fetch) {
    const form = await superValidate(request, zod(createCorporateSchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.POST(
        '/admin/api/v1/compliance/legal-entities',
        {
            fetch: fetch,
            params: {
                header: {
                    'X-Idempotency-Key': uuidv7(),
                },
            },
            body: { ...form.data, entity_type: 'corporate' },
        },
    );

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    message(form, 'Corporate legal entity created successfully!');

    return redirect(302, `/compliance/legal-entities`);
}

async function updateCorporate(request: Request, fetch: typeof window.fetch, id: string) {
    const form = await superValidate(request, zod(updateCorporateSchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.PUT(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}',
        {
            fetch: fetch,
            params: {
                path: {
                    'legal-entity-id': id,
                },
            },
            body: { ...form.data, entity_type: 'corporate' },
        },
    );

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    message(form, 'Corporate legal entity edited successfully!');

    return redirect(302, `/compliance/legal-entities`);
}
