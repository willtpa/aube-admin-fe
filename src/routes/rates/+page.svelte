<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    // import CurrencyRateComponent from '$components/currency-rate.svelte';
    import {
        type CurrencyCodeToMedianFxRateV1Map,
        type MedianFxRateV1,
    } from '$lib/services/currency-rate.d';
    import type { PageData } from './$types';
    import Decimal from 'decimal.js';

    export let data: PageData;

    function isCrypto(symbol: string): boolean {
        return (
            ['BTC', 'ETH', 'MATIC', 'SOL', 'MATIC', 'TRX', 'XLM', 'USDT', 'USDC'].indexOf(symbol) !=
            -1
        );
    }

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
            .filter((quote) => currRate.quote === quote)
            .map((quote) => {
                const currRateDec = new Decimal(currRate.rate_base_quote);
                const prevRateDec = new Decimal(
                    (currencyGrp[quote] as MedianFxRateV1).rate_base_quote,
                );
                allIsPriceUps[quote] = currRateDec.gt(prevRateDec);

                currencyGrp[quote] = { ...(currencyGrp[quote] ?? {}), ...currRate };
            });
        return Object.keys(currencyGrp).length > 0 ? currencyGrp : {};
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
            Object.entries(currencyRates).map(([quote, rate]) => {
                return [quote, getTimeAgo(new Date(rate.created_at))];
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

    function isInvalid(currRate: MedianFxRateV1): boolean {
        const maxRateLifespan = 3600000; // 1h (in milliseconds) // just example modify as needed
        const rateCreatedAtDate = new Date(currRate.created_at);
        const now = new Date();
        const diff = now.getTime() - rateCreatedAtDate.getTime();

        return diff > maxRateLifespan;
    }

    let showToast = false;
    async function copyToClipboard(text: string): Promise<void> {
        await navigator.clipboard.writeText(text);
        showToast = true;

        await new Promise((r) => setTimeout(r, 1_000));
        showToast = false;
    }

    let intervalId: NodeJS.Timeout | undefined = undefined;

    onMount(async () => {
        await subscribeToCurrencyRates();
        updateTimeAgo();
        intervalId = setInterval(updateTimeAgo, 2000);
    });

    onDestroy(() => {
        clearInterval(intervalId);
        sse?.close();
    });
</script>

<main class="mx-auto max-w-[1050px] mt-8">
    <h1>Currency Rates (base USD)</h1>
    <div class="overflow-x-auto not-prose">
        {#if showToast}
            <div class="toast toast-center toast-top" transition:fade>
                <div class="alert alert-neutral-content">Copied rates to clipboard</div>
            </div>
        {/if}

        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th class="text-center capitalize"> Status </th>
                    <th class="text-right capitalize"> Quote </th>
                    <th class="text-center capitalize"> Currency </th>
                    <th class="text-center capitalize"> Last updated </th>
                    <th class="text-center capitalize"> Providers </th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(currencyRates) as [outerKey, outerValue] (outerKey)}
                    <!-- {#if currencyRates[outerKey]} -->
                    <tr class="hover">
                        <!-- Copy rates -->
                        <td>
                            <button
                                class="flex items-center text-secondary"
                                on:click={async (): Promise<void> => { await copyToClipboard(outerValue.rate_base_quote.toString()) }}
                            >
                                <span class="material-symbols-outlined"> content_copy </span>
                            </button>
                        </td>
                        <!-- Status -->
                        <td class="text-center">
                            <!-- <div
                                    class="tooltip tooltip-error tooltip-right"
                                    data-tip="invalid rate"
                                >
                                    <span
                                        class="material-symbols-outlined text-error"
                                        hidden={isInvalid(currencyRates[outerKey]!)}
                                    >
                                        warning
                                    </span>
                                </div> -->
                            {#if isInvalid(outerValue)}
                                <div
                                    class="tooltip tooltip-error tooltip-right"
                                    data-tip="invalid rate"
                                >
                                    <small class="badge badge-error gap-2">Invalid</small>
                                </div>
                            {/if}
                        </td>
                        <!-- Rate -->
                        <td
                            class="flex align-center justify-end
                                {allIsPriceUps[outerKey] === true ? 'text-success' : 'text-error'}"
                        >
                            {outerValue.rate_base_quote}
                            <span class="material-symbols-outlined">
                                {allIsPriceUps[outerKey] === true
                                    ? 'arrow_upward'
                                    : 'arrow_downward'}
                            </span>
                        </td>

                        <!-- currency -->
                        <td class="text-center">
                            {#if isCrypto(outerKey)}
                                <img
                                    class="w-6 h-6 mx-auto"
                                    src="./{outerValue.quote}.svg"
                                    alt={outerValue.quote}
                                />
                            {:else}
                                <span class="text-m">{outerValue.quote}</span>
                            {/if}
                        </td>

                        <!-- Last updated -->
                        <td class="w-48 text-center">
                            {allTimeAgos[outerKey]}
                        </td>

                        <!-- providers -->
                        <td class="flex justify-evenly">
                            <ul class="list-none flex">
                                {#each Object.entries(outerValue.providers_contrib) as [innerKey]}
                                    <li>
                                        <img
                                            class="w-6 h-6"
                                            src="./{innerKey}.svg"
                                            alt={innerKey}
                                        />
                                    </li>
                                {/each}
                            </ul>
                            {outerValue.rates_count} rate(s)
                        </td>
                    </tr>
                    <!-- {/if} -->
                {/each}
            </tbody>
        </table>
    </div>
</main>
