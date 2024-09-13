<script lang="ts">
    import type { PageData } from './$types.js';
    import LegalEntitiesTable from './LegalEntitiesTable.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

<a role="button" href="/compliance/legal-entities/form" class="btn btn-primary">
    Create new legal entity
</a>

<LegalEntitiesTable legalEntities={data.legalEntitiesResponse.data} />
