import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import { PUBLIC_CF_ACCESS_CLIENT_ID, PUBLIC_CF_ACCESS_CLIENT_SECRET } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET() {
	const restfulCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/v1/admin/api/rates`;
	const headers = {
		'CF-Access-Client-Id': `${PUBLIC_CF_ACCESS_CLIENT_ID}`,
		'CF-Access-Client-Secret': `${PUBLIC_CF_ACCESS_CLIENT_SECRET}`,
	};
	const result = await fetch(`${restfulCurrencyRatesURL}`, { headers });
	if (!result.ok) {
		throw new Error(`HTTP error! status: ${result.status}`);
	}

	const rates = await result.json();

	return json({ rates });
}
