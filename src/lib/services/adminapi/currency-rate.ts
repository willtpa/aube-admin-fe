import { apiClient } from '$services/adminapi/api-client';
import { error } from '@sveltejs/kit';
import type { APIResponse } from '$lib/openapi/types';
import type { components } from '$lib/openapi/adminapi.schema';

export async function getRates() {
    const { data, error: responseError, response } = await apiClient.GET('/admin/api/v1/rates');

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    return data as APIResponse<components['schemas']['Rates']>;
}
