<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	// let messages: any[] = [];

	let btc = 'BTC';
	let eth = 'ETH';
	let matic = 'MATIC';
	let sol = 'SOL';

	let btcData: { [key: string]: unknown } | null = null;
	let ethData: { [key: string]: unknown } | null = null;
	let maticData: { [key: string]: unknown } | null = null;
	let solData: { [key: string]: unknown } | null = null;

	onMount(() => {
		console.log(data.sseCurrencyRates);
		const sse = new EventSource(`${data.sseCurrencyRates}`);

		sse.onmessage = (rate) => {
			// messages = [...messages, event.data];
			const parsedData = JSON.parse(rate.data);
			if (parsedData.quote === btc) {
				let color = 'green';
				if (!!btcData && btcData.rate_base_quote > parsedData.rate_base_quote) {
					color = 'red';
				}
				btcData = { ...parsedData, ...{ color } };
			} else if (parsedData.quote === eth) {
				let color = 'green';
				if (!!ethData && ethData.rate_base_quote > parsedData.rate_base_quote) {
					color = 'red';
				}
				ethData = { ...parsedData, ...{ color } };
			} else if (parsedData.quote === matic) {
				let color = 'green';
				if (!!maticData && maticData.rate_base_quote > parsedData.rate_base_quote) {
					color = 'red';
				}
				maticData = { ...parsedData, ...{ color } };
			} else if (parsedData.quote === sol) {
				let color = 'green';
				if (!!solData && solData.rate_base_quote > parsedData.rate_base_quote) {
					color = 'red';
				}
				solData = { ...parsedData, ...{ color } };
			}
		};
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<h1>Messages</h1>

<!-- <ul>
	{#each messages as message}
		<li>{message}</li>
	{/each}
</ul> -->

{#if btcData}
	<div class="border rounded p-4 mb-4">
		<h3 class="text-xl mb-2">
			{btcData.quote}/USD:
			<span
				class="{btcData.color === 'green'
					? 'bg-green-500'
					: 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{btcData.rate_base_quote}</span
			>
		</h3>
		<!--<p class="{btcData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded max-w-sm">{btcData.id}</p>-->
		<p class="text-black p-2 rounded max-w-sm">{btcData.id}</p>
	</div>
{/if}

{#if ethData}
	<div class="border rounded p-4 mb-4">
		<h3 class="text-xl mb-2">
			{ethData.quote}/USD:
			<span
				class="{ethData.color === 'green'
					? 'bg-green-500'
					: 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{ethData.rate_base_quote}</span
			>
		</h3>
		<!--<p class="{ethData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded">{ethData.id} - {ethData.rate_base_quote}</p>-->
		<p class="text-black p-2 rounded max-w-sm">{ethData.id}</p>
	</div>
{/if}

{#if maticData}
	<div class="border rounded p-4 mb-4">
		<h3 class="text-xl mb-2">
			{maticData.quote}/USD:
			<span
				class="{maticData.color === 'green'
					? 'bg-green-500'
					: 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{maticData.rate_base_quote}</span
			>
		</h3>
		<!--<p class="{maticData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded">{maticData.id} - {maticData.rate_base_quote}</p>-->
		<p class="text-black p-2 rounded max-w-sm">{maticData.id}</p>
	</div>
{/if}

{#if solData}
	<div class="border rounded p-4 mb-4">
		<h3 class="text-xl mb-2">
			{solData.quote}/USD:
			<span
				class="{solData.color === 'green'
					? 'bg-green-500'
					: 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{solData.rate_base_quote}</span
			>
		</h3>
		<!--<p class="{solData.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-black p-2 rounded">{solData.id} - {solData.rate_base_quote}</p>-->
		<p class="text-black p-2 rounded max-w-sm">{solData.id}</p>
	</div>
{/if}
