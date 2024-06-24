import type { PageServerLoad } from './$types';
import { handleRequestError } from '$utils/http';
import { getRates } from '$services/currency-rate';
import { CurrencyTypeFilter } from '$utils/enum';
import { isEnumType } from '$utils/common';

export const load: PageServerLoad = async ({ url }) => {
    try {
        const currencyRates = await getRates();
        const query = new URLSearchParams(url.search);
        const param = query.get('currencyType');
        const currencyType = isEnumType(param, CurrencyTypeFilter) ? param : CurrencyTypeFilter.All;

        return {
            currencyType,
            currencyRates,
        };
    } catch (err) {
        handleRequestError(err);
    }
};
