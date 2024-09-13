<script lang="ts">
    import type { components } from '$lib/openapi/adminapi.schema';

    export let account: components['schemas']['BankAccount'];
</script>

<ul>
    <li>id: {account.id}</li>
    <li>Category: {account.account_category}</li>
    <li>Locality: {account.account_locality}</li>
    <li>Created At: {account.created_at}</li>
    <li>
        Currency: {account.network_currency_id}
    </li>
    {#if account.account_category === 'bank_account'}
        <li>IBAN: {account.iban}</li>
        <li>BIC: {account.bic}</li>
    {/if}
</ul>
