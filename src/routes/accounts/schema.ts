import type { components } from '$lib/openapi/adminapi.schema';

export type AccountLocality = components['schemas']['AccountLocality'];
export const accountLocality = {
    internal: 'internal',
    external: 'external',
};
