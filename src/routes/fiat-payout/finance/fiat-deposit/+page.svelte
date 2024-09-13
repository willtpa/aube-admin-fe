<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';

    // utils
    import { formatToSGTime, formatFiatAmount } from '$utils/common';
    import { DEPOSIT_PER_PAGE } from '$utils/constant';
    import { goto } from '$app/navigation';

    // services
    import {
        type Deposit,
        DepositFilterSchema,
        depositStatus,
        bankAccount,
        sort,
        order,
    } from '$services/fiat-payout/deposit';
    import { type Merchant } from '$services/fiat-payout/merchant';

    // forms
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import SelectField from '$components/form-fields/SelectField.svelte';
    import InputField from '$components/form-fields/InputField.svelte';

    // props
    export let data: PageData;

    export const statusMapping: { [key: string]: string } = {
        created: 'Open',
        captured: 'Done',
        reversed: 'Cancelled',
        ignored: 'Ignored',
    };

    const form = superForm(data.form, {
        validators: zodClient(DepositFilterSchema),
        resetForm: false,
    });
    const { form: formData } = form;

    // Initialize data
    $: depositData = data.deposits;
    $: depositCount = data.depositCount;
    const merchantData = data.merchants;
    let selections: { [key: string]: Merchant | null | undefined } = {};
    let selectedDeposit: Deposit | null = null;
    let dialogRef: HTMLDialogElement;
    $: pageOptions = Array.from(
        { length: Math.ceil(depositCount / DEPOSIT_PER_PAGE) },
        (_, index) => ({
            label: `${index + 1}`,
            value: `${index + 1}`,
        }),
    );

    function createSelections(): void {
        depositData.forEach((deposit) => {
            if (!(deposit.id in selections)) {
                selections[deposit.id] = null;
            }
            return selections;
        });
    }

    function isTopupRequired(status: string): boolean {
        return status === 'created';
    }

    async function topupDeposit(deposit: Deposit): Promise<void> {
        selectedDeposit = deposit;

        if (selections[selectedDeposit.id]) {
            await goto(`/fiat-payout/finance/fiat-deposit/${selectedDeposit.id}`, {
                state: { data: { selections, selectedDeposit } },
            });
        } else {
            const modal = dialogRef;
            modal.showModal();
        }
    }

    function merchantSelectionChangeHandler(depositId: string, event: Event): void {
        const target = event.target as HTMLSelectElement;
        selections[depositId] = merchantData.find(
            (merchant) => merchant.id === Number(target.value),
        );
        selections = { ...selections };
    }

    async function downloadCSV(): Promise<void> {
        try {
            let queryString = '';
            if ($formData.status) {
                queryString += `&status=${$formData.status}`;
            }

            if ($formData.bankAccount) {
                queryString += `&bank_account=${$formData.bankAccount}`;
            }

            if ($formData.fromDate) {
                queryString += `&from_deposit_date=${$formData.fromDate}`;
            }

            if ($formData.toDate) {
                queryString += `&to_deposit_date=${$formData.toDate}`;
            }
            const response = await fetch(
                `/fiat-payout/finance/fiat-deposit/api/fiat-payout-download-deposit-csv?${queryString}`,
            );
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'deposit_data.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to download CSV:', response.statusText);
            }
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    }

    onMount(async () => {
        createSelections();
    });
</script>

<h1>Fiat Payout Deposit</h1>

<form action="?" method="GET">
    <div class="grid grid-cols-3 gap-2 items-center">
        <SelectField {form} name="status" options={depositStatus} label="Deposit Status" />
        <SelectField {form} name="bankAccount" options={bankAccount} label="Bank Account" />
        <InputField {form} name="fromDate" label="From" type="date" />
        <InputField {form} name="toDate" label="To" type="date" />
        <SelectField {form} name="sort" options={sort} label="Sort By" />
        <SelectField {form} name="order" options={order} label="Order" />
        <SelectField {form} name="page" options={pageOptions} label="Page" />
    </div>

    <div class="flex mt-4 gap-2">
        <button type="submit" class="btn btn-primary text-white">Submit</button>
        <button class="btn btn-primary text-white" on:click={(): void => form.reset()}>
            Clear form
        </button>
        <button
            class="btn btn-primary text-white"
            on:click={async (): Promise<void> => downloadCSV()}
        >
            Download CSV
        </button>
    </div>
</form>

<!-- DEPOSIT TABLE -->
<table class="table table-sm table-zebra">
    <thead>
        <tr>
            <th class="text-center">Deposit Date (SG Time)</th>
            <th class="text-center">Topped Up Date (SG Time)</th>
            <th class="text-center">Sender Name</th>
            <th class="text-center">Bank Account</th>
            <th class="text-center">Deposit Currency</th>
            <th class="text-center">Deposit Amount</th>
            <th class="text-center">Remarks</th>
            <th class="text-center">Deposit Status</th>
            <th class="text-center">Topped up to</th>
            <th class="text-center">Action</th>
        </tr>
    </thead>
    <tbody>
        {#each depositData as deposit (deposit.id)}
            <tr>
                <td class="text-center">{formatToSGTime(deposit.created_at)}</td>
                <td class="text-center">{formatToSGTime(deposit.updated_at)}</td>
                <td class="text-center">{deposit.sender?.name ? deposit.sender.name : '-'}</td>
                <td class="text-center">{deposit.bank_account ? deposit.bank_account : '-'}</td>
                <td class="text-center">{deposit.currency}</td>
                <td class="text-center">{formatFiatAmount(deposit.amount)}</td>
                <td class="text-center">{deposit.remarks ? deposit.remarks : '-'}</td>
                <td class="text-center">{statusMapping[deposit.status]}</td>
                <td class="text-center">
                    {#if deposit.merchant}
                        {`${deposit.merchant.mcnt_name} (${deposit.merchant.mcnt_key})`}
                    {:else}
                        <select
                            class="select select-bordered w-full max-w-xs rounded"
                            on:change={(event): void =>
                                merchantSelectionChangeHandler(deposit.id, event)}
                        >
                            <option value="" disabled selected>Select a merchant</option>
                            {#each merchantData as merchant (merchant.id)}
                                <option value={merchant.id}>
                                    {`${merchant.name} (${merchant.key})`}
                                </option>
                            {/each}
                        </select>
                    {/if}
                </td>
                <td class="text-center">
                    {#if isTopupRequired(deposit.status)}
                        <button
                            class="btn btn-primary rounded text-white"
                            name="topup-btn"
                            on:click={async (): Promise<void> => topupDeposit(deposit)}
                        >
                            Topup
                        </button>
                    {:else}
                        -
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- Modal (as a preview before topup) -->
<dialog bind:this={dialogRef} class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
        <p>Please select a merchant to topup</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
            </form>
        </div>
    </div>
</dialog>
