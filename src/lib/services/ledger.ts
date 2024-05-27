import { Requestor } from '../utils/http';

interface TransactionPayload {
    id: string;
    amount: string;
    fromAccountID: string;
    toAccountID: string;
    createdAt: string;
}

interface AccountDetailPayload {
    id: string;
    balances: Record<string, string>;
    transactions: TransactionPayload[];
}

const requestor = new Requestor('http://localhost:8085/api');

export async function getAccountDetail(
    accountId: string,
    networkCurrencyId: string | null,
    fromDate?: string | null,
    toDate?: string | null,
): Promise<AccountDetailPayload> {
    return requestor.get<AccountDetailPayload>(`/accounts/${accountId}`, {
        query: { networkCurrencyId, fromDate, toDate },
    });
}
