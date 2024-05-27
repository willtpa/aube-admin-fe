<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let inputCurrencyId = data.networkCurrencyId;
    let inputFromDate = data.fromDate;
    let inputToDate = data.toDate;
</script>

<h1 class="m-2">Account Details</h1>
<hr class="mb-2" />

<fieldset class="border border-solid border-gray-300 p-2 w-fit">
    <legend>{data.detail.id}</legend>
    <form method="GET" action="?/search">
        <div class="md:flex md:items-center mb-4">
            <div class="md:w-24">
                <label
                    class="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="networkCurrencyId"
                >
                    Currency
                </label>
            </div>
            <select
                name="networkCurrencyId"
                class="select select-bordered"
                bind:value={inputCurrencyId}
                on:change={(): string => inputCurrencyId}
            >
                <option disabled>Select currency</option>
                {#each Object.keys(data.detail.balances) as currency}
                    <option value={currency}>{currency}</option>
                {/each}
            </select>
        </div>
        <div class="md:flex md:items-center mb-4">
            <div class="md:w-24">
                <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="fromDate">
                    From
                </label>
            </div>
            <div>
                <input
                    id="fromDate"
                    name="fromDate"
                    type="datetime-local"
                    bind:value={inputFromDate}
                    step="1"
                />
            </div>
        </div>
        <div class="md:flex md:items-center mb-4">
            <div class="md:w-24">
                <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="toDate">
                    To
                </label>
            </div>
            <div>
                <input
                    id="toDate"
                    name="toDate"
                    type="datetime-local"
                    bind:value={inputToDate}
                    step="1"
                />
            </div>
        </div>
        <button class="btn">Submit</button>
    </form>
</fieldset>

<div>
    <span>Balance </span>
    <span>{data.networkCurrencyId ? data.detail.balances[data.networkCurrencyId] : ''}</span>
</div>

<table class="table">
    <thead>
        <tr>
            <th>Amount</th>
            <th>From Account ID</th>
            <th>To Account ID</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {#each data.detail.transactions as tx}
            <tr>
                <td>{tx.amount}</td>
                <td>
                    {#if tx.fromAccountURL}
                        <a class="link link-neutral" href={tx.fromAccountURL}>{tx.fromAccountID}</a>
                    {:else}
                        {tx.fromAccountID}
                    {/if}
                </td>
                <td>
                    {#if tx.toAccountURL}
                        <a class="link link-neutral" href={tx.toAccountURL}>{tx.toAccountID}</a>
                    {:else}
                        {tx.toAccountID}
                    {/if}
                </td>
                <td>{tx.createdAt}</td>
            </tr>
        {/each}
    </tbody>
</table>
