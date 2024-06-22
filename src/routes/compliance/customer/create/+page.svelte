<script lang="ts">
    import type { PageData } from './$types.js';
    import AddressInputs from '../../addressInputs.svelte';
    import { superForm } from 'sveltekit-superforms';

    export let data: PageData;

    const { errors, enhance } = superForm(data.form);
    let customerTypeFieldsToShow = 'corporate';
</script>

<div class="mx-auto max-w-4xl mt-5 mb-10">
    <h2 class="text-2xl font-bold mb-4">Create New Customer</h2>
    <form method="POST" use:enhance>
        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-1">
                <label for="customer_type" class="block text-sm font-medium text-gray-700">
                    Type
                </label>
                <select
                    bind:value={customerTypeFieldsToShow}
                    id="customer_type"
                    name="customer_type"
                    class="select select-bordered w-full"
                >
                    <option value="corporate" selected>Corporate</option>
                    <option value="individual">Individual</option>
                </select>
            </div>

            {#if customerTypeFieldsToShow === 'individual'}
                <!-- Individual fields -->
                <div class="col-start-1 col-span-2">
                    <label for="first_name" class="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.first_name ? 'true' : undefined}
                    />
                    {#if $errors.first_name}
                        <span class="invalid text-xs text-red-400">
                            {$errors.first_name}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label for="last_name" class="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="col-span-4">
                    <label for="alias_name" class="block text-sm font-medium text-gray-700">
                        Alias Name
                    </label>
                    <input
                        type="text"
                        id="alias_name"
                        name="alias_name"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="col-span-2">
                    <label for="gender" class="block text-sm font-medium text-gray-700">
                        Gender
                    </label>
                    <select
                        id="trade_name"
                        name="trade_name"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.gender ? 'true' : undefined}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    {#if $errors.gender}
                        <span class="invalid text-xs text-red-400">
                            {$errors.gender}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label for="nationality" class="block text-sm font-medium text-gray-700">
                        Nationality
                    </label>
                    <select
                        id="nationality"
                        name="nationality"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.nationality ? 'true' : undefined}
                    >
                        <option value="">Select Nationality</option>
                    </select>
                    {#if $errors.nationality}
                        <span class="invalid text-xs text-red-400">
                            {$errors.nationality}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label for="birth_country" class="block text-sm font-medium text-gray-700">
                        Country of Birth
                    </label>
                    <select
                        id="birth_country"
                        name="birth_country"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.birth_country ? 'true' : undefined}
                    >
                        <option value="">Select Country</option>
                    </select>
                    {#if $errors.birth_country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.birth_country}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label for="residence_country" class="block text-sm font-medium text-gray-700">
                        Country of Residence
                    </label>
                    <select
                        id="residence_country"
                        name="residence_country"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.residence_country ? 'true' : undefined}
                    >
                        <option>Select Country</option>
                    </select>
                    {#if $errors.residence_country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.residence_country}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="identity_document_type"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Identity Document Type
                    </label>
                    <select
                        id="identity_document_type"
                        name="identity_document_type"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.identity_document_type ? 'true' : undefined}
                    >
                        <option value="">Select Type</option>
                    </select>
                    {#if $errors.identity_document_type}
                        <span class="invalid text-xs text-red-400">
                            {$errors.identity_document_type}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="identity_document_number"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Identity Document Number
                    </label>
                    <input
                        type="text"
                        id="identity_document_number"
                        name="identity_document_number"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.identity_document_number ? 'true' : undefined}
                    />
                    {#if $errors.identity_document_number}
                        <span class="invalid text-xs text-red-400">
                            {$errors.identity_document_number}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="identity_document_issue_date"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Identity Document Issued Date
                    </label>
                    <input
                        type="date"
                        id="identity_document_issue_date"
                        name="identity_document_issue_date"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.identity_document_issue_date ? 'true' : undefined}
                    />
                    {#if $errors.identity_document_issue_date}
                        <span class="invalid text-xs text-red-400">
                            {$errors.identity_document_issue_date}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="identity_document_expiry_date"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Identity Expiry Date
                    </label>
                    <input
                        type="date"
                        id="identity_document_expiry_date"
                        name="identity_document_expiry_date"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.identity_document_expiry_date ? 'true' : undefined}
                    />
                    {#if $errors.identity_document_expiry_date}
                        <span class="invalid text-xs text-red-400">
                            {$errors.identity_document_expiry_date}
                        </span>
                    {/if}
                </div>
            {:else if customerTypeFieldsToShow === 'corporate'}
                <!-- Corporate fields -->
                <div class="col-span-full">
                    <label for="legal_entity_name" class="block text-sm font-medium text-gray-700">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.company_name ? 'true' : undefined}
                    />
                    {#if $errors.company_name}
                        <span class="invalid text-xs text-red-400">
                            {$errors.company_name}
                        </span>
                    {/if}
                </div>
                <div class="col-span-full">
                    <label for="alias_name" class="block text-sm font-medium text-gray-700">
                        Alias Name
                    </label>
                    <input
                        type="text"
                        id="alias_name"
                        name="alias_name"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="col-span-full">
                    <label for="trade_name" class="block text-sm font-medium text-gray-700">
                        Trade Name
                    </label>
                    <input
                        type="text"
                        id="trade_name"
                        name="trade_name"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="col-span-full">
                    <label
                        for="former_registered_name"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Former Registered Name
                    </label>
                    <input
                        type="text"
                        id="former_registered_name"
                        name="former_registered_name"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="col-span-2">
                    <label for="trade_name" class="block text-sm font-medium text-gray-700">
                        Industry
                    </label>
                    <select
                        id="trade_name"
                        name="trade_name"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.industry ? 'true' : undefined}
                    >
                        <option value="">Select Industry</option>
                    </select>
                    {#if $errors.industry}
                        <span class="invalid text-xs text-red-400">
                            {$errors.industry}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="business_registration_number"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Incorporation Number
                    </label>
                    <input
                        type="text"
                        id="incorporation_number"
                        name="incorporation_number"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.incorporation_number ? 'true' : undefined}
                    />
                    {#if $errors.incorporation_number}
                        <span class="invalid text-xs text-red-400">
                            {$errors.incorporation_number}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="country_of_operation"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Country of Operation
                    </label>
                    <select
                        id="operation_country"
                        name="operation_country"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.operation_country ? 'true' : undefined}
                    >
                        <option value="">Select Country</option>
                    </select>
                    {#if $errors.operation_country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.operation_country}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label
                        for="country_of_incorporation"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Country of Incorporation
                    </label>
                    <select
                        id="incorporation_country"
                        name="incorporation_country"
                        class="select select-bordered w-full"
                        aria-invalid={$errors.incorporation_country ? 'true' : undefined}
                    >
                        <option value="">Select Country</option>
                    </select>
                    {#if $errors.incorporation_country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.incorporation_country}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label for="incorporated_at" class="block text-sm font-medium text-gray-700">
                        Date of Incorporation
                    </label>
                    <input
                        type="date"
                        id="incorporation_date"
                        name="incorporation_date"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.incorporation_date ? 'true' : undefined}
                    />
                    {#if $errors.incorporation_date}
                        <span class="invalid text-xs text-red-400">
                            {$errors.incorporation_date}
                        </span>
                    {/if}
                </div>
                <div class="col-span-2">
                    <label for="mcc_code" class="block text-sm font-medium text-gray-700">
                        MCC Code
                    </label>
                    <input
                        type="text"
                        id="mcc_code"
                        name="mcc_code"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.mcc_code ? 'true' : undefined}
                    />
                    {#if $errors.mcc_code}
                        <span class="invalid text-xs text-red-400">
                            {$errors.mcc_code}
                        </span>
                    {/if}
                </div>
                <div class="col-span-full">
                    <label for="website" class="block text-sm font-medium text-gray-700">
                        Website
                    </label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="col-span-full">
                    <label for="business_activity" class="block text-sm font-medium text-gray-700">
                        Business Activity
                    </label>
                    <input
                        type="text"
                        id="business_activity"
                        name="business_activity"
                        class="input input-bordered w-full"
                        aria-invalid={$errors.business_activity ? 'true' : undefined}
                    />
                    {#if $errors.business_activity}
                        <span class="invalid text-xs text-red-400">
                            {$errors.business_activity}
                        </span>
                    {/if}
                </div>
            {/if}

            <div class="col-span-2">
                <label for="source_of_funds" class="block text-sm font-medium text-gray-700">
                    Source of Funds
                </label>
                <select
                    id="source_of_fund"
                    name="source_of_fund"
                    class="select select-bordered w-full"
                    aria-invalid={$errors.source_of_fund ? 'true' : undefined}
                >
                    <option value="">Select</option>
                </select>
                {#if $errors.source_of_fund}
                    <span class="invalid text-xs text-red-400">
                        {$errors.source_of_fund}
                    </span>
                {/if}
            </div>
            <div class="col-span-2">
                <label for="onboarding_mode" class="block text-sm font-medium text-gray-700">
                    Onboarding mode
                </label>
                <select
                    id="onboarding_mode"
                    name="onboarding_mode"
                    class="select select-bordered w-full"
                    aria-invalid={$errors.onboarding_mode ? 'true' : undefined}
                >
                    <option value="">Select</option>
                </select>
                {#if $errors.onboarding_mode}
                    <span class="invalid text-xs text-red-400">
                        {$errors.onboarding_mode}
                    </span>
                {/if}
            </div>
            <div class="col-span-2">
                <input type="checkbox" class="checkbox checkbox-info" />
                <span class="label-text text-left">Active</span>
            </div>

            <!-- Address -->
            <div class="col-span-full mt-5">
                <div class="divider divider-start">Address</div>
                <AddressInputs />
            </div>
            <div class="col-span-full mt-5">
                <button
                    type="submit"
                    class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </div>
    </form>
</div>
