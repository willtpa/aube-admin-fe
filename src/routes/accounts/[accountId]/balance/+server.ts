import { apiClient } from '$services/adminapi/api-client';
import { json } from '@sveltejs/kit';
import type { RouteParams } from './$types';

export async function GET(event: { params: RouteParams }): Promise<Response> {
    const res = await apiClient.GET('/admin/api/v1/accounts/{account-id}/balances', {
        params: {
            path: {
                'account-id': event.params.accountId,
            },
        },
    });

    return json(res.data);
}
