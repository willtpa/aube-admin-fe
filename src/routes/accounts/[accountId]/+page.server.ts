import { handleRequestError } from '$utils/http';
import { getAccountBalances } from '$services/adminapi/ledger';
import type { PageServerLoad } from './$types';

interface DatetimeParams {
    stringValue: string;
    isoValue: string;
}

function parseDatetime(dateStr: string | null): DatetimeParams {
    const date = new Date(dateStr ?? '');
    const two = 2;

    if (isNaN(date.getTime())) {
        return { stringValue: '', isoValue: '' };
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(two, '0');
    const day = date.getDate().toString().padStart(two, '0');
    const hours = date.getHours().toString().padStart(two, '0');
    const minutes = date.getMinutes().toString().padStart(two, '0');
    const seconds = date.getSeconds().toString().padStart(two, '0');

    return {
        stringValue: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
        isoValue: date.toISOString(),
    };
}

export const load: PageServerLoad = async ({ params, url }) => {
    try {
        const query = new URLSearchParams(url.search);
        const fromDate = parseDatetime(query.get('fromDate'));
        const toDate = parseDatetime(query.get('toDate'));

        const balanceResp = await getAccountBalances(params.accountId);

        const detail = {
            balance: balanceResp,
        };

        return {
            detail,
            fromDate: fromDate.stringValue,
            toDate: toDate.stringValue,
        };
    } catch (err) {
        return handleRequestError(err);
    }
};
