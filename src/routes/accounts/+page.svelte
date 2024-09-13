<script lang="ts">
    import type { PageData } from './$types';
    import { accountLocality } from './schema';

    export let data: PageData;

    let inputLocality = data.accountLocality;
</script>

<main class="mx-auto max-w-[1050px] mt-8">
    <h1>Accounts</h1>
    <fieldset class="border border-solid border-gray-300 p-2 w-fit">
        <form method="GET" action="?/search">
            <div class="md:flex md:items-center mb-4">
                <div class="md:w-24">
                    <label
                        class="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="accountLocality"
                    >
                        Locality
                    </label>
                </div>
                <select
                    name="accountLocality"
                    class="select select-bordered"
                    bind:value={inputLocality}
                >
                    <option value="" disabled selected>Select Locality</option>
                    {#each Object.values(accountLocality) as locality}
                        <option value={locality}>{locality}</option>
                    {/each}
                </select>
            </div>
            <button class="btn">Submit</button>
        </form>
    </fieldset>
    <table class="table">
        <thead>
            <tr>
                <th class="capitalize">Label</th>
                <th class="capitalize">Account Category</th>
                <th class="capitalize">Network Currency ID</th>
                <th class="capitalize">Account Locality</th>
                <th class="capitalize">Action</th>
            </tr>
        </thead>
        <tbody>
            {#if data.data.length === 0}
                <tr>
                    <td colspan="4" class="text-center">No account</td>
                </tr>
            {:else}
                {#each data.data as acct}
                    <tr>
                        <!-- <td>{acct.id}</td> -->
                        <td>{acct.label}</td>
                        <td>{acct.account_category}</td>
                        <td>{acct.network_currency_id}</td>
                        <td>{acct.account_locality}</td>
                        <td>
                            <a class="btn text-white" href="/accounts/{acct.id}">See details</a>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</main>
