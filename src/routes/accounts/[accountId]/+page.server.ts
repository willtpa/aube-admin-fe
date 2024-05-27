import { handleRequestError } from '$utils/http';
import { getAccountDetail } from '$services/ledger';
import type { PageServerLoad } from './$types';

interface DatetimeParams {
	stringValue: string;
	isoValue: string;
}

function parseDatetime(dateStr: string | null): DatetimeParams {
	const date = new Date(dateStr || '');

	if (isNaN(date.getTime())) {
		return { stringValue: '', isoValue: '' };
	}

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');

	return {
		stringValue: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
		isoValue: date.toISOString(),
	};
}

export const load: PageServerLoad = async ({ params, url }) => {
	try {
		const query = new URLSearchParams(url.search);
		const networkCurrencyId = query.get('networkCurrencyId');
		const fromDate = parseDatetime(query.get('fromDate'));
		const toDate = parseDatetime(query.get('toDate'));

		const response = await getAccountDetail(
			params.accountId,
			networkCurrencyId,
			fromDate.isoValue,
			toDate.isoValue,
		);

		const detail = {
			...response,
			transactions: response.transactions.map((tx) => ({
				...tx,
				fromAccountURL:
					tx.fromAccountID === params.accountId
						? null
						: `/accounts/${tx.fromAccountID}${url.search}`,
				toAccountURL:
					tx.toAccountID === params.accountId ? null : `/accounts/${tx.toAccountID}${url.search}`,
			})),
		};

		return {
			detail,
			networkCurrencyId,
			fromDate: fromDate.stringValue,
			toDate: toDate.stringValue,
		};
	} catch (err) {
		handleRequestError(err);
	}
};
