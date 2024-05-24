import { PUBLIC_ADMINAPI_HOST, PUBLIC_ADMINAPI_PREFIX } from '$env/static/public';
import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET() {
	const restfulCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/${PUBLIC_ADMINAPI_PREFIX}/rates`;
	const headers = {
		'CF-Access-Client-Id': `${CF_ACCESS_CLIENT_ID}`,
		'CF-Access-Client-Secret': `${CF_ACCESS_CLIENT_SECRET}`,
	};
	const result = await fetch(`${restfulCurrencyRatesURL}`, { headers });
	if (!result.ok) {
		throw new Error(`HTTP error! status: ${result.status}`);
	}

	const rates = await result.json();

	return json({ rates });
}
