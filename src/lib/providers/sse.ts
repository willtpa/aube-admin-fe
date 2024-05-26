import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const initFxRatesSubscription = () => {
	const sseCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/v1/admin/api/rates/sse?stream=fxrates`;

	const sse = new EventSourcePolyfill(`${sseCurrencyRatesURL}`);

	return sse;
};
