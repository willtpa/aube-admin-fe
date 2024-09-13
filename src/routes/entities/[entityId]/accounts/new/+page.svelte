<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import {
        AccountCategory,
        AccountLocality,
        CreateAccountNetworkCurrencyId,
    } from '$lib/openapi/types';
    import type { PageData } from './$types';

    export let data: PageData;

    const entity = data.entity;

    const { errors, enhance, message } = superForm(data.form);
    const currencies = Object.entries(CreateAccountNetworkCurrencyId);
    const categories = Object.entries(AccountCategory);
    const localities = Object.entries(AccountLocality);

    let accountCategory = '';
    let accountLocality = '';
</script>

<div class="container mx-auto">
    <h1 class="m-2">Create Account</h1>
    <h2>{entity.id} / {entity.name}</h2>
    <hr class="mb-2" />

    {#if $message}
        <div role="alert" class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{$message}</span>
        </div>
    {/if}

    <div>
        <form class="w-full max-w-lg" method="POST" use:enhance>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3">
                    <label class="label-text" for="label">Label</label>
                    <input
                        name="label"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder="Main account"
                        aria-invalid={$errors.label ? 'true' : undefined}
                    />
                    {#if $errors.label}
                        <span class="invalid text-xs text-red-400">
                            {$errors.label}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="account_category">Account Category</label>
                    <select
                        bind:value={accountCategory}
                        name="account_category"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.account_category ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each categories as [key, category]}"
                            <option value={category}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.account_category}
                        <span class="invalid text-xs text-red-400">
                            {$errors.account_category}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="locality">Locality</label>
                    <select
                        bind:value={accountLocality}
                        name="account_locality"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.account_locality ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each localities as [key, locality]}"
                            <option value={locality}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.account_locality}
                        <span class="invalid text-xs text-red-400">
                            {$errors.account_locality}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="network_currency_id">Network currency ID</label>
                    <select
                        name="network_currency_id"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.network_currency_id ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each currencies as [key, currency]}"
                            <option value={currency}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.network_currency_id}
                        <span class="invalid text-xs text-red-400">
                            {$errors.network_currency_id}
                        </span>
                    {/if}
                </div>
            </div>

            {#if accountCategory === AccountCategory['Bank account'] && accountLocality === AccountLocality.External}
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="label-text" for="IBAN">IBAN</label>
                        <input
                            name="IBAN"
                            class="input input-sm input-bordered rounded w-full max-w-xs"
                            type="text"
                            placeholder="Main account"
                            aria-invalid={$errors.IBAN ? 'true' : undefined}
                        />
                        {#if $errors.IBAN}
                            <span class="invalid text-xs text-red-400">
                                {$errors.IBAN}
                            </span>
                        {/if}
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="label-text" for="BIC">BIC</label>
                        <input
                            name="BIC"
                            class="input input-sm input-bordered rounded w-full max-w-xs"
                            type="text"
                            placeholder="Main account"
                            aria-invalid={$errors.BIC ? 'true' : undefined}
                        />
                        {#if $errors.BIC}
                            <span class="invalid text-xs text-red-400">
                                {$errors.BIC}
                            </span>
                        {/if}
                    </div>
                </div>
            {/if}

            <div>
                <input type="hidden" name="entity_id" value={entity.id} />
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <button class="btn btn-accent text-white" type="submit">Create</button>
                </div>
            </div>
        </form>
    </div>
</div>
