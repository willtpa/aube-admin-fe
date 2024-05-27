import type { PageServerLoad } from './$types';
import { handleRequestError } from '$utils/http';
import { getRates } from '$services/currency-rate';

export const load: PageServerLoad = async () => {
    try {
        const currencyRates = await getRates();

        return {
            currencyRates,
        };
    } catch (err) {
        handleRequestError(err);
    }
};
