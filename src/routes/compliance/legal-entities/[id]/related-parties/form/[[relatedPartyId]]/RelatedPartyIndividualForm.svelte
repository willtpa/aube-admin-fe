<script lang="ts">
    import SuperDebug, { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        createIndividualRelatedPartySchema,
        type CreateIndividualRelatedPartySchema,
        updateIndividualRelatedPartySchema,
        type UpdateIndividualRelatedPartySchema,
    } from './schemas';
    import SelectField from '$components/form-fields/SelectField.svelte';
    import InputField from '$components/form-fields/InputField.svelte';
    import { page } from '$app/stores';
    import {
        countryOptions,
        countryOptionsValues,
        genderOptions,
        kybStatusOptions,
        relatedPartyRoleOptions,
    } from '$utils/form';
    import MultiSelectField from '$components/form-fields/MultiSelectField.svelte';
    import ChipsInputField from '$components/form-fields/ChipsInputField.svelte';
    import { dev } from '$app/environment';
    import SubmitButton from '$components/form-fields/SubmitButton.svelte';

    interface Props {
        data: SuperValidated<
            Infer<CreateIndividualRelatedPartySchema | UpdateIndividualRelatedPartySchema>
        >;
    }

    const { data }: Props = $props();

    const form = superForm(data, {
        validators: zodClient(
            $page.params['relatedPartyId']
                ? updateIndividualRelatedPartySchema
                : createIndividualRelatedPartySchema,
        ),
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

<form method="POST" action="?/individual" use:enhance>
    <div class="grid grid-cols-2 gap-4">
        <SelectField {form} name="kyb_status" options={kybStatusOptions} label="KYB Status" />
        <InputField {form} name="first_name" label="First Name" />
        <InputField {form} name="last_name" label="Last Name" />
        <ChipsInputField {form} name="alias_names" label="Alias Names" />
        <SelectField {form} name="gender" options={genderOptions} label="Gender" />
        <MultiSelectField
            {form}
            name="nationalities"
            options={countryOptions}
            label="Nationalities"
        />
        <SelectField
            {form}
            name="birth_country"
            options={countryOptions}
            label="Country of Birth"
        />
        <InputField {form} name="birth_date" label="Birth Date" type="date" />
        <SelectField
            {form}
            name="residence_country"
            options={countryOptions}
            label="Country of Residence"
        />
        <InputField {form} name="identity_document_type" label="Identity Document Type" />
        <InputField {form} name="identity_document_number" label="Identity Document Number" />
        <InputField
            {form}
            name="identity_document_issue_date"
            label="Identity Document Issued Date"
            type="date"
        />
        <InputField
            {form}
            name="identity_document_expiry_date"
            label="Identity Document Expiry Date"
            type="date"
        />
        <MultiSelectField {form} name="roles" options={relatedPartyRoleOptions} label="Roles" />

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
