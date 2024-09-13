import createClient from 'openapi-fetch';
import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import type { paths } from '$lib/openapi/adminapi.schema';
import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from '$env/static/private';

export const apiClient = createClient<paths>({
    baseUrl: PUBLIC_ADMINAPI_HOST,
    headers: {
        'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
    },
});
