import type { PageServerLoad } from './$types.js';
import { apiClient } from '$services/adminapi/api-client';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
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

    const {
        data: relatedPartiesData,
        error: relatedPartiesError,
        response: relatedPartyResponse,
    } = await apiClient.GET(
        '/admin/api/v1/compliance/legal-entities/{legal-entity-id}/related-parties',
        {
            fetch: fetch,
            params: {
                path: {
                    'legal-entity-id': params.id,
                },
            },
        },
    );

    if (relatedPartiesError) {
        error(relatedPartyResponse.status, {
            ...relatedPartiesError,
            message: relatedPartiesError.detail,
            status: relatedPartyResponse.status,
        });
    }

    return {
        legalEntity: data,
        relatedPartieResponse: relatedPartiesData,
    };
};
