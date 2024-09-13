<script lang="ts">
    import type { PageData } from './$types.js';
    import CorporateSummary from '$components/legal-entities/CorporateSummary.svelte';
    import IndividualSummary from '$components/legal-entities/IndividualSummary.svelte';
    import LegalEntityRelatedPartyMenu from './LegalEntityRelatedPartyMenu.svelte';
    import LegalEntityScreeningSummary from '$components/legal-entities/LegalEntityScreeningSummary.svelte';
    import LegalEntitySummaryAddresses from '$components/legal-entities/LegalEntitySummaryAddresses.svelte';
    import BackButton from '$components/BackButton.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

{#if data.relatedParty}
    <div class="space-y-8">
        <div class="flex justify-between items-center">
            <BackButton />
            <LegalEntityRelatedPartyMenu relatedParty={data.relatedParty} />
        </div>

        {#if data.relatedParty.entity_type === 'corporate'}
            <CorporateSummary corporate={data.relatedParty} />
        {:else if data.relatedParty.entity_type === 'individual'}
            <IndividualSummary individual={data.relatedParty} />
        {/if}

        <LegalEntitySummaryAddresses legalEntity={data.relatedParty} />

        <LegalEntityScreeningSummary legalEntity={data.relatedParty} />
    </div>
{/if}
