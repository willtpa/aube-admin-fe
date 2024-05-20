<!-- ChildComponent.svelte -->
<script>
	export let ticker;
	export let color;
	export let rate_base_quote;
	export let id;
</script>

<div>
	<div class="border rounded p-4 mb-4">
		<h3 class="text-xl mb-2">
			{ticker}/USD:
			<span
				class="{color === 'green'
					? 'bg-green-500'
					: 'bg-red-500'} text-black p-2 rounded bg-opacity-50">{rate_base_quote}</span
			>
		</h3>
		<p class="text-black p-2 rounded max-w-sm">{id}</p>
	</div>
</div>
