import { Requestor } from '$utils/http';
import { type CurrencyCodeToMedianFxRateV1Map } from '$lib/services/currency-rate.d';

const requestor = new Requestor(process.env.PUBLIC_ADMINAPI_HOST || '');

export async function getRates(): Promise<CurrencyCodeToMedianFxRateV1Map> {
	// set headers for cloudflare access
	const headers = {
		'CF-Access-Client-Id': process.env.CF_ACCESS_CLIENT_ID || '',
		'CF-Access-Client-Secret': process.env.CF_ACCESS_CLIENT_SECRET || '',
	};

	return requestor.get<CurrencyCodeToMedianFxRateV1Map>('/v1/admin/api/rates', { headers });
}
