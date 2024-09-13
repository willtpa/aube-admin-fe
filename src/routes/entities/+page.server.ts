import type { PageServerLoad } from './$types';
import { apiClient } from '$services/adminapi/api-client';
import { APIError } from '$lib/openapi/error';

export const load: PageServerLoad = async () => {
    const { data, error, response } = await apiClient.GET('/admin/api/v1/entities', {});

    if (error != null) {
        throw new APIError(response.status, error);
    }

    return {
        entities: data,
    };
};
