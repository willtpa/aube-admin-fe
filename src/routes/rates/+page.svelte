<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
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

<div class="px-3">
    <h1 class="text-xl py-8 px-8 font-thin">Currency Rates (base USD)</h1>

    <!-- <div class="grid grid-flow-row-dense gap-4 grid-cols-2 grid-rows-2"> -->
    <!-- {#each Object.entries(currencyRates) as [key]}
            {#if currencyRates[key]}
                <CurrencyRateComponent
                    currencyRate={currencyRates[key] as MedianFxRateV1}
                    isPriceUp={allIsPriceUps[key] as boolean}
                    isCrypto={isCrypto((currencyRates[key] as MedianFxRateV1).quote)}
                    timeAgo={allTimeAgos[key] as string}
                ></CurrencyRateComponent>
            {/if}
        {/each} -->
    <!-- </div> -->

    <div class="overflow-x-auto flex justify-center">
        <table class="table w-4/5">
            <!-- head -->
            <thead>
                <tr>
                    <th>
                        <div class="flex justify-start">Currency/Ticker</div>
                    </th>
                    <th>
                        <div class="flex justify-start">Quote</div>
                    </th>
                    <th>
                        <div class="flex justify-start">Quote Freshness</div>
                    </th>
                    <th>
                        <div class="flex justify-start">Quote Providers</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                {#each Object.entries(currencyRates) as [outerKey] (outerKey)}
                    {#if currencyRates[outerKey]}
                        <tr>
                            <td>
                                {#if isCrypto(outerKey)}
                                    <img
                                        class="w-6 h-6"
                                        src="./{currencyRates[outerKey]!.quote}.svg"
                                        alt={currencyRates[outerKey]!.quote}
                                    />
                                {:else}
                                    <span class="text-m">{currencyRates[outerKey]!.quote}</span>
                                {/if}
                            </td>
                            <td>
                                <div class="flex justify-between w-40">
                                    <div class="flex justify-between w-32">
                                        <span
                                            class="{allIsPriceUps[outerKey] === true
                                                ? 'text-success'
                                                : 'text-error'} text-m"
                                            >{currencyRates[outerKey]!.rate_base_quote}</span
                                        >
                                        <button
                                            class="flex items-center text-secondary"
                                            on:click={async (): Promise<void> => {
                                                await navigator.clipboard.writeText(currencyRates[outerKey]!.rate_base_quote.toString());
                                            }}
                                        >
                                            <span class="material-symbols-outlined">
                                                content_copy
                                            </span>
                                        </button>
                                    </div>

                                    <span
                                        class="{allIsPriceUps[outerKey] === true
                                            ? 'text-success'
                                            : 'text-error'} material-symbols-outlined py-1"
                                    >
                                        {allIsPriceUps[outerKey] === true
                                            ? 'arrow_upward'
                                            : 'arrow_downward'}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-between w-48">
                                    <span class="text-sm py-1 justify-center w-40"
                                        >{allTimeAgos[outerKey]} - {currencyRates[outerKey]!.rates_count}
                                        rate(s)</span
                                    >
                                </div>
                            </td>
                            <td>
                                <div class="flex">
                                    {#each Object.entries(currencyRates[outerKey]!.providers_contrib) as [innerKey]}
                                        <img
                                            class="w-6 h-6"
                                            src="./{innerKey}.svg"
                                            alt={innerKey}
                                        />
                                    {/each}
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>
