import type { FullConfig } from '@playwright/test';
import { config as getEnv } from 'dotenv';

async function globalSetup(_: FullConfig): Promise<void> {
    getEnv();
    process.env['PUBLIC_ADMINAPI_HOST'] = process.env['PUBLIC_ADMINAPI_HOST'] ?? '';
    process.env['PUBLIC_ADMINAPI_PREFIX'] = 'v1/admin/api';
    process.env['PUBLIC_RATES_SSE_PREFIX'] = 'rates/sse';
    process.env['CF_ACCESS_CLIENT_ID'] = process.env['CF_ACCESS_CLIENT_ID'] ?? 'test-client-id';
    process.env['CF_ACCESS_CLIENT_SECRET'] =
        process.env['CF_ACCESS_CLIENT_SECRET'] ?? 'test-client-secret';
}

export default globalSetup;
