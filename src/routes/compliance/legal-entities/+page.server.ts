import type { Actions, PageServerLoad } from './$types.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { apiClient } from '$services/adminapi/api-client';

export const load: PageServerLoad = async ({ fetch, params: _ }) => {
    const {
        data,
        error: responseError,
        response,
    } = await apiClient.GET('/admin/api/v1/compliance/legal-entities', {
        fetch: fetch,
        params: {
            query: {}, // todo: add query params from params
        },
    });

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    return {
        legalEntitiesResponse: data,
    };
};

export const actions: Actions = {
    delete: async ({ request, fetch }) => {
        const data = await request.formData();
        const id = data.get('id');
        const redirectPath = data.get('redirectPath');

        if (!id) {
            return fail(400, { error: 'No legal entity ID provided' });
        }

        const { error: responseError, response } = await apiClient.DELETE(
            '/admin/api/v1/compliance/legal-entities/{legal-entity-id}',
            {
                fetch: fetch,
                params: {
                    path: {
                        'legal-entity-id': id.toString(),
                    },
                },
            },
        );

        if (responseError) {
            return fail(response.status, { responseError });
        }

        if (redirectPath) {
            return redirect(302, redirectPath.toString());
        }

        return;
    },
    screen: async ({ request, fetch: _ }) => {
        const data = await request.formData();
        const id = data.get('id');

        if (!id) {
            return fail(400, { error: 'No legal entity ID provided' });
        }

        console.log('Screening legal entity with ID:', id);

        // const { error: responseError, response } = await apiClient.DELETE(
        //     '/admin/api/v1/compliance/legal-entities/{legal-entity-id}',
        //     {
        //         fetch: fetch,
        //         params: {
        //             path: {
        //                 'legal-entity-id': id.toString(),
        //             },
        //         },
        //     },
        // );
        //
        // if (responseError) {
        //     return fail(response.status, { responseError });
        // }

        return;
    },
};
