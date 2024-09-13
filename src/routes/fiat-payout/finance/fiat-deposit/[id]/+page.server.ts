import type { Actions } from '@sveltejs/kit';
import { assignDeposit } from '$lib/services/fiat-payout/deposit.server';
import { handleRequestError } from '$utils/http';
import { redirect } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const actions: Actions = {
    default: async ({ params, request }) => {
        const depositId = params['id'];

        const formData = await request.formData();
        const merchantId = Number(formData.get('merchant-id'));

        try {
            if (depositId && merchantId) {
                await assignDeposit(merchantId, depositId);
            }
        } catch (err) {
            handleRequestError(err);
        }

        redirect(302, `/fiat-payout/finance/fiat-deposit`);
    },
};
