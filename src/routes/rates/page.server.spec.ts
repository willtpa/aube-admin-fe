import type { CurrencyCodeToMedianFxRateV1Map } from '$services/currency-rate.d';
import * as rateService from '$services/currency-rate';
import { afterAll, beforeAll, describe, expect, test, vi, type MockInstance } from 'vitest';
import Decimal from 'decimal.js';
import { load } from './+page.server';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { RouteParams } from '../$types';
import type { PageData } from './$types';
import type { CurrencyTypeFilter } from '$utils/enum';

let baseURL: string;
let mockGetRates: MockInstance;

beforeAll(async () => {
    baseURL = 'https://example.com/rates';
    const mockGetRatesValue = {
        BTC: {
            id: '018fe2aa-ac22-7aec-9771-28c9462b32a2',
            version: 1,
            providers_contrib: { coinbase: new Decimal('168') },
            rates_count: 168,
            outliers_perc: 0,
            created_at: new Date('2024-06-04T09:53:07.106035417Z'),
            base: 'BTC',
            quote: 'USD',
            rate_base_quote: new Decimal('68555'),
            rate_base_usd: new Decimal('68555'),
            rate_usd_quote: new Decimal('0.0000145868280942'),
        },
    } as CurrencyCodeToMedianFxRateV1Map;
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
            const currencyType = result.currencyType as CurrencyTypeFilter;
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
            const currencyType = result.currencyType as CurrencyTypeFilter;
            expect(['all', 'crypto', 'fiat']).toContain(currencyType);
        },
    );
});
