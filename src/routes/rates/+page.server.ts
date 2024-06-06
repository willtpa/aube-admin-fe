import type { PageServerLoad } from './$types';
import { handleRequestError } from '$utils/http';
import { getRates } from '$services/currency-rate';
import type { CurrencyTypeFilter } from '$services/currency-rate.d';

export const load: PageServerLoad = async ({ url }) => {
    try {
        const currencyRates = await getRates();
        const query = new URLSearchParams(url.search);
        let currencyType = query.get('currencyType') ?? 'all';

        currencyType = ['all', 'crypto', 'fiat'].includes(currencyType) ? currencyType : 'all';

        return {
            currencyType: currencyType as CurrencyTypeFilter,
            currencyRates,
        };
    } catch (err) {
        handleRequestError(err);
    }
};
