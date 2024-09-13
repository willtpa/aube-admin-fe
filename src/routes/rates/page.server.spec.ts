import * as rateService from '$services/adminapi/currency-rate';
import { afterAll, beforeAll, describe, expect, test, vi, type MockInstance } from 'vitest';
import { load } from './+page.server';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageData, RouteParams } from './$types';
import type { components } from '$lib/openapi/adminapi.schema';
import type { APIResponse } from '$lib/openapi/types';

let baseURL: string;
let mockGetRates: MockInstance;

beforeAll(async () => {
    baseURL = 'https://example.com/rates';
    const mockGetRatesValue = {
        BTC: {
            id: '018fe2aa-ac22-7aec-9771-28c9462b32a2',
            version: 1,
            providers_contrib: { coinbase: 123 },
            rates_count: 168,
            outliers_perc: 0,
            created_at: '2024-06-04T09:53:07.106035417Z',
            providers_medians: { coinbase: '314' },
            rate: {
                rate_base_quote: '68555',
                rate_base_usd: '68555',
                rate_usd_quote: '0.0000145868280942',
                pair: {
                    quote: 'USD',
                    base: 'BTC',
                },
            },
        },
    } as Record<string, APIResponse<components['schemas']['MedianFxRateV1']>>;
    mockGetRates = vi.spyOn(rateService, 'getRates');
    mockGetRates.mockResolvedValue(mockGetRatesValue);
});

afterAll(() => {
    mockGetRates.mockRestore();
});

describe('load handler of rates page', () => {
    test('it should return currency rates & types', async ({ expect }) => {
        const mockLoadEvent = {
            url: new URL(`${baseURL}`),
        } as ServerLoadEvent<RouteParams, object, '/rates'>;
        const result = await load(mockLoadEvent);
        expect(result).toHaveProperty('currencyType');
        expect(result).toHaveProperty('currencyRates');
    });

    test.each(['', 'random=123', 'currencyType=invalid'])(
        `it should return default value "all" when no or invalid query params "currencyType" is provided. Query params: %s`,
        async (qParams) => {
            const mockLoadEvent = {
                url: new URL(`${baseURL}?${qParams}`),
            } as ServerLoadEvent<RouteParams, object, '/rates'>;
            const result = (await load(mockLoadEvent)) as PageData;
            const currencyType = result.currencyType;
            expect(currencyType).toBe('all');
        },
    );

    test.each(['currencyType=all', 'currencyType=crypto', 'currencyType=fiat'])(
        'it should return "all"|"crypto"|"fiat" when valid query params "currencyType" is provided. Query params: %s',
        async (qParams) => {
            const mockLoadEvent = {
                url: new URL(`${baseURL}?${qParams}`),
            } as ServerLoadEvent<RouteParams, object, '/rates'>;
            const result = (await load(mockLoadEvent)) as PageData;
            const currencyType = result.currencyType;
            expect(['all', 'crypto', 'fiat']).toContain(currencyType);
        },
    );
});
