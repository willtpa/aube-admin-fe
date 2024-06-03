import { isCrypto } from '$utils/common';
import { test, expect, type Browser, chromium, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.testing' });

let browser: Browser;
let newPage: Page;

test.beforeAll(async () => {
    browser = await chromium.launch();
    newPage = await browser.newPage();
    await newPage.goto('/rates');
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

        const currencies = await newPage.$$('.table tbody tr td.currency');
        expect(currencies.length).toBeGreaterThan(0);
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
    const delayInMilliseconds = 100;

    test('it should render/unrender favorite currency when the star icon is clicked', async () => {
        await newPage.goto('/rates');

        // click the star icon to add the favorite currency
        await newPage
            .getByRole('row', { name: 'star_outline ETH' })
            .getByRole('button')
            .first()
            .click();
        // Wait for the favorite currency to be rendered
        await new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
        const favFound = await newPage.$eval(
            '.indicator#fav-ETH',
            (fav) => fav.childElementCount > 0,
        );
        expect(favFound).toBeTruthy();

        // click the star icon again to remove the favorite currency
        await newPage.getByRole('row', { name: 'star ETH' }).getByRole('button').first().click();
        // Wait for the favorite currency to be unrendered
        await new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
        const isFavFound = (await newPage.$('.indicator#fav-ETH')) ?? false;
        expect(isFavFound).toBeFalsy();
    });
});
