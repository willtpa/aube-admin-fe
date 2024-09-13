import type { Actions } from './$types.js';
import { apiClient } from '$services/adminapi/api-client';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    delete: async ({ params, request, fetch }) => {
        const data = await request.formData();
        const id = data.get('id');
        const redirectPath = data.get('redirectPath');

        if (!id) {
            return fail(400, { error: 'No legal entity related party ID provided' });
        }

        const { error: responseError, response } = await apiClient.DELETE(
            '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties/{related-party-id}',
            {
                params: {
                    path: {
                        'legal-entity-id': params.id,
                        'related-party-id': id.toString(),
                    },
                },
                fetch,
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
            return fail(400, { error: 'No legal entity related party ID provided' });
        }

        console.log('Screening legal entity related party with ID:', id);

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
