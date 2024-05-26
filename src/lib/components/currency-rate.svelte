<script lang="ts">
	import { type MedianFxRateV1 } from '$lib/services/currency-rate.d';

	export let currencyRate: MedianFxRateV1;
	export let isPriceUp: boolean = false;
	export let isCrypto = false;
	export let timeAgo: string;
</script>

<div>
	<div class="flex px-2 py-2">
		<div class="w-10 flex py-1 justify-center">
			{#if isCrypto}
				<img class="w-4 h-4" src="./{currencyRate.quote}.svg" alt={currencyRate.quote} />
			{:else}
				<span class="text-xs">{currencyRate.quote}</span>
			{/if}
		</div>
		<div
			class="{isPriceUp === true
				? 'bg-green-500'
				: 'bg-red-500'} w-32 flex justify-center rounded bg-opacity-50"
		>
			<span class="text-black text-xs py-1">{currencyRate.rate_base_quote}</span>
		</div>
		<span
			class="{isPriceUp === true ? 'text-green-600' : 'text-red-600'} material-symbols-outlined"
		>
			{isPriceUp === true ? 'arrow_upward' : 'arrow_downward'}
		</span>
		<button
			class="flex items-center text-secondary"
			on:click={() => {
				navigator.clipboard.writeText(currencyRate.rate_base_quote.toString());
			}}
		>
			<span class="material-symbols-outlined"> content_copy </span>
		</button>
		<span class="text-xs py-1 justify-center w-10">({currencyRate.rates_count})</span>
		<span class="text-xs py-1 justify-center w-20">{timeAgo}</span>
		<div class="flex py-1 justify-center w-20">
			{#each Object.entries(currencyRate.providers_contrib) as [key]}
				<img class="w-4 h-4" src="./{key}.svg" alt={key} />
			{/each}
		</div>
	</div>
</div>
