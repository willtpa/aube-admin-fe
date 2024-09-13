import { handleRequestError } from '$utils/http';
import { getAccounts } from '$services/adminapi/ledger';
import type { PageServerLoad } from './$types';
import { type AccountLocality } from './schema';

export const load: PageServerLoad = async ({ url }) => {
    try {
        const query = new URLSearchParams(url.search);
        const accountLocalityQuery = query.get('accountLocality');

        const { data } = await getAccounts({
            account_locality: accountLocalityQuery as AccountLocality,
        });

        return {
            data,
            accountLocality: accountLocalityQuery,
        };
    } catch (err) {
        handleRequestError(err);
    }

    return {
        data: [],
        accountLocality: '',
    };
};
