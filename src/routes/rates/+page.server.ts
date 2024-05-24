import type { PageServerLoad } from './$types';
import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const response = await initRatesSnapshot();

	return {
		supportedCurrency: response.supportedCurrency,
	};
};

const initRatesSnapshot = async () => {
	const restfulCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/admin/api/rates`;
	const headers = {
		'CF-Access-Client-Id': `${CF_ACCESS_CLIENT_ID}`,
		'CF-Access-Client-Secret': `${CF_ACCESS_CLIENT_SECRET}`,
	};

	const response = await fetch(restfulCurrencyRatesURL, { headers });
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const supportedCurrency = await response.json();

	return {
		supportedCurrency,
	};
};
