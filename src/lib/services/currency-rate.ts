import { PUBLIC_ADMINAPI_HOST } from '$env/static/public';
import {
    CF_ACCESS_CLIENT_ID,
    CF_ACCESS_CLIENT_SECRET,
    USER_EMAIL,
    USER_PW,
} from '$env/static/private';
import { Requestor } from '$utils/http';
import { type CurrencyCodeToMedianFxRateV1Map } from '$services/currency-rate.d';

const requestor = new Requestor(PUBLIC_ADMINAPI_HOST);

export async function getRates(): Promise<CurrencyCodeToMedianFxRateV1Map> {
    // set headers for cloudflare access
    const headers = {
        'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
    };

    console.log('TEST.USER_EMAIL........ ', USER_EMAIL);
    console.log('TEST.USER_PW........ ', USER_PW);

    return requestor.get<CurrencyCodeToMedianFxRateV1Map>('/v1/admin/api/rates', { headers });
}
