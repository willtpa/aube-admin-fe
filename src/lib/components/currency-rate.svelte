<script lang="ts">
    import { type MedianFxRateV1 } from '$services/currency-rate.d';

    export let currencyRate: MedianFxRateV1;
    export let isPriceUp = true;
    export let isCrypto = false;
    export let timeAgo: string;
</script>

<div>
    <div class="flex px-1 py-1 font-thin">
        <div class="w-8 flex py-1 justify-center">
            {#if isCrypto}
                <img class="w-6 h-6" src="./{currencyRate.quote}.svg" alt={currencyRate.quote} />
            {:else}
                <span class="text-m">{currencyRate.quote}</span>
            {/if}
        </div>
        <div class="w-32 flex justify-center py-1">
            <span class="{isPriceUp === true ? 'text-success' : 'text-error'} text-m">
                {currencyRate.rate_base_quote}
            </span>
        </div>
        <span
            class="{isPriceUp === true
                ? 'text-success'
                : 'text-error'} material-symbols-outlined py-1"
        >
            {isPriceUp === true ? 'arrow_upward' : 'arrow_downward'}
        </span>
        <button
            class="flex items-center text-secondary"
            on:click={async (): Promise<void> => {
                await navigator.clipboard.writeText(currencyRate.rate_base_quote.toString());
            }}
        >
            <span class="material-symbols-outlined">content_copy</span>
        </button>
        <span class="text-sm py-1 justify-center w-40">
            {timeAgo} - {currencyRate.rates_count} rate(s)
        </span>
        <div class="flex py-1 justify-center w-20">
            {#each Object.entries(currencyRate.providers_contrib) as [key]}
                <img class="w-6 h-6" src="./{key}.svg" alt={key} />
            {/each}
        </div>
    </div>
</div>
