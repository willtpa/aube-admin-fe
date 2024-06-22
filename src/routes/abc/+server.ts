import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const sseCurrencyRatesURL = `https://63744728716c2e191659ae70.mockapi.io/v1/willtest/test1`;

    const result = await fetch(sseCurrencyRatesURL);

    if (!result.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch SSE' }), {
            status: result.status,
        });
    }

    return new Response(result.body, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
