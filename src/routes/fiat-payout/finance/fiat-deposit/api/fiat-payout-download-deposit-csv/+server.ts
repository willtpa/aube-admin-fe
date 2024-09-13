import { getDepositCSV } from '$lib/services/fiat-payout/deposit.server';

export async function GET({ url }) {
    try {
        // Extract query parameters
        const status = url.searchParams.get('status');
        const bank_account = url.searchParams.get('bank_account');
        const from_deposit_date = url.searchParams.get('from_deposit_date');
        const to_deposit_date = url.searchParams.get('to_deposit_date');

        const response = await getDepositCSV(
            status,
            bank_account,
            from_deposit_date,
            to_deposit_date,
        );

        // Get the CSV data as text
        const csvData = await response.text();

        // Prepare the response
        const headers = new Headers();
        headers.append('Content-Type', 'application/csv');
        headers.append('Content-Disposition', 'attachment; filename=deposit_data.csv');

        return new Response(csvData, {
            status: 200,
            headers: headers,
        });
    } catch (err) {
        console.error('Error fetching CSV:', err);
        // throw error(500, 'An error occurred while downloading the CSV');
    }
}
