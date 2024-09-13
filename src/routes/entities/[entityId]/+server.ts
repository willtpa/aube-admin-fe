import { apiClient } from '$services/adminapi/api-client';
import { json } from '@sveltejs/kit';
import type { RouteParams } from './$types';

export async function GET(event: { params: RouteParams }): Promise<Response> {
    const entityRes = await apiClient.GET('/admin/api/v1/entities/{entity-id}', {
        params: {
            path: {
                'entity-id': event.params.entityId,
            },
        },
    });

    return json(entityRes.data);
}
