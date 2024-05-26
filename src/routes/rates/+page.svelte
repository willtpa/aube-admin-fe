<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onMount, onDestroy } from 'svelte';
	import CurrencyRateComponent from '$components/currency-rate.svelte';
	import {
		type CurrencyCodeToMedianFxRateV1Map,
		type MedianFxRateV1,
	} from '$lib/services/currency-rate.d';
	import type { PageData } from './$types';
	import { initFxRatesSubscription } from '$lib/providers/sse';
	import type { EventSourcePolyfill } from 'event-source-polyfill';
	import Decimal from 'decimal.js';

	export let data: PageData;

	function isCrypto(symbol: string): boolean {
		return (
			['BTC', 'ETH', 'MATIC', 'SOL', 'MATIC', 'TRX', 'XLM', 'USDT', 'USDC'].indexOf(symbol) != -1
		);
	}

	// re-order currency rates by crypto first and non crypto after
	let currencyRates: CurrencyCodeToMedianFxRateV1Map = Object.fromEntries(
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

	let allIsPriceUps: Record<string, boolean> = {};

	function updateCurrencyGrp(
		currencyGrp: CurrencyCodeToMedianFxRateV1Map,
		currRate: MedianFxRateV1,
	) {
		Object.keys(currencyGrp)
			.filter((quote) => currRate.quote === quote)
			.map((quote) => {
				const currRateDec = new Decimal(currRate.rate_base_quote);
				const prevRateDec = new Decimal(currencyGrp[quote].rate_base_quote);
				allIsPriceUps[quote] = currRateDec.gt(prevRateDec);

				currencyGrp[quote] = { ...(currencyGrp[quote] || {}), ...currRate };
			});
		return currencyGrp || {};
	}

	let sse: EventSourcePolyfill | undefined = undefined;

	async function subscribeToCurrencyRates(): Promise<void> {
		sse = initFxRatesSubscription();

		sse.onerror = (error) => {
			console.error('error occurred:', error);
		};

		sse.onopen = () => {
			console.log('connected to currency rates server');
		};

		sse.onmessage = (rate) => {
			const currencyRate: MedianFxRateV1 = JSON.parse(rate.data);
			if (currencyRate) {
				currencyRates = {
					...(currencyRates || {}),
					...updateCurrencyGrp(currencyRates, currencyRate),
				};
			}
		};
	}

	let allTimeAgos: Record<string, string> = {};

	// return a map of quote to timeAgo
	function updateTimeAgo() {
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

	let intervalId: number | undefined = undefined;

	onMount(() => {
		subscribeToCurrencyRates();
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

	<div class="grid grid-flow-row-dense gap-4 grid-cols-2 grid-rows-2">
		{#each Object.entries(currencyRates) as [key]}
			{#if currencyRates[key]}
				<CurrencyRateComponent
					currencyRate={currencyRates[key]}
					isPriceUp={allIsPriceUps[key]}
					isCrypto={isCrypto(currencyRates[key].quote)}
					timeAgo={allTimeAgos[key]}
				></CurrencyRateComponent>
			{/if}
		{/each}
	</div>
</div>
