import type { PageServerLoad } from './$types';
import { handleRequestError } from '$utils/http';
import { getRates } from '$services/currency-rate';
import { type CurrencyCodeToMedianFxRateV1Map } from '$lib/services/currency-rate.d';

export const load: PageServerLoad = async () => {
    try {
        const currencyRates: CurrencyCodeToMedianFxRateV1Map = await getRates();

        return {
            currencyRates,
        };
    } catch (err) {
        handleRequestError(err);
    }
};
