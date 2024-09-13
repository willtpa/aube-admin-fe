<script lang="ts">
    import type { PageData } from './$types.js';
    import CorporateSummary from '$components/legal-entities/CorporateSummary.svelte';
    import IndividualSummary from '$components/legal-entities/IndividualSummary.svelte';
    import LegalEntitiesRelatedPartiesTable from './LegalEntitiesRelatedPartiesTable.svelte';
    import LegalEntityMenu from './LegalEntityMenu.svelte';
    import LegalEntitySummaryAddresses from '$components/legal-entities/LegalEntitySummaryAddresses.svelte';
    import LegalEntityScreeningSummary from '$components/legal-entities/LegalEntityScreeningSummary.svelte';
    import BackButton from '$components/BackButton.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

{#if data.legalEntity}
    <div class="space-y-8">
        <div class="flex justify-between items-center">
            <BackButton />
            <LegalEntityMenu legalEntity={data.legalEntity} />
        </div>

        {#if data.legalEntity.entity_type === 'corporate'}
            <CorporateSummary corporate={data.legalEntity} />
        {:else if data.legalEntity.entity_type === 'individual'}
            <IndividualSummary individual={data.legalEntity} />
        {/if}

        <LegalEntitySummaryAddresses legalEntity={data.legalEntity} />

        <LegalEntitiesRelatedPartiesTable relatedParties={data.relatedPartieResponse.data} />

        <LegalEntityScreeningSummary legalEntity={data.legalEntity} />
    </div>
{/if}
