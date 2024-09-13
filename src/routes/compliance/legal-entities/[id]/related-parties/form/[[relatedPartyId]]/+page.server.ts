import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';
import {
    createCorporateRelatedPartySchema,
    createIndividualRelatedPartySchema,
    updateCorporateRelatedPartySchema,
    updateIndividualRelatedPartySchema,
} from './schemas';
import { v7 as uuidv7 } from 'uuid';

export const load: PageServerLoad = async ({ params, fetch }) => {
    if (params.id && params.relatedPartyId) {
        const {
            data,
            error: responseError,
            response,
        } = await apiClient.GET(
            '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties/{related-party-id}',
            {
                fetch: fetch,
                params: {
                    path: {
                        'legal-entity-id': params.id,
                        'related-party-id': params.relatedPartyId,
                    },
                },
            },
        );

        if (responseError) {
            error(response.status, {
                ...responseError,
                message: responseError.detail,
                status: response.status,
            });
        }

        if (data.entity_type === 'individual') {
            return {
                relatedPartyIndividualForm: await superValidate(
                    data,
                    zod(updateIndividualRelatedPartySchema),
                ),
            };
        } else if (data.entity_type === 'corporate') {
            return {
                relatedPartyCorporateForm: await superValidate(
                    {
                        ...data,
                        ownership_structure: data.ownership_structure?.toString(),
                    },
                    zod(updateCorporateRelatedPartySchema),
                ),
            };
        }
    }

    return {
        relatedPartyIndividualForm: await superValidate(zod(createIndividualRelatedPartySchema)),
        relatedPartyCorporateForm: await superValidate(zod(createCorporateRelatedPartySchema)),
    };
};

export const actions: Actions = {
    individual: async ({ params, request, fetch }) => {
        if (params.id && params.relatedPartyId) {
            return await updateRelatedPartyIndividual(
                request,
                fetch,
                params.id,
                params.relatedPartyId,
            );
        }

        return await createRelatedPartyIndividual(request, fetch, params.id);
    },
    corporate: async ({ params, request, fetch }) => {
        if (params.id && params.relatedPartyId) {
            return await updateRelatedPartyCorporate(
                request,
                fetch,
                params.id,
                params.relatedPartyId,
            );
        }

        return await createRelatedPartyCorporate(request, fetch, params.id);
    },
};

async function createRelatedPartyIndividual(
    request: Request,
    fetch: typeof window.fetch,
    legalEntityId: string,
) {
    const form = await superValidate(request, zod(createIndividualRelatedPartySchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.POST(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties',
        {
            fetch: fetch,
            params: {
                header: {
                    'X-Idempotency-Key': uuidv7(),
                },
                path: {
                    'legal-entity-id': legalEntityId,
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

    message(form, 'Individual related party created successfully!');

    return redirect(302, `/compliance/legal-entities/${legalEntityId}`);
}

async function updateRelatedPartyIndividual(
    request: Request,
    fetch: typeof window.fetch,
    legalEntityId: string,
    relatedPartyId: string,
) {
    const form = await superValidate(request, zod(updateIndividualRelatedPartySchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.PUT(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties/{related-party-id}',
        {
            fetch: fetch,
            params: {
                path: {
                    'legal-entity-id': legalEntityId,
                    'related-party-id': relatedPartyId,
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

    message(form, 'Individual related party edited successfully!');

    return redirect(302, `/compliance/legal-entities/${legalEntityId}`);
}

async function createRelatedPartyCorporate(
    request: Request,
    fetch: typeof window.fetch,
    legalEntityId: string,
) {
    const form = await superValidate(request, zod(createCorporateRelatedPartySchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.POST(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties',
        {
            fetch: fetch,
            params: {
                header: {
                    'X-Idempotency-Key': uuidv7(),
                },
                path: {
                    'legal-entity-id': legalEntityId,
                },
            },
            body: {
                ...form.data,
                entity_type: 'corporate',
                ownership_structure: parseInt(form.data.ownership_structure),
            },
        },
    );

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    message(form, 'Corporate related party created successfully!');

    return redirect(302, `/compliance/legal-entities/${legalEntityId}`);
}

async function updateRelatedPartyCorporate(
    request: Request,
    fetch: typeof window.fetch,
    legalEntityId: string,
    relatedPartyId: string,
) {
    const form = await superValidate(request, zod(updateCorporateRelatedPartySchema));

    if (!form.valid) {
        return fail(400, { form });
    }

    const { error: responseError, response } = await apiClient.PUT(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties/{related-party-id}',
        {
            fetch: fetch,
            params: {
                path: {
                    'legal-entity-id': legalEntityId,
                    'related-party-id': relatedPartyId,
                },
            },
            body: {
                ...form.data,
                entity_type: 'corporate',
                ownership_structure: parseInt(form.data.ownership_structure),
            },
        },
    );

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    message(form, 'Corporate related party edited successfully!');

    return redirect(302, `/compliance/legal-entities/${legalEntityId}`);
}
