import type { PageServerLoad } from './$types';
import { handleRequestError } from '$utils/http';
import { getRates } from '$services/currency-rate';
import { CurrencyTypeFilter } from '$utils/enum';
import { isEnumType } from '$utils/common';
import type { CurrencyCodeToMedianFxRateV1Map } from '$services/currency-rate';

export const load: PageServerLoad = async ({ url }) => {
    try {
        console.log('GET: RequestHandler is called........ ');
        // const currencyRates = await getRates();
        const getRatesURL = `https://adminapi-stg.triple-a.rocks/v1/admin/api/rates`;
        const headers = {
            'CF-Access-Client-Id': '4438507a04cd88506072a317f51607cd.access',
            'CF-Access-Client-Secret':
                'f149af90c347dbd22e4fa71c63eb9ae7aad06dc7237dfc9b0b91caa459f6a2ac',
        };
        const currencyRatesResult = await fetch(getRatesURL, { headers });
        const currencyRates = currencyRatesResult.body;
        currencyRatesResult
            .json()
            .then((data) => {
                console.log('GET: RequestHandler is called........ data: ', JSON.stringify(data));
            })
            .catch((err) => {
                console.error('GET: RequestHandler is called........ error: ', err);
            });

        console.log(
            'GET: RequestHandler is called........ currencyRates: ',
            JSON.stringify(currencyRates),
        );

        const query = new URLSearchParams(url.search);
        const param = query.get('currencyType');
        const currencyType = isEnumType(param, CurrencyTypeFilter) ? param : CurrencyTypeFilter.All;

        console.log('GET: RequestHandler is called........ currencyType: ', currencyType);

        return {
            currencyType,
            currencyRates,
        };
    } catch (err) {
        console.error('GET: RequestHandler is called........ error: ', err);

        handleRequestError(err);
    }
};
