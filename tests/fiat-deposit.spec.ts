import {
    test,
    expect,
    type Browser,
    chromium,
    type Page,
    // type ElementHandle,
} from '@playwright/test';

let browser: Browser;
let newPage: Page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    newPage = await browser.newPage();
    await newPage.goto('/finance/fiat-deposit');
    await newPage.route('**/api/fiat-payout/internal/deposits', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                {
                    count: 1,
                    deposits: [
                        {
                            amount: 1000,
                            balance: {
                                id: '3b5aeac4-da2f-4fd1-8bdb-109cad9e8e26',
                                currency: 'SGD',
                                type: 'fiat_money',
                            },
                            balance_id: '3b5aeac4-da2f-4fd1-8bdb-109cad9e8e26',
                            created_at: '2024-07-04T01:28:01.968Z',
                            currency: 'SGD',
                            external_id: '18c9907c-788b-44e8-b1a9-bc090cb80889',
                            id: 'ee2caadf-69d9-4e3d-a59a-3858eb07d19f',
                            merchant: {
                                id: 393,
                                mcnt_key: 'mkey-clqc3e53500000khobyqr6jhn',
                                mcnt_name: 'Wesley Test',
                            },
                            remarks: 'test deposit email again',
                            status: 'captured',
                            updated_at: '2024-07-04T01:28:01.990Z',
                        },
                    ],
                },
            ]),
        });
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.describe('Deposits table', () => {
        test('it should render deposits in the table', async () => {
            const tbodyElement = newPage.locator('.table-lg tbody');
            expect(tbodyElement).not.toBeNull();

            const tbodyNotEmpty = await tbodyElement.evaluate(
                (tbody) => tbody.childElementCount > 0,
            );
            expect(tbodyNotEmpty).toBeTruthy();
        });
    });
});
