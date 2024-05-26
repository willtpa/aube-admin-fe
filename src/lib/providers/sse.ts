import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { PUBLIC_CF_ACCESS_CLIENT_ID, PUBLIC_CF_ACCESS_CLIENT_SECRET } from '$env/static/public';

export const initFxRatesSubscription = () => {
	const sseCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/v1/admin/api/rates/sse?stream=fxrates`;
	// set headers for cloudflare access
	const headers = {
		'CF-Access-Client-Id': PUBLIC_CF_ACCESS_CLIENT_ID,
		'CF-Access-Client-Secret': PUBLIC_CF_ACCESS_CLIENT_SECRET,
	};

	const sse = new EventSourcePolyfill(`${sseCurrencyRatesURL}`, { headers });

	return sse;
};
