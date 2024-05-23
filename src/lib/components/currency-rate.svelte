<script>
	export let ticker;
	export let price_up;
	export let rateBaseQuote;
	export let id;
	export let rateProviders;
</script>

<div class="py-1">
	<div class="flex border rounded p-2">
		<div class="flex px-1">
			<div class="text-sm flex justify-between w-48">
				<div class="flex items-center">
					<div class="px-1">
						<img class="w-8 h-8" src="./{ticker}.svg" alt="" />
					</div>
				</div>
				<div
					class="{price_up === 'true'
						? 'bg-green-500'
						: 'bg-red-500'} text-black px-2 rounded bg-opacity-50 flex items-center"
				>
					<span>{rateBaseQuote}</span>
				</div>
			</div>
			<div>
				<span
					class="{price_up === 'true'
						? 'text-green-600'
						: 'text-red-600'} material-symbols-outlined"
				>
					{price_up === 'true' ? 'arrow_upward' : 'arrow_downward'}
				</span>
			</div>
			<button
				class="flex items-center text-secondary"
				on:click={() => {
					navigator.clipboard.writeText(rateBaseQuote);
					alert(`Copied ${ticker} rate: ${rateBaseQuote} (id:${id})`);
				}}
			>
				<span class="material-symbols-outlined"> content_copy </span>
			</button>
		</div>

		<div class="px-5 flex items-center w-48">
			{#each Object.entries(rateProviders) as [key]}
				<img class="w-8 h-8" src="./{key}.svg" alt="" />
			{/each}
		</div>
		<div class="flex">
			<slot></slot>
		</div>
	</div>
</div>
