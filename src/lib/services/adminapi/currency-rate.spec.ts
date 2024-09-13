import { afterAll, beforeAll, describe, test, vi, type MockInstance } from 'vitest';
import { apiClient } from '$services/adminapi/api-client';
import { getRates } from '$services/adminapi/currency-rate';

let mockRequestorGet: MockInstance;

beforeAll(async () => {
    mockRequestorGet = vi.spyOn(apiClient, 'GET');
});

afterAll(() => {
    mockRequestorGet.mockRestore();
});

describe('getRates function', () => {
    test('it should call HTTP GET method to get currency rates', async ({ expect }) => {
        mockRequestorGet.mockResolvedValue({});
        await getRates();
        expect(mockRequestorGet).toHaveBeenCalled();
    });
});
