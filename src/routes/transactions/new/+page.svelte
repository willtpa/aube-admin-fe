<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { AccountCategory } from '$lib/openapi/types.js';
    import type { components } from '$lib/openapi/adminapi.schema';
    import type { PageData } from './$types';
    import AlertError from '$components/alert-error.svelte';

    export let data: PageData;

    const { errors, enhance, message } = superForm(data.form);
    const accounts = data.accounts.data;

    async function getEntity(
        id: string,
    ): Promise<
        components['schemas']['IndividualEntity'] | components['schemas']['CorporateEntity']
    > {
        const response = await fetch(`/entities/${id}`);
        return (await response.json()) as
            | components['schemas']['IndividualEntity']
            | components['schemas']['CorporateEntity'];
    }

    async function getBalance(accountId: string): Promise<components['schemas']['Balance']> {
        const response = await fetch(`/accounts/${accountId}/balance`);
        return (await response.json()) as components['schemas']['Balance'];
    }

    async function updateToAccount(): Promise<void> {
        toAccount = accounts.find((account) => account.id === toAccountId);
        if (!toAccount) return;
        toEntity = await getEntity(toAccount.owner_entity_id ?? '');
        toAccountBalance = await getBalance(toAccountId);
    }

    async function updateFromAccount(): Promise<void> {
        fromAccount = accounts.find((account) => account.id === fromAccountId);
        if (!fromAccount) return;
        fromEntity = await getEntity(fromAccount.owner_entity_id ?? '');
        fromAccountBalance = await getBalance(fromAccountId);
    }

    let fromAccountId: string;
    let fromAccountBalance: components['schemas']['Balance'] | undefined;
    let fromAccount:
        | undefined
        | (components['schemas']['BankAccount'] &
              components['schemas']['CryptoAccount'] &
              components['schemas']['VirtualAccount']);
    let fromEntity:
        | undefined
        | components['schemas']['IndividualEntity']
        | components['schemas']['CorporateEntity'];
    let toAccountId: string;
    let toAccountBalance: components['schemas']['Balance'] | undefined;
    let toAccount:
        | undefined
        | (components['schemas']['BankAccount'] &
              components['schemas']['CryptoAccount'] &
              components['schemas']['VirtualAccount']);
    let toEntity:
        | undefined
        | components['schemas']['IndividualEntity']
        | components['schemas']['CorporateEntity'];
    let amount: number | 0;
</script>

<div class="container mx-auto">
    <h1 class="m-2">Create Transaction</h1>
    <hr class="mb-2" />

    {#if $message}
        <AlertError message={$message} />
    {/if}

    <form class="flex flex-wrap" method="POST" use:enhance>
        <div class="md:w-1/4">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="from_account_id">From Account</label>
                    <select
                        bind:value={fromAccountId}
                        on:change={updateFromAccount}
                        name="from_account_id"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.from_account_id ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each accounts as account}"
                            <option value={account.id}>{account.label}</option>
                        {/each}
                    </select>
                    {#if $errors.from_account_id}
                        <span class="invalid text-xs text-red-400">
                            {$errors.from_account_id}
                        </span>
                    {/if}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="to_account_id">To Account</label>
                    <select
                        bind:value={toAccountId}
                        on:change={updateToAccount}
                        name="to_account_id"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.to_account_id ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each accounts as account}"
                            <option value={account.id}>{account.label}</option>
                        {/each}
                    </select>
                    {#if $errors.to_account_id}
                        <span class="invalid text-xs text-red-400">
                            {$errors.to_account_id}
                        </span>
                    {/if}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="amount">Amount</label>
                    <input
                        bind:value={amount}
                        name="amount"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="number"
                        placeholder="100.00"
                        aria-invalid={$errors.amount ? 'true' : undefined}
                    />
                    {#if $errors.amount}
                        <span class="invalid text-xs text-red-400">
                            {$errors.amount}
                        </span>
                    {/if}
                </div>
            </div>
        </div>

        <div class="card bg-base-100 w-96 shadow-xl md:w-3/4">
            <div class="card-body">
                <div class="flex flex-wrap">
                    <div class="md:w-2/5">
                        <h2 class="card-title">Payer</h2>
                        <ul>
                            {#if fromEntity && fromAccount}
                                <li>
                                    <b>Entity ID :</b>
                                    {fromEntity.id}
                                </li>
                                <li>
                                    <b>Entity Type :</b>
                                    {fromEntity.entity_type}
                                </li>
                                <li>
                                    <b>Name :</b>
                                    {fromEntity.name}
                                </li>
                                <li>
                                    <b>Email :</b>
                                    {fromEntity.email}
                                </li>
                                <li>
                                    <b>Account ID :</b>
                                    {fromAccount.id}
                                </li>
                                <li>
                                    <b>Label :</b>
                                    {fromAccount.label}
                                </li>
                                <li>
                                    <b>Network Currency ID :</b>
                                    {fromAccount.network_currency_id}
                                </li>
                                {#if fromAccount.account_category === AccountCategory['Bank account']}
                                    <li>
                                        <b>IBAN :</b>
                                        {fromAccount.iban}
                                    </li>
                                    <li>
                                        <b>BIC :</b>
                                        {fromAccount.bic}
                                    </li>
                                {/if}
                                <li>
                                    <b>Balance :</b>
                                    {fromAccountBalance
                                        ? fromAccountBalance.posted_balance +
                                          ' ' +
                                          fromAccountBalance.network_currency_id
                                        : 0}
                                </li>
                                <li>
                                    <b>Created At :</b>
                                    {fromAccount.created_at}
                                </li>
                            {/if}
                        </ul>
                    </div>
                    <div class="md:w-2/5">
                        <h2 class="card-title">Recipient</h2>
                        <ul>
                            {#if toEntity && toAccount}
                                <li>
                                    <b>Entity ID :</b>
                                    {toEntity.id}
                                </li>
                                <li>
                                    <b>Entity Type :</b>
                                    {toEntity.entity_type}
                                </li>
                                <li>
                                    <b>Name :</b>
                                    {toEntity.name}
                                </li>
                                <li>
                                    <b>Email :</b>
                                    {toEntity.email}
                                </li>
                                <li>
                                    <b>Account ID :</b>
                                    {toAccount.id}
                                </li>
                                <li>
                                    <b>Label :</b>
                                    {toAccount.label}
                                </li>
                                <li>
                                    <b>Network Currency ID :</b>
                                    {toAccount.network_currency_id}
                                </li>
                                {#if toAccount.account_category === AccountCategory['Bank account']}
                                    <li>
                                        <b>IBAN :</b>
                                        {toAccount.iban}
                                    </li>
                                    <li>
                                        <b>BIC :</b>
                                        {toAccount.bic}
                                    </li>
                                {/if}
                                <li>
                                    <b>Balance :</b>
                                    {toAccountBalance
                                        ? toAccountBalance.posted_balance +
                                          ' ' +
                                          toAccountBalance.network_currency_id
                                        : 0}
                                </li>
                                <li>
                                    <b>Created At :</b>
                                    {toAccount.created_at}
                                </li>
                            {/if}
                        </ul>
                    </div>
                    <div class="md:w-1/5">
                        <h2 class="card-title">Amount</h2>
                        <p class="font-bold">
                            {amount}
                            {fromAccount ? fromAccount.network_currency_id : ''}
                        </p>
                    </div>
                </div>
                <div class="card-actions justify-end align-middle">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <button class="btn btn-accent text-white" type="submit">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
