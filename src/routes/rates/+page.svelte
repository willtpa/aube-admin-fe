<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onMount } from 'svelte';
	import CurrencyRateComponent from '$components/currency-rate.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const sseURL = data.sseCurrencyRatesURL;

	let currencyRate: unknown | null = null;
	let supportedCurrency: Record<string, any> = data.supportedCurrency;

	function isPriceUp(targetCurrency: any, currency: any) {
		if (!targetCurrency) {
			return;
		}
		let isPriceUp = 'true';
		if (targetCurrency.rate_base_quote > currency.rate_base_quote) {
			isPriceUp = 'false';
		}
		return isPriceUp;
	}

	function updateCurrencyGrp(currencyGrp: Record<string, any>, currency: any) {
		Object.keys(currencyGrp).forEach((key) => {
			if (currency.quote === key) {
				const price_up = isPriceUp(currencyGrp[key], currency);
				currencyGrp[key] = { ...(currencyGrp[key] || {}), ...currency, ...{ price_up } };
			}
		});
		return currencyGrp || {};
	}

	async function subscribeToCurrencyRates(): Promise<void> {
		const ping = await fetch(`/rates`, { method: 'GET' });
		if (!ping.ok) {
			throw new Error('Ping failed!');
		}
		console.log('Ping is successful!');

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

	async function rateSnapshotByTicker(ticker: string) {
		const result = await fetch(`/rates`, { method: 'GET' });
		if (!result.ok) {
			throw new Error('Get rate snapshot failed!');
		}

		const data = await result.json();

		return data.rates[ticker];
	}

	async function showRateDetails(ticker: string) {
		const modalEl = document.getElementById('rate-details');
		const idEl = document.getElementById('id');
		const ratesCountEl = document.getElementById('rates-count');
		const rateDateEl = document.getElementById('rate-date');
		const baseEl = document.getElementById('base');
		const quoteEl = document.getElementById('quote');
		const rateBaseQuoteEl = document.getElementById('rate-base-quote');
		const rateBaseUsdEl = document.getElementById('rate-base-usd');
		const rateUsdQuoteEl = document.getElementById('rate-usd-quote');
		const providersEl = document.getElementById('providers-contribution');

		const rate = await rateSnapshotByTicker(ticker);
		let providersInfo = '';

		for (const [key, value] of Object.entries(rate.providers_contrib || {})) {
			providersInfo += `${key}: ${value}</br>`;
		}

		(idEl as HTMLElement).innerHTML = `ID: ${rate.id}`;
		(providersEl as HTMLElement).innerHTML = `<b>Providers Contribution</b> </br>${providersInfo}`;
		(ratesCountEl as HTMLElement).innerHTML = `Rates Count: ${rate.rates_count}`;
		(rateDateEl as HTMLElement).innerHTML = `Rate Date: ${rate.created_at}`;
		(baseEl as HTMLElement).innerHTML = `Base: ${rate.base}`;
		(quoteEl as HTMLElement).innerHTML = `Quote: ${rate.quote}`;
		(rateBaseQuoteEl as HTMLElement).innerHTML = `Rate Base Quote: ${rate.rate_base_quote}`;
		(rateBaseUsdEl as HTMLElement).innerHTML = `Rate Base USD: ${rate.rate_base_usd}`;
		(rateUsdQuoteEl as HTMLElement).innerHTML = `Rate USD Quote: ${rate.rate_usd_quote}`;
		(modalEl as any).showModal();
	}

	onMount(subscribeToCurrencyRates);
</script>

<div class="px-5">
	<h1 class="text-2xl font-bold py-5">Currency Rates</h1>

	{#each Object.entries(supportedCurrency) as [key]}
		{#if supportedCurrency[key]}
			<CurrencyRateComponent
				ticker={supportedCurrency[key].quote}
				rateBaseQuote={supportedCurrency[key].rate_base_quote}
				id={supportedCurrency[key].id}
				price_up={supportedCurrency[key].price_up}
				rateProviders={{ ...supportedCurrency[key].providers_contrib }}
			>
				<div class="px-5 flex items-center">
					<button
						class="btn btn-sm btn-outline btn-secondary rounded"
						on:click={async () => await showRateDetails(`${supportedCurrency[key].quote}`)}
						>Details</button
					>
					<dialog id="rate-details" class="modal">
						<div class="modal-box">
							<h3 class="font-bold text-lg">Rate Details</h3>
							<div class="py-2" id="id"></div>
							<div class="py-2" id="providers-contribution"></div>
							<div class="py-2" id="rates-count"></div>
							<div class="py-2" id="rate-date"></div>
							<div class="py-2" id="base"></div>
							<div class="py-2" id="quote"></div>
							<div class="py-2" id="rate-base-quote"></div>
							<div class="py-2" id="rate-base-usd"></div>
							<div class="py-2" id="rate-usd-quote"></div>
							<div class="modal-action">
								<form method="dialog">
									<!-- if there is a button in form, it will close the modal -->
									<button class="btn btn-sm rounded">Close</button>
								</form>
							</div>
						</div>
					</dialog>
				</div>
			</CurrencyRateComponent>
		{/if}
	{/each}
</div>
