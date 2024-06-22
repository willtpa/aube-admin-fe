import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = async () => {
    console.log('GET SSE: RequestHandler is called........ ');
    const sseCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/v1/admin/api/rates/sse?stream=fxrates`;

    console.log(
        'GET SSE: RequestHandler is called........ sseCurrencyRatesURL: ',
        sseCurrencyRatesURL,
    );
    const headers = {
        'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
    };

    const result = await fetch(sseCurrencyRatesURL, { headers });

    console.log('GET SSE: RequestHandler is called........ result: ', JSON.stringify(result.body));

    if (!result.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch SSE' }), {
            status: result.status,
        });
    }

    return new Response(result.body, {
        headers: {
            'Content-Type': 'text/event-stream',
        },
    });
};
