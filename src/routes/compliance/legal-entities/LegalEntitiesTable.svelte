<script lang="ts">
    import type { components } from '$lib/openapi/adminapi.schema';
    import { enhance } from '$app/forms';

    interface Props {
        legalEntities: (
            | components['schemas']['LegalEntityIndividual']
            | components['schemas']['LegalEntityCorporate']
        )[];
    }

    const { legalEntities }: Props = $props();
</script>

{#snippet pagination()}
    <div class="join flex justify-end">
        <button class="join-item btn">«</button>
        <button class="join-item btn">»</button>
    </div>
{/snippet}

<div>
    <h2>Legal Entities</h2>
    {@render pagination()}
    <div class="overflow-x-auto">
        <table class="table table-sm table-zebra mt-5">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#if legalEntities.length === 0}
                    <tr>
                        <td colspan="3" class="text-center">No legal entity</td>
                    </tr>
                {:else}
                    {#each legalEntities as legalEntity}
                        <tr class="hover text-center">
                            <td>
                                {#if legalEntity.entity_type === 'corporate'}
                                    {legalEntity.company_name}
                                {:else if legalEntity.entity_type === 'individual'}
                                    {legalEntity.first_name} {legalEntity.last_name}
                                {/if}
                            </td>
                            <td>
                                {legalEntity.entity_type}
                            </td>
                            <td class="flex gap-2 justify-center">
                                <a
                                    href="/compliance/legal-entities/{legalEntity.id}"
                                    class="btn btn-xs btn-neutral"
                                >
                                    View
                                </a>
                                <a
                                    href="/compliance/legal-entities/form/{legalEntity.id}"
                                    class="btn btn-xs btn-neutral"
                                >
                                    Edit
                                </a>
                                <form action="?/delete" method="POST" use:enhance>
                                    <input type="hidden" name="id" value={legalEntity.id} />
                                    <button type="submit" class="btn btn-xs btn-neutral">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
    {@render pagination()}
</div>
