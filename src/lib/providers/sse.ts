import {
	PUBLIC_ADMINAPI_HOST,
	PUBLIC_ADMINAPI_PREFIX,
	PUBLIC_RATES_SSE_PREFIX,
} from '$env/static/public';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const initFxRatesSubscription = () => {
	const sseCurrencyRatesURL = `${PUBLIC_ADMINAPI_HOST}/${PUBLIC_ADMINAPI_PREFIX}/${PUBLIC_RATES_SSE_PREFIX}?stream=fxrates`;
	const sse = new EventSourcePolyfill(`${sseCurrencyRatesURL}`);

	return sse;
};
