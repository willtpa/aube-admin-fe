import type { FullConfig } from '@playwright/test';

async function globalTeardown(_: FullConfig): Promise<void> {
    delete process.env['PUBLIC_ADMINAPI_HOST'];
    delete process.env['PUBLIC_ADMINAPI_PREFIX'];
    delete process.env['PUBLIC_RATES_SSE_PREFIX'];
    delete process.env['CF_ACCESS_CLIENT_ID'];
    delete process.env['CF_ACCESS_CLIENT_SECRET'];
}

export default globalTeardown;
