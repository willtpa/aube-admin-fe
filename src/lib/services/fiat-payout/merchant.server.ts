import { type MerchantResponse } from '$services/fiat-payout/merchant';
import { PUBLIC_FIATPAYOUTAPI_HOST } from '$env/static/public';
import { Requestor } from '$utils/http';
import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from '$env/static/private';

const requestor = new Requestor(PUBLIC_FIATPAYOUTAPI_HOST);

export async function getMerchants(
    page?: number | null,
    per_page?: number | null,
): Promise<MerchantResponse> {
    return requestor.get<MerchantResponse>('/api/fiat-payout/v1/backoffice/merchants', {
        query: { page, per_page },
        headers: {
            'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
            'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET,
        },
    });
}
