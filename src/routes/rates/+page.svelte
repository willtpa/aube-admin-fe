<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { CurrencyTypeFilter } from '$utils/enum';
    import {
        type CurrencyCodeToMedianFxRateV1Map,
        type MedianFxRateV1,
    } from '$lib/services/currency-rate.d';
    import type { PageData } from './$types';
    import Decimal from 'decimal.js';
    import { browser } from '$app/environment';
    import { isCrypto } from '$utils/common';

    export let data: PageData;

    // re-order currency rates by crypto first and non crypto after
    let currencyRates = Object.fromEntries(
        Object.entries(data.currencyRates).sort(([aKey], [bKey]) => {
            if (isCrypto(aKey) && !isCrypto(bKey)) {
                return -1;
            } else if (!isCrypto(aKey) && isCrypto(bKey)) {
                return 1;
            } else {
                return aKey.localeCompare(bKey);
            }
        }),
    );

    const allIsPriceUps: Record<string, boolean> = {};

    function updateCurrencyGrp(
        currencyGrp: CurrencyCodeToMedianFxRateV1Map,
        currRate: MedianFxRateV1,
    ): CurrencyCodeToMedianFxRateV1Map {
        Object.keys(currencyGrp)
            .filter((base) => currRate.base === base)
            .map((base) => {
                const currRateDec = new Decimal(currRate.rate_base_quote);
                const prevRateDec = new Decimal(
                    (currencyGrp[base] as MedianFxRateV1).rate_base_quote,
                );
                allIsPriceUps[base] = currRateDec.gt(prevRateDec);

                currencyGrp[base] = { ...(currencyGrp[base] ?? {}), ...currRate };
            });
        return Object.keys(currencyGrp).length > 0 ? currencyGrp : {};
    }

    let sse: EventSource | undefined = undefined;

    async function subscribeToCurrencyRates(): Promise<void> {
        sse = new EventSource('rates/sse/');

        sse.onerror = (error): void => {
            console.error('error occurred:', error);
        };

        sse.onopen = (): void => {
            console.log('connected to currency rates server');
        };

        sse.onmessage = (rate): void => {
            const currencyRate = JSON.parse(rate.data) as MedianFxRateV1;
            if (Object.keys(currencyRate).length > 0) {
                currencyRates = {
                    ...currencyRates,
                    ...updateCurrencyGrp(currencyRates, currencyRate),
                };
            }
        };
    }

    let allTimeAgos: Record<string, string> = {};

    // return a map of quote to timeAgo
    function updateTimeAgo(): void {
        allTimeAgos = Object.fromEntries(
            Object.entries(currencyRates).map(([base, rate]) => {
                return [base, getTimeAgo(new Date(rate.created_at))];
            }),
        );
    }

    function getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}h ago`;
        } else if (minutes > 0) {
            return `${minutes}m ago`;
        } else {
            return `${seconds}s ago`;
        }
    }

    // leave it for now. If no use in future, will remove
    // TODO: modify to use rate status returning from the backend (when it is ready)
    function isValid(currRate: MedianFxRateV1): boolean {
        const maxRateLifespan = 3600000; // 1h (in milliseconds) // just example modify as needed
        const rateCreatedAtDate = new Date(currRate.created_at);
        const now = new Date();
        const diff = now.getTime() - rateCreatedAtDate.getTime();

        return diff < maxRateLifespan;
    }

    let showToast = false;

    async function copyToClipboard(text: string): Promise<void> {
        await navigator.clipboard.writeText(text);
        showToast = true;

        await new Promise((r) => setTimeout(r, 1_000));
        showToast = false;
    }

    let currencyTypeFilter = data.currencyType;

    function filterByType(base: string): boolean {
        switch (currencyTypeFilter) {
            case CurrencyTypeFilter.Crypto:
                return isCrypto(base);
            case CurrencyTypeFilter.Fiat:
                return !isCrypto(base);
            case CurrencyTypeFilter.All:
                return true;
        }
        return true;
    }

    let favCurrencies: string[] = [];

    // set favorite currencies to localstorage
    function setFavCurrency(base: string): void {
        favCurrencies = favCurrencies.includes(base)
            ? favCurrencies.filter((fav) => fav !== base)
            : [...favCurrencies, base];

        localStorage.setItem('favCurrencies', JSON.stringify(favCurrencies));
    }

    // load favorite currencies from localstorage
    function loadFavCurrencies(): void {
        const localStorageAvail = typeof localStorage !== 'undefined';
        if (browser && localStorageAvail) {
            const favCurrenciesAvail = localStorage.getItem('favCurrencies') !== null;

            if (!favCurrenciesAvail) {
                const defaultFavCurrencies = ['BTC'];
                localStorage.setItem('favCurrencies', JSON.stringify(defaultFavCurrencies));
                favCurrencies = defaultFavCurrencies;
            } else {
                favCurrencies = JSON.parse(
                    localStorage.getItem('favCurrencies') ?? '[]',
                ) as string[];
            }
        }
    }

    let intervalId: NodeJS.Timeout | undefined = undefined;

    onMount(async () => {
        await subscribeToCurrencyRates();
        updateTimeAgo();
        intervalId = setInterval(updateTimeAgo, 1000);
        loadFavCurrencies();
    });

    onDestroy(() => {
        clearInterval(intervalId);
        sse?.close();
    });
</script>

{JSON.stringify(currencyRates)}
