<script lang="ts">
    import type { PageData } from './$types.js';
    import LegalEntityIndividualForm from './LegalEntityIndividualForm.svelte';
    import { page } from '$app/stores';
    import LegalEntityCorporateForm from './LegalEntityCorporateForm.svelte';
    import BackButton from '$components/BackButton.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

<BackButton />

{#if $page.params['id']}
    <h2 class="text-2xl font-bold">
        Edit {data.legalEntityIndividualForm ? 'individual' : 'corporate'}
    </h2>
    {#if data.legalEntityIndividualForm}
        <LegalEntityIndividualForm data={data.legalEntityIndividualForm} />
    {:else if data.legalEntityCorporateForm}
        <LegalEntityCorporateForm data={data.legalEntityCorporateForm} />
    {/if}
{:else}
    <h2 class="text-2xl font-bold">Create a new legal entity</h2>
    <div role="tablist" class="tabs tabs-bordered min-w-full">
        {#if data.legalEntityIndividualForm}
            <input
                type="radio"
                name="entity_type"
                role="tab"
                class="tab"
                aria-label="Individual"
                checked
            />
            <div role="tabpanel" class="tab-content p-10">
                <LegalEntityIndividualForm data={data.legalEntityIndividualForm} />
            </div>
        {/if}
        {#if data.legalEntityCorporateForm}
            <input type="radio" name="entity_type" role="tab" class="tab" aria-label="Corporate" />
            <div role="tabpanel" class="tab-content p-10">
                <LegalEntityCorporateForm data={data.legalEntityCorporateForm} />
            </div>
        {/if}
    </div>
{/if}
