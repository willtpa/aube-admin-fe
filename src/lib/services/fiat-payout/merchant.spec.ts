import { Requestor } from '$utils/http';
import { afterAll, beforeAll, describe, test, vi, type MockInstance } from 'vitest';
import { getMerchants } from './merchant.server';

let mockRequestorGet: MockInstance;

beforeAll(async () => {
    mockRequestorGet = vi.spyOn(Requestor.prototype, 'get');
});

afterAll(() => {
    mockRequestorGet.mockRestore();
});

describe('getMerchants function', () => {
    test('it should call HTTP GET method to get merchants', async ({ expect }) => {
        mockRequestorGet.mockResolvedValue({});
        await getMerchants();
        expect(mockRequestorGet).toHaveBeenCalled();
    });
});
