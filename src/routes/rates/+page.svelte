<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onMount } from 'svelte';
	import CurrencyRateComponent from '$components/currency-rate.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const sseURL = data.sseCurrencyRatesURL;
	let currencyRate: unknown | null = null;
	let supportedCurrency: Record<string, any> = data.supportedCurrency;

	function upOrDown(targetCurrency: any, currency: any) {
		if (!targetCurrency) {
			return;
		}
		let color = 'green';
		if (targetCurrency.rate_base_quote > currency.rate_base_quote) {
			color = 'red';
		}
		return color;
	}

	function updateCurrencyGrp(currencyGrp: Record<string, any>, currency: any) {
		Object.keys(currencyGrp).forEach((key) => {
			if (currency.quote === key) {
				const color = upOrDown(currencyGrp[key], currency);
				currencyGrp[key] = { ...(currencyGrp[key] || {}), ...currency, ...{ color } };
			}
		});
		return currencyGrp || {};
	}

	async function subscribeToCurrencyRates(): Promise<void> {
		const sse = new EventSource(`${sseURL}`);
		sse.onmessage = (rate) => {
			currencyRate = JSON.parse(rate.data);
			if (currencyRate) {
				supportedCurrency = {
					...(supportedCurrency || {}),
					...updateCurrencyGrp(supportedCurrency, currencyRate),
				};
			}
		};
	}

	onMount(subscribeToCurrencyRates);
</script>

{#each Object.entries(supportedCurrency) as [key]}
	{#if supportedCurrency[key]}
		<CurrencyRateComponent
			ticker={supportedCurrency[key].quote}
			rate_base_quote={supportedCurrency[key].rate_base_quote}
			id={supportedCurrency[key].id}
			color={supportedCurrency[key].color}
		/>
	{/if}
{/each}
