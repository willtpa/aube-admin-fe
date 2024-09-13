<script lang="ts">
    import { page } from '$app/stores';
    import { type Deposit } from '$services/fiat-payout/deposit';
    import { type Merchant } from '$services/fiat-payout/merchant';
    import { onMount } from 'svelte';
    import { formatFiatAmount } from '$utils/common';
    import { enhance } from '$app/forms';

    interface ReceivedData {
        selections: { [key: string]: Merchant | null | undefined };
        selectedDeposit: Deposit;
    }

    let receivedData: ReceivedData;

    onMount(() => {
        receivedData = ($page['state'] as { data: ReceivedData })['data'];
    });
</script>

{#if receivedData}
    <form method="POST" use:enhance>
        <p class="font-medium">
            Are you confirmed to top up <span class="font-bold">
                {receivedData.selectedDeposit.currency}
                {formatFiatAmount(receivedData.selectedDeposit.amount)}
            </span>
            to
            <span class="font-bold">
                {receivedData.selections[receivedData.selectedDeposit.id]?.name} ({receivedData
                    .selections[receivedData.selectedDeposit.id]?.key})
            </span>
            ?
        </p>
        <input
            type="hidden"
            name="merchant-id"
            value={receivedData.selections[receivedData.selectedDeposit.id]!.id}
        />
        <button type="submit" class="btn btn-primary">Topup</button>
    </form>
{/if}
