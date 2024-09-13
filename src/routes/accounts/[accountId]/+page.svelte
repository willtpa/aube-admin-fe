<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<h1 class="m-2">Account Details</h1>
<hr class="mb-2" />
<div>
    <p>
        Posted Balance {data.detail.balance.network_currency_id}
        {data.detail.balance.posted_balance}
    </p>
    <p>
        Pending Balance {data.detail.balance.network_currency_id}
        {data.detail.balance.pending_balance}
    </p>
</div>
