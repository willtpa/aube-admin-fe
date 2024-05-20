<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onMount } from 'svelte';
	import CurrencyRateComponent from '$components/currency-rate.svelte';

	let currency: any = null;
	let currencyGrp: Record<string, any> = {
		BTC: null,
		ETH: null,
		SOL: null,
		MATIC: null
	};

	async function readFile(filePath: string) {
		try {
			const content = await fetch(filePath);
			const result = await content.text();
			return JSON.parse(result);
		} catch (error) {
			console.error('Error reading file:', error);
		}
	}

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

	async function subscribeToData() {
		const data = await readFile('currencyrates.sample.json');
		setInterval(
			() => {
				const rnd = Math.floor(Math.random() * data.length);
				currency = { ...data[rnd] };

				if (currency) {
					currencyGrp = { ...(currencyGrp || {}), ...updateCurrencyGrp(currencyGrp, currency) };
				}
			},
			Math.floor(Math.random() * 1_000) + 100
		);
	}

	onMount(subscribeToData);
</script>

{#each Object.entries(currencyGrp) as [key]}
	{#if currencyGrp[key]}
		<CurrencyRateComponent
			ticker={currencyGrp[key].quote}
			rate_base_quote={currencyGrp[key].rate_base_quote}
			id={currencyGrp[key].id}
			color={currencyGrp[key].color}
		/>
	{/if}
{/each}
