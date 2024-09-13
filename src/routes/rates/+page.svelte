<script lang="ts">
    import Decimal from 'decimal.js';
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { CurrencyTypeFilter } from '$utils/enum';
    import type { PageData } from './$types';
    import { browser } from '$app/environment';
    import { isCrypto } from '$utils/common';
    import type { components } from '$lib/openapi/adminapi.schema';
    import type { APIResponse } from '$lib/openapi/types';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    // re-order currency rates by crypto first and non crypto after
    let currencyRates = $state(
        Object.fromEntries(
            Object.entries(data.currencyRates).sort(([aKey], [bKey]) => {
                if (isCrypto(aKey) && !isCrypto(bKey)) {
                    return -1;
                } else if (!isCrypto(aKey) && isCrypto(bKey)) {
                    return 1;
                } else {
                    return aKey.localeCompare(bKey);
                }
            }),
        ),
    );

    const allIsPriceUps: Record<string, boolean> = {};

    function updateCurrencyGrp(
        currencyGrp: PageData['currencyRates'],
        currRate: APIResponse<components['schemas']['MedianFxRateV1']>,
    ): Record<string, APIResponse<components['schemas']['MedianFxRateV1']>> {
        const currencies = Object.entries(currencyGrp);
        for (const [base, rate] of currencies) {
            if (base === currRate.base && currRate.rate_base_quote && rate.rate_base_quote) {
                const currRateDec = new Decimal(currRate.rate_base_quote);
                const prevRateDec = new Decimal(rate.rate_base_quote);
                allIsPriceUps[base] = currRateDec.gt(prevRateDec);

                currencyGrp[base] = { ...currencyGrp[base], ...currRate };
            }
        }

        return currencies.length > 0 ? currencyGrp : {};
    }

    let sse: EventSource | undefined = undefined;

    async function subscribeToCurrencyRates(): Promise<void> {
        sse = new EventSource('rates/sse');

        sse.onerror = (error): void => {
            console.error('error occurred:', error);
        };

        sse.onopen = (): void => {
            console.log('connected to currency rates server');
        };

        sse.onmessage = (rate): void => {
            const currencyRate = JSON.parse(rate.data) as APIResponse<
                components['schemas']['MedianFxRateV1']
            >;
            if (Object.keys(currencyRate).length > 0) {
                currencyRates = {
                    ...currencyRates,
                    ...updateCurrencyGrp(currencyRates, currencyRate),
                };
            }
        };
    }

    let allTimeAgos: Record<string, string> = $state({});

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
    function isValid(currRate: APIResponse<components['schemas']['MedianFxRateV1']>): boolean {
        const maxRateLifespan = 3600000; // 1h (in milliseconds) // just example modify as needed
        const rateCreatedAtDate = new Date(currRate.created_at);
        const diff = Date.now() - rateCreatedAtDate.getTime();

        return diff < maxRateLifespan;
    }

    let showToast = $state(false);

    async function copyToClipboard(text: string): Promise<void> {
        await navigator.clipboard.writeText(text);
        showToast = true;

        await new Promise((r) => setTimeout(r, 1_000));
        showToast = false;
    }

    let currencyTypeFilter = $state(data.currencyType);

    function filterByType(base: string): boolean {
        switch (currencyTypeFilter) {
            case CurrencyTypeFilter.Crypto:
                return isCrypto(base);
            case CurrencyTypeFilter.Fiat:
                return !isCrypto(base);
            default:
                return true;
        }
    }

    let favCurrencies: string[] = $state([]);

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

<main class="mx-auto max-w-[1050px] mt-8">
    <div class="flex justify-between">
        <h1>Currency Rates (quote USD)</h1>

        <div>
            <!-- currency type filter -->
            <form class="join block px-5">
                <input
                    class="join-item btn rounded-l-full w-20"
                    type="radio"
                    name="currency-type"
                    aria-label="All"
                    value={CurrencyTypeFilter.All}
                    bind:group={currencyTypeFilter}
                />
                <input
                    class="join-item btn w-20"
                    type="radio"
                    name="currency-type"
                    aria-label="Crypto"
                    value={CurrencyTypeFilter.Crypto}
                    bind:group={currencyTypeFilter}
                />
                <input
                    class="join-item btn rounded-r-full w-20"
                    type="radio"
                    name="currency-type"
                    aria-label="Fiat"
                    value={CurrencyTypeFilter.Fiat}
                    bind:group={currencyTypeFilter}
                />
            </form>
        </div>
    </div>

    <!-- pin favorite currencies -->
    {#each favCurrencies as base}
        {@const currencyBase = currencyRates[base]}

        {#if currencyBase !== undefined}
            <div class="stats shadow px-1 fav-currency">
                <div class="stat w-72">
                    <div class="stat-figure text-secondary">
                        <div class="indicator" id="fav-{base}">
                            <span class="indicator-item">
                                {#if !isValid(currencyBase)}
                                    <span class="material-symbols-outlined text-error">
                                        warning
                                    </span>
                                {/if}
                            </span>

                            {#if isCrypto(base)}
                                <div class="stat-figure text-primary">
                                    <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        class="inline-block w-8 h-8 stroke-current"
                                    >
                                        <image
                                            href="/{currencyBase.base}.svg"
                                            width="24"
                                            height="24"
                                        />
                                    </svg>
                                </div>
                            {:else}
                                <span class="text-xl">{currencyBase.base}</span>
                            {/if}
                        </div>
                    </div>
                    <div class="stat-title">
                        {currencyBase.base}/USD
                    </div>
                    <div
                        class="stat-desc {allIsPriceUps[base] === true
                            ? 'text-success'
                            : 'text-error'}"
                    >
                        <button
                            class="text-left inline-block w-44 overflow-hidden truncate"
                            onclick={async () => {
                                if (currencyBase.rate_base_quote) {
                                    await copyToClipboard(currencyBase.rate_base_quote);
                                }
                            }}
                        >
                            {currencyBase.rate_base_quote}
                        </button>
                    </div>
                    <div class="stat-title">
                        USD/{currencyBase.base}
                    </div>
                    <div
                        class="stat-desc {allIsPriceUps[base] === true
                            ? 'text-success'
                            : 'text-error'}"
                    >
                        <button
                            class="text-left inline-block w-44 overflow-hidden truncate"
                            onclick={async () => {
                                if (currencyBase.rate_usd_quote) {
                                    await copyToClipboard(currencyBase.rate_usd_quote);
                                }
                            }}
                        >
                            {currencyBase.rate_usd_quote}
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    {/each}

    <!-- currency rates table -->
    <div class="overflow-x not-prose mt-8">
        {#if showToast}
            <div class="toast toast-center toast-top" transition:fade>
                <div class="alert alert-neutral-content">Copied rates to clipboard</div>
            </div>
        {/if}

        <table class="table">
            <thead>
                <tr>
                    <th class="text-center capitalize"></th>
                    <th class="text-center capitalize">Base currency</th>
                    <th class="text-right capitalize">USD per unit</th>
                    <th class="text-right capitalize">unit per USD</th>
                    <th class="text-center capitalize">Last updated</th>
                    <th class="text-center capitalize">Providers</th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(currencyRates).filter( ([base]) => filterByType(base), ) as [base, rates] (base)}
                    <tr class="hover" in:fade>
                        <!-- favorite -->
                        <td class="text-center fav-btn">
                            <button
                                onclick={() => setFavCurrency(base)}
                                data-testid="add-fav-{base}"
                                id="add-fav-{base}"
                            >
                                <span class="material-icons text-primary">
                                    {favCurrencies.includes(base) ? 'star' : 'star_outline'}
                                </span>
                            </button>
                        </td>

                        <!-- currency -->
                        <td class="text-center currency">
                            {#if isCrypto(base)}
                                <img
                                    class="w-6 h-6 mx-auto"
                                    src="./{rates.base}.svg"
                                    alt={rates.base}
                                    data-testid="currency-{base}"
                                />
                            {:else}
                                <span class="text-m" data-testid="currency-{base}">
                                    {rates.base}
                                </span>
                            {/if}
                        </td>

                        <!-- rate - usd per unit -->
                        <td
                            class="text-right whitespace-nowrap rate-usd-per-unit
                                {allIsPriceUps[base] === true ? 'text-success' : 'text-error'}"
                            data-testid="rate-{base}-to-usd"
                        >
                            {rates.rate_base_quote}
                            <span class="material-symbols-outlined">
                                {allIsPriceUps[base] === true ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                            <button
                                class="text-secondary"
                                data-testid="copy-rate-{base}-to-usd"
                                id="copy-rate-{base}-to-usd"
                                onclick={async () => {
                                    if (rates.rate_base_quote) {
                                        await copyToClipboard(rates.rate_base_quote);
                                    }
                                }}
                            >
                                <span class="material-symbols-outlined">content_copy</span>
                            </button>
                        </td>

                        <!-- rate - unit per usd -->
                        <td
                            class="text-right whitespace-nowrap rate-unit-per-usd
                                {allIsPriceUps[base] === true ? 'text-success' : 'text-error'}"
                            data-testid="rate-usd-to-{base}"
                        >
                            {rates.rate_usd_quote}
                            <span class="material-symbols-outlined">
                                {allIsPriceUps[base] === true ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                            <button
                                class="text-secondary"
                                data-testid="copy-rate-usd-to-{base}"
                                id="copy-rate-usd-to-{base}"
                                onclick={async () => {
                                    if (rates.rate_usd_quote) {
                                        await copyToClipboard(rates.rate_usd_quote);
                                    }
                                }}
                            >
                                <span class="material-symbols-outlined">content_copy</span>
                            </button>
                        </td>

                        <!-- Last updated -->
                        <td class="text-center rate-last-updated">
                            <span data-testid="rate-last-updated-{base}">{allTimeAgos[base]}</span>
                            {#if !isValid(rates)}
                                <div
                                    class="tooltip tooltip-right tooltip-error"
                                    data-tip="rate is older than 1 hour"
                                >
                                    <!-- <small class="badge badge-error gap-2 text-base-100">Invalid</small> -->
                                    <span class="material-symbols-outlined text-error">
                                        warning
                                    </span>
                                </div>
                            {/if}
                        </td>

                        <!-- providers -->
                        <td class="flex justify-evenly rate-providers">
                            <ul class="list-none flex">
                                {#each Object.entries(rates.providers_contrib) as [provider]}
                                    <li data-testid="rate-providers-{provider}">
                                        <img
                                            class="w-6 h-6"
                                            src="./{provider}.svg"
                                            alt={provider}
                                        />
                                    </li>
                                {/each}
                            </ul>
                            {rates.rates_count} rate(s)
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>
