import { isCrypto } from '$utils/common';
import {
    test,
    expect,
    type Browser,
    chromium,
    type Page,
    type ElementHandle,
} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.testing' });

let browser: Browser;
let newPage: Page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    newPage = await browser.newPage();
    const previewUrl = process.env['DEPLOY_PREVIEW_OUTPUT'];
    await newPage.goto(`${previewUrl}/rates`);
});

test.afterAll(async () => {
    await browser.close();
});

test.describe('Currency rates table', () => {
    test('it should render currency rate information in the table', async () => {
        const tbodyElement = await newPage.$('.table tbody');
        expect(tbodyElement).not.toBeNull();

        const tbodyNotEmpty = await newPage.$eval(
            '.table tbody',
            (tbody) => tbody.childElementCount > 0,
        );
        expect(tbodyNotEmpty).toBeTruthy();
    });

    test('it should render currency rate information with the correct fields', async () => {
        const tableContent = await newPage.$('.table tbody tr');
        expect(tableContent).not.toBeNull();

        const expectedClasses = [
            'fav-btn',
            'currency',
            'rate-usd-per-unit',
            'rate-unit-per-usd',
            'rate-last-updated',
            'rate-providers',
        ];
        const contentClasses = await (tableContent as ElementHandle).$$eval('td', (tds) =>
            tds.map((td) =>
                td
                    .getAttribute('class')
                    ?.split(' ')
                    .reduce((cArr: string[], c) => {
                        if (c.length > 0) {
                            cArr.push(c.trim());
                        }
                        return cArr;
                    }, []),
            ),
        );
        const flattenedClasses = contentClasses.flat();
        expect(flattenedClasses).toEqual(expect.arrayContaining(expectedClasses));
    });

    test('it should render required currency rate information in the table', async () => {
        const numberRegex = /^[0-9]+(\.[0-9]+)?$/;

        // since BTC is the default currency we MUST have, we check using BTC
        const hasCurrencySymbol = await newPage.getByTestId('currency-BTC').isVisible();
        expect(hasCurrencySymbol).toBeTruthy();

        const rateUsdPerUnitEl = await newPage.getByTestId('rate-BTC-to-usd').textContent();
        expect(rateUsdPerUnitEl).not.toBeNull();
        expect(rateUsdPerUnitEl?.split(' ')[0]).toMatch(numberRegex);

        const rateUnitPerUsdEl = await newPage.getByTestId('rate-usd-to-BTC').textContent();
        expect(rateUnitPerUsdEl).not.toBeNull();
        expect(rateUnitPerUsdEl?.split(' ')[0]).toMatch(numberRegex);

        const rateLastUpdatedEl = await newPage.getByTestId('rate-last-updated-BTC').textContent();
        expect(rateLastUpdatedEl).not.toBeNull();

        const rateProvidersEl = await newPage.$$(
            '.table tbody tr:first-child [data-testid^="rate-providers-"]',
        );
        expect(rateProvidersEl.length).toBeGreaterThanOrEqual(1);
    });
});

test.describe('Currency type buttons', async () => {
    test('it should render all currency when "All" button is selected', async () => {
        await newPage.getByLabel('All').check();

        const currencies = [
            ...(await newPage.$$eval('.table tbody tr td.currency img', (imgs) =>
                imgs.map((img) => img.getAttribute('alt')),
            )),
            ...(await newPage.$$eval('.table tbody tr td.currency span', (spans) =>
                spans.map((span) => span.textContent),
            )),
        ];
        const cryptoCurrencies = currencies.filter((currency) => currency && isCrypto(currency));
        const fiatCurrencies = currencies.filter((currency) => currency && !isCrypto(currency));

        expect(cryptoCurrencies.length + fiatCurrencies.length).toEqual(currencies.length);
    });

    test('it should render only crypto currency when "Crypto" button is selected', async () => {
        await newPage.getByLabel('Crypto').check();

        const currencies = await newPage.$$eval('.table tbody tr td.currency img', (imgs) =>
            imgs.map((img) => img.getAttribute('alt')),
        );
        const cryptoCurrencies = currencies.filter((currency) => currency && isCrypto(currency));

        expect(cryptoCurrencies.length).toEqual(currencies.length);
    });

    test('it should render only fiat currency when "Fiat" button is selected', async () => {
        await newPage.getByLabel('Fiat').check();

        const currencies = await newPage.$$eval('.table tbody tr td.currency span', (spans) =>
            spans.map((span) => span.textContent),
        );
        const fiatCurrencies = currencies.filter((currency) => currency && !isCrypto(currency));

        expect(fiatCurrencies.length).toEqual(currencies.length);
    });

    test('it should automatically select "All" when the query parameter is "currencyType=all" or invalid', async () => {
        await newPage.goto('/rates?currencyType=all');

        let allButton = await newPage.getByLabel('All');
        expect(await allButton.isChecked()).toBeTruthy();

        await newPage.goto('/rates?currencyType=invalid');
        allButton = await newPage.getByLabel('All');
        expect(await allButton.isChecked()).toBeTruthy();
    });

    test('it should automatically select "Crypto" when the query parameter is "currencyType=crypto"', async () => {
        await newPage.goto('/rates?currencyType=crypto');

        const cryptoButton = await newPage.getByLabel('Crypto');
        expect(await cryptoButton.isChecked()).toBeTruthy();
    });

    test('it should automatically select "Fiat" when the query parameter is "currencyType=fiat"', async () => {
        await newPage.goto('/rates?currencyType=fiat');

        const fiatButton = await newPage.getByLabel('Fiat');
        expect(await fiatButton.isChecked()).toBeTruthy();
    });
});

test.describe('Currency favorites', () => {
    const delayInMs = 100;

    test('it should render/unrender favorite currency when the star icon is clicked', async () => {
        await newPage.goto('/rates');

        // click the star icon to add the favorite currency
        await newPage.getByTestId('add-fav-ETH').click();
        // Wait for the favorite currency to be rendered
        await new Promise((r) => setTimeout(r, delayInMs));
        expect(
            await newPage.$eval('.fav-currency #fav-ETH', (fav) => fav.childElementCount > 0),
        ).toBeTruthy();

        // click the star icon again to remove the favorite currency
        await newPage.getByTestId('add-fav-ETH').click();
        // Wait for the favorite currency to be unrendered
        await new Promise((r) => setTimeout(r, delayInMs));
        expect(await newPage.$('.fav-currency #fav-ETH')).toBeNull();
    });
});

test.describe('Currency rates copy buttons (USD per unit & unit per USD) on table', () => {
    test('it should copy the currency rate to the clipboard when the copy button is clicked', async () => {
        const numberRegex = /^[0-9]+(\.[0-9]+)?$/;

        expect(await newPage.$('#copy-rate-ETH-to-usd')).not.toBeNull();
        expect(await newPage.$('#copy-rate-usd-to-ETH')).not.toBeNull();

        // Click the copy button for the currency rate (USD per unit)
        await newPage.getByTestId('copy-rate-ETH-to-usd').click();
        expect(await newPage.evaluate(() => navigator.clipboard.readText())).not.toBeNull();
        expect(await newPage.evaluate(() => navigator.clipboard.readText())).toMatch(numberRegex);

        // Click the copy button for the currency rate (USD per unit)
        await newPage.getByTestId('copy-rate-usd-to-ETH').click();
        expect(await newPage.evaluate(() => navigator.clipboard.readText())).not.toBeNull();
        expect(await newPage.evaluate(() => navigator.clipboard.readText())).toMatch(numberRegex);
    });
});
