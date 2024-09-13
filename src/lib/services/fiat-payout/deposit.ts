import { z } from 'zod';
import { MerchantResponseSchema } from './merchant';
export const DepositSchema = z.object({
    id: z.string(),
    external_id: z.string(),
    merchant: z
        .object({
            id: z.number(),
            mcnt_key: z.string(),
            mcnt_name: z.string(),
        })
        .optional(),
    balance: z
        .object({
            id: z.string(),
            currency: z.string(),
            type: z.union([z.literal('fiat_money'), z.literal('cryptocurrency')]),
        })
        .optional(),
    currency: z.string(),
    amount: z.number(),
    status: z.union([
        z.literal('created'),
        z.literal('captured'),
        z.literal('reversed'),
        z.literal('ignored'),
    ]),
    remarks: z.string(),
    bank_account: z.string().optional(),
    transaction_type: z.string().optional(),
    transaction_date: z.string().optional(),
    sender: z
        .object({
            bank: z.string(),
            name: z.string(),
            bank_country: z.string(),
            bank_account_number: z.string(),
        })
        .optional(),
    created_at: z.string(),
    updated_at: z.string(),
    selectedValue: MerchantResponseSchema.optional(),
});

export const DepositResponseSchema = z.object({
    deposits: z.array(DepositSchema),
    count: z.number(),
});

export enum DepositStatus {
    Created = 'created',
    Captured = 'captured',
    Reversed = 'reversed',
    Ignored = 'ignored',
    // Empty = ''
}

export const depositStatus = [
    { label: 'open', value: DepositStatus.Created },
    { label: 'done', value: DepositStatus.Captured },
    { label: 'cancelled', value: DepositStatus.Reversed },
    { label: 'ignored', value: DepositStatus.Ignored },
];
export const depositStatusValues = depositStatus.map((status) => status.value);

export enum BankAccount {
    DbsSGD = 'dbs-SGD',
    DbsUSD = 'dbs-USD',
    DbsEUR = 'dbs-EUR',
    // Empty = ''
}

export const bankAccount = [
    { label: 'dbs-SGD', value: BankAccount.DbsSGD },
    { label: 'dbs-USD', value: BankAccount.DbsUSD },
    { label: 'dbs-EUR', value: BankAccount.DbsEUR },
];

export const bankAccountValues = bankAccount.map((status) => status.value);

export enum SortValues {
    CreatedAt = 'created_at',
    UpdatedAt = 'updated_at',
    SenderName = 'sender_name',
    Currency = 'currency',
    // Empty = '',
}

export const sort = [
    { label: 'deposit date', value: SortValues.CreatedAt },
    { label: 'topped up date', value: SortValues.UpdatedAt },
    { label: 'sender name', value: SortValues.SenderName },
    { label: 'currency', value: SortValues.Currency },
];
export const sortValues = sort.map((sort) => sort.value);

export enum OrderValues {
    Ascending = 'ASC',
    Descending = 'DESC',
    // Empty = '',
}

export const order = [
    { label: 'ascending', value: OrderValues.Ascending },
    { label: 'descending', value: OrderValues.Descending },
];
export const orderValues = order.map((order) => order.value);

export const DepositFilterSchema = z.object({
    page: z.string().nullable().optional(),
    fromDate: z.string().date().nullable().optional(),
    toDate: z.string().date().nullable().optional(),
    status: z.nativeEnum(DepositStatus).nullable().optional(),
    bankAccount: z.nativeEnum(BankAccount).nullable().optional(),
    sort: z.nativeEnum(SortValues).nullable().optional(),
    order: z.nativeEnum(OrderValues).nullable().optional(),
});

export type Deposit = z.infer<typeof DepositSchema>;
export type DepositResponse = z.infer<typeof DepositResponseSchema>;
export type DepositFilter = z.infer<typeof DepositFilterSchema>;
