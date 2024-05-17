<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	let messages: unknown[] = [];

	onMount(() => {
		const sse = new EventSource(`${data.sseCurrencyRates}`);

		sse.onmessage = (rate) => {
			messages = [...messages, rate.data];
		};
	});
</script>

<h1>Rate Page</h1>

<ul>
	{#each messages as message}
		<li>{message}</li>
	{/each}
</ul>
