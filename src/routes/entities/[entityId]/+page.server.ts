import type { PageServerLoad } from './$types';
import { apiClient } from '$services/adminapi/api-client';
import { APIError } from '$lib/openapi/error';

export const load: PageServerLoad = async ({ params }) => {
    const entityRes = await apiClient.GET('/admin/api/v1/entities/{entity-id}', {
        params: {
            path: {
                'entity-id': params.entityId,
            },
        },
    });

    if (entityRes.error != null) {
        throw new APIError(entityRes.response.status, entityRes.error);
    }

    const accountRes = await apiClient.GET('/admin/api/v1/entities/{entity-id}/accounts', {
        params: {
            path: {
                'entity-id': params.entityId,
            },
        },
    });

    if (accountRes.error != null) {
        throw new APIError(accountRes.response.status, accountRes.error);
    }

    return {
        entity: entityRes.data,
        accounts: accountRes.data,
    };
};
