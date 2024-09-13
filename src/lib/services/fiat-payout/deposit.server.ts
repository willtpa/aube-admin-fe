import { type DepositResponse, type Deposit } from '$services/fiat-payout/deposit';
import { PUBLIC_FIATPAYOUTAPI_HOST } from '$env/static/public';
import { Requestor } from '$utils/http';
import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from '$env/static/private';

const requestor = new Requestor(PUBLIC_FIATPAYOUTAPI_HOST);
// const blobRequestor = new BlobRequestor(PUBLIC_FIATPAYOUTAPI_HOST);

export async function getDeposits(
    page?: number | null,
    per_page?: number | null,
    status?: string | null,
    bank_account?: string | null,
    from_deposit_date?: string | null,
    to_deposit_date?: string | null,
    sort?: string | null,
): Promise<DepositResponse> {
    return requestor.get<DepositResponse>('/api/fiat-payout/v1/backoffice/deposits', {
        query: { page, per_page, status, bank_account, from_deposit_date, to_deposit_date, sort },
        headers: {
            'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
            'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
        },
    });
}

export async function assignDeposit(merchant_id: number, deposit_id: string): Promise<Deposit> {
    return requestor.post<Deposit>('/api/fiat-payout/v1/backoffice/deposits/assign', {
        body: { merchant_id, deposit_id },
        headers: {
            'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
            'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
        },
    });
}

export async function getDepositCSV(
    status?: string | null,
    bank_account?: string | null,
    from_deposit_date?: string | null,
    to_deposit_date?: string | null,
): Promise<Blob> {
    return requestor.get<Blob>('/api/fiat-payout/v1/backoffice/deposits/export', {
        query: { status, bank_account, from_deposit_date, to_deposit_date },
        headers: {
            'Content-Type': 'application/csv',
            'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
            'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
        },
    });
}
