import type { PageServerLoad } from './$types.js';
// import { apiClient } from '$services/adminapi/api-client';
// import { error } from '@sveltejs/kit';

// export const load: PageServerLoad = async ({ params, fetch }) => {
export const load: PageServerLoad = async () => {
    // const {
    //     data,
    //     error: responseError,
    //     response,
    // } = await apiClient.GET(
    //     '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties/{related-party-id}',
    //     {
    //         params: {
    //             path: {
    //                 'legal-entity-id': params.id,
    //                 'related-party-id': params.relatedPartyId,
    //             },
    //         },
    //         fetch,
    //     },
    // );
    //
    // if (responseError) {
    //     error(response.status, {
    //         ...responseError,
    //         message: responseError.detail,
    //         status: response.status,
    //     });
    // }

    return {
        screening: {},
    };
};
