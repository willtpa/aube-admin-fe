<script lang="ts">
    import type { PageData } from './$types.js';
    import RelatedPartyIndividualForm from './RelatedPartyIndividualForm.svelte';
    import { page } from '$app/stores';
    import RelatedPartyCorporateForm from './RelatedPartyCorporateForm.svelte';
    import BackButton from '$components/BackButton.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

<BackButton />

{#if $page.params['relatedPartyId']}
    <h2 class="text-2xl font-bold">
        Edit {data.relatedPartyIndividualForm
            ? 'individual related party'
            : 'corporate related party'}
    </h2>
    {#if data.relatedPartyIndividualForm}
        <RelatedPartyIndividualForm data={data.relatedPartyIndividualForm} />
    {:else if data.relatedPartyCorporateForm}
        <RelatedPartyCorporateForm data={data.relatedPartyCorporateForm} />
    {/if}
{:else}
    <h2 class="text-2xl font-bold">Create a new related party</h2>
    <div role="tablist" class="tabs tabs-bordered min-w-full">
        {#if data.relatedPartyIndividualForm}
            <input
                type="radio"
                name="entity_type"
                role="tab"
                class="tab"
                aria-label="Individual"
                checked
            />
            <div role="tabpanel" class="tab-content p-10">
                <RelatedPartyIndividualForm data={data.relatedPartyIndividualForm} />
            </div>
        {/if}
        {#if data.relatedPartyCorporateForm}
            <input type="radio" name="entity_type" role="tab" class="tab" aria-label="Corporate" />
            <div role="tabpanel" class="tab-content p-10">
                <RelatedPartyCorporateForm data={data.relatedPartyCorporateForm} />
            </div>
        {/if}
    </div>
{/if}
