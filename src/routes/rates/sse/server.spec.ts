import { describe, test, vi } from 'vitest';
import { GET } from './+server';
import type { RequestEvent } from '../$types';

describe('GET handler of rates/sse', () => {
    test('it should return response with SSE content type', async ({ expect }) => {
        const mockStreamValue =
            'data: {"id":"018fdc42-8159-7c67-9254-7fc3ff497e7c","version":1,"providers_contrib":{"coinbase":87},"rates_count":87,"outliers_perc":0,"created_at":"2024-06-03T04:01:37.106821404Z","base":"ETH","quote":"USD","rate_base_quote":"3799.25","rate_base_usd":"3799.25","rate_usd_quote":"0.0002632098440482"}\n\n';
        const spyFetch = vi.spyOn(global, 'fetch');
        spyFetch.mockResolvedValue(
            new Response(mockStreamValue, {
                status: 200,
                headers: { 'Content-Type': 'text/event-stream' },
            }),
        );

        const mockRequestEvent = {} as RequestEvent;
        const response = await GET(mockRequestEvent);
        const statusSuccess = 200;

        expect(response.status).toBe(statusSuccess);
        expect(response.headers.get('Content-Type')).toBe('text/event-stream');
        expect(await response.text()).toBe(mockStreamValue);
    });

    test('it should have proper security headers', async ({ expect }) => {
        const mockStreamValue =
            'data: {"id":"018fdc42-8159-7c67-9254-7fc3ff497e7c","version":1,"providers_contrib":{"coinbase":87},"rates_count":87,"outliers_perc":0,"created_at":"2024-06-03T04:01:37.106821404Z","base":"ETH","quote":"USD","rate_base_quote":"3799.25","rate_base_usd":"3799.25","rate_usd_quote":"0.0002632098440482"}\n\n';
        const spyFetch = vi.spyOn(global, 'fetch');
        spyFetch.mockResolvedValue(
            new Response(mockStreamValue, {
                status: 200,
                headers: { 'Content-Type': 'text/event-stream' },
            }),
        );

        const mockRequestEvent = {} as RequestEvent;
        await GET(mockRequestEvent);
        const [, { headers }] = spyFetch.mock.calls[0] as [string, { headers: Headers }];

        expect(headers).toHaveProperty('CF-Access-Client-Id');
        expect(headers).toHaveProperty('CF-Access-Client-Secret');
    });

    test('it should return response with error message if fetch fails', async ({ expect }) => {
        const spyFetch = vi.spyOn(global, 'fetch');
        spyFetch.mockResolvedValue(new Response(null, { status: 500 }));

        const mockRequestEvent = {} as RequestEvent;
        const response = await GET(mockRequestEvent);
        const statusError = 500;

        expect(response.status).toBe(statusError);
        expect(await response.json()).toEqual({ error: 'Failed to fetch SSE' });
    });
});
