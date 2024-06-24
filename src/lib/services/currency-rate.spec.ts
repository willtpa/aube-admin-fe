import { Requestor } from '$utils/http';
import { afterAll, beforeAll, describe, test, vi, type MockInstance } from 'vitest';
import { getRates } from './currency-rate';

let mockRequestorGet: MockInstance;

beforeAll(async () => {
    mockRequestorGet = vi.spyOn(Requestor.prototype, 'get');
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
