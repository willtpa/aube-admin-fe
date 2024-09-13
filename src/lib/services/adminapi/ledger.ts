import { error } from '@sveltejs/kit';
import type { components, operations } from '$lib/openapi/adminapi.schema';
import type { APIResponse } from '$lib/openapi/types';
import { apiClient } from '$services/adminapi/api-client';

export async function getAccountBalances(accountId: string) {
    const {
        data,
        error: responseError,
        response,
    } = await apiClient.GET(`/admin/api/v1/accounts/{account-id}/balances`, {
        params: { path: { 'account-id': accountId } },
    });

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    return data as APIResponse<components['schemas']['Balance']>;
}

export async function getAccounts(
    filters: operations['get-admin-api-v1-accounts']['parameters']['query'],
) {
    filters = filters ?? {};
    const {
        data,
        error: responseError,
        response,
    } = await apiClient.GET(`/admin/api/v1/accounts`, {
        params: { query: filters },
    });

    if (responseError) {
        error(response.status, {
            ...responseError,
            message: responseError.detail,
            status: response.status,
        });
    }

    return data as APIResponse<
        components['responses']['account-list']['content']['application/json']
    >;
}
