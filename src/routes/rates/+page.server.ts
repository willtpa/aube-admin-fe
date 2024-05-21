import { readFile } from '$utils/common';
import type { PageServerLoad } from './$types';
import {
	PUBLIC_ADMINAPI_HOST,
	PUBLIC_ADMINAPI_PREFIX,
	PUBLIC_RATES_SSE_PREFIX,
} from '$env/static/public';

export const load: PageServerLoad = async ({ url }) => {
	const baseUrl = `${url.origin}`;
	const data = await readFile(`${baseUrl}/supported-currencies.json`);
	const sseCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/${PUBLIC_ADMINAPI_PREFIX}/${PUBLIC_RATES_SSE_PREFIX}?stream=fxrates`;
	const supportedCurrency = data.reduce((acc: Record<string, unknown>, curr: string) => {
		acc[curr] = null;
		return acc;
	}, {});

	return {
		sseCurrencyRatesURL,
		supportedCurrency,
	};
};
