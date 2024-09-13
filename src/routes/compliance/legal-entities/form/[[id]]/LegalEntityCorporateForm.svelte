<script lang="ts">
    import SuperDebug, { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        updateCorporateSchema,
        createCorporateSchema,
        type CreateCorporateSchema,
        type UpdateCorporateSchema,
    } from './schemas';
    import SelectField from '$components/form-fields/SelectField.svelte';
    import InputField from '$components/form-fields/InputField.svelte';
    import { page } from '$app/stores';
    import {
        countryOptions,
        countryOptionsValues,
        kybStatusOptions,
        onboardingModeOptions,
    } from '$utils/form';
    import MultiSelectField from '$components/form-fields/MultiSelectField.svelte';
    import ChipsInputField from '$components/form-fields/ChipsInputField.svelte';
    import { dev } from '$app/environment';
    import SubmitButton from '$components/form-fields/SubmitButton.svelte';

    interface Props {
        data: SuperValidated<Infer<CreateCorporateSchema | UpdateCorporateSchema>>;
    }

    const { data }: Props = $props();

    const form = superForm(data, {
        validators: zodClient($page.params['id'] ? updateCorporateSchema : createCorporateSchema),
        resetForm: false,
        dataType: 'json', // Because there is nested data for addresses
    });

    const { enhance, form: formData } = form;

    function addAddress() {
        $formData.addresses = [
            ...$formData.addresses,
            {
                address_line_one: '',
                address_line_two: '',
                city: '',
                state_region: '',
                postal_code: '',
                country: countryOptionsValues[0],
            },
        ];
    }

    function removeAddress(i: number) {
        $formData.addresses.splice(i, 1);

        $formData.addresses = [...$formData.addresses];
    }
</script>

<form method="POST" action="?/corporate" use:enhance>
    <div class="grid grid-cols-2 gap-4">
        <SelectField {form} name="kyb_status" options={kybStatusOptions} label="KYB Status" />
        <SelectField
            {form}
            name="onboarding_mode"
            options={onboardingModeOptions}
            label="Onboarding Mode"
        />
        <InputField {form} name="company_name" label="Company Name" />
        <ChipsInputField {form} name="alias_names" label="Alias Names" />
        <ChipsInputField {form} name="trade_names" label="Trade Names" />
        <ChipsInputField {form} name="former_registered_names" label="Former Registered Name" />
        <InputField {form} name="incorporation_date" label="Date of Incorporation" type="date" />
        <InputField {form} name="incorporation_number" label="Incorporation Number" />
        <SelectField
            {form}
            name="incorporation_country"
            options={countryOptions}
            label="Country of Incorporation"
        />
        <MultiSelectField
            {form}
            name="operation_countries"
            options={countryOptions}
            label="Countries of Operation"
        />
        <ChipsInputField {form} name="websites" label="Websites" />
        <InputField {form} name="industry" label="Industry" />
        <ChipsInputField {form} name="mcc_codes" label="MCC Codes" />
        <ChipsInputField {form} name="business_activities" label="Business Activities" />
        <ChipsInputField {form} name="sources_of_fund" label="Sources of Funds" />

        <div class="col-span-full mt-5 flex justify-between">
            <h3 class="divider divider-start">Addresses</h3>
            <button class="btn btn-secondary" type="button" onclick={addAddress}>
                Add Address
            </button>
        </div>

        {#if $formData.addresses}
            {#each $formData.addresses as _, i}
                {@render addressFields(i)}
            {/each}
        {/if}

        <div class="col-span-full mt-5">
            <SubmitButton class="w-full" />
        </div>
    </div>
</form>

<SuperDebug data={$formData} display={dev} />

{#snippet addressFields(i: number)}
    <div class="col-span-full grid grid-cols-2 gap-4">
        <div class="col-span-full flex justify-between items-center">
            <div class="col-span-full font-bold">Address {i + 1}</div>
            <button
                type="button"
                class="btn btn-circle btn-sm btn-error"
                onclick={() => removeAddress(i)}
                title="Remove Address"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <InputField {form} name="addresses[{i}].id" type="hidden" class="hidden" />
        <InputField {form} name="addresses[{i}].address_line_one" label="Line One" />
        <InputField {form} name="addresses[{i}].address_line_two" label="Line Two" />
        <InputField {form} name="addresses[{i}].city" label="City" />
        <InputField {form} name="addresses[{i}].state_region" label="State Region" />
        <InputField {form} name="addresses[{i}].postal_code" label="Postal Code" />
        <SelectField
            {form}
            name="addresses[{i}].country"
            options={countryOptions}
            label="Country"
        />
    </div>
{/snippet}
