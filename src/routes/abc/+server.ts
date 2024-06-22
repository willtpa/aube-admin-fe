import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    console.log('GET: RequestHandler is called........ ');
    const sseCurrencyRatesURL = `https://63744728716c2e191659ae70.mockapi.io/v1/willtest/test1`;

    console.log('GET: RequestHandler is called........ sseCurrencyRatesURL: ', sseCurrencyRatesURL);

    const result = await fetch(sseCurrencyRatesURL);

    console.log('GET: RequestHandler is called........ result: ', JSON.stringify(result));

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

    // return new Response(
    //     JSON.stringify([{ name: 'Helloworld', data: `sampledata Hello - ${new Date()}` }]),
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     },
    // );
};
