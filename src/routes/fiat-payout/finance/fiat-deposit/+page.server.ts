import type { PageServerLoad } from './$types.js';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

// services
import { getDeposits } from '$services/fiat-payout/deposit.server';
import { getMerchants } from '$services/fiat-payout/merchant.server';
import { type Merchant } from '$services/fiat-payout/merchant';
import {
    DepositFilterSchema,
    type Deposit,
    DepositStatus,
    BankAccount,
    SortValues,
    OrderValues,
} from '$services/fiat-payout/deposit';

// utils
import { handleRequestError } from '$utils/http';
import { DEPOSIT_PER_PAGE, MERCHANT_PER_PAGE } from '$utils/constant';

export const load: PageServerLoad = async ({ url }) => {
    let deposits: Deposit[] = [];
    let depositCount = 0;
    let merchants: Merchant[] = [];
    let merchantCount = 0;

    // filter values from URL
    const { page, status, bankAccount, fromDate, toDate, sort, order } = getURLParams(url);

    try {
        let formatSortedValue = '';
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (sort && order) {
            formatSortedValue = formatSortedByInput(sort, order);
        }
        const depositResult = await getDeposits(
            Number(page),
            DEPOSIT_PER_PAGE,
            status,
            bankAccount,
            fromDate,
            toDate,
            formatSortedValue,
        );
        deposits = depositResult.deposits;
        depositCount = depositResult.count;
    } catch (err) {
        handleRequestError(err);
    }

    try {
        let pageNumber = 1;
        let response = await getMerchants(pageNumber, MERCHANT_PER_PAGE);
        merchantCount = response.count;

        do {
            response = await getMerchants(pageNumber, MERCHANT_PER_PAGE);
            merchants = [...merchants, ...response.merchants];
            pageNumber++;
        } while (merchants.length < merchantCount);
    } catch (error) {
        handleRequestError(error);
    }

    return {
        deposits,
        depositCount,
        merchants,
        merchantCount,
        form: await superValidate(zod(DepositFilterSchema), {
            defaults: {
                page,
                status,
                bankAccount,
                fromDate,
                toDate,
                sort,
                order,
            },
        }),
    };
};

function getURLParams(url: URL) {
    return {
        page: url.searchParams.get('page') ?? '1',
        status: (url.searchParams.get('status') ?? '') as DepositStatus,
        bankAccount: (url.searchParams.get('bankAccount') ?? '') as BankAccount,
        fromDate: url.searchParams.get('fromDate') ?? '',
        toDate: url.searchParams.get('toDate') ?? '',
        sort: (url.searchParams.get('sort') ?? '') as SortValues,
        order: (url.searchParams.get('order') ?? '') as OrderValues,
    };
}

function formatSortedByInput(sortValue: string, orderValue: string): string {
    return `${sortValue}_${orderValue}`;
}
