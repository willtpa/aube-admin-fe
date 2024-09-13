import { Requestor } from '$utils/http';
import { afterAll, beforeAll, describe, test, vi, type MockInstance } from 'vitest';
import { getDeposits, assignDeposit, getDepositCSV } from './deposit.server';

let mockRequestorGet: MockInstance;
let mockRequestorPost: MockInstance;

beforeAll(async () => {
    mockRequestorGet = vi.spyOn(Requestor.prototype, 'get');
    mockRequestorPost = vi.spyOn(Requestor.prototype, 'post');
});

afterAll(() => {
    mockRequestorGet.mockRestore();
});

describe('getDeposits function', () => {
    test('it should call HTTP GET method to get deposits', async ({ expect }) => {
        mockRequestorGet.mockResolvedValue({});
        await getDeposits();
        expect(mockRequestorGet).toHaveBeenCalled();
    });

    test('it should call HTTP POST method to assign deposits', async ({ expect }) => {
        const merchant_id = 1;
        const deposit_id = '123';
        mockRequestorPost.mockResolvedValue({});
        await assignDeposit(merchant_id, deposit_id);
        expect(mockRequestorPost).toHaveBeenCalled();
    });

    test('it should call HTTP GET method to get deposit CSV', async ({ expect }) => {
        mockRequestorGet.mockResolvedValue({});
        await getDepositCSV();
        expect(mockRequestorGet).toHaveBeenCalled();
    });
});
