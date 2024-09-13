<script lang="ts">
    import type { components } from '$lib/openapi/adminapi.schema';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    interface Props {
        relatedParties: (
            | components['schemas']['LegalEntityRelatedPartyIndividual']
            | components['schemas']['LegalEntityRelatedPartyCorporate']
        )[];
    }

    const { relatedParties }: Props = $props();
</script>

<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <div class="flex justify-between items-center">
            <h2 class="card-title">Related parties</h2>
            <a
                role="button"
                href="/compliance/legal-entities/{$page.params['id']}/related-parties/form"
                class="btn btn-primary"
            >
                Create new related party
            </a>
        </div>
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
                    {#if relatedParties.length === 0}
                        <tr>
                            <td colspan="3" class="text-center">No related party</td>
                        </tr>
                    {:else}
                        {#each relatedParties as relatedParty}
                            <tr class="hover text-center">
                                <td>
                                    {#if relatedParty.entity_type === 'corporate'}
                                        {relatedParty.company_name}
                                    {:else if relatedParty.entity_type === 'individual'}
                                        {relatedParty.first_name} {relatedParty.last_name}
                                    {/if}
                                </td>
                                <td>
                                    {relatedParty.entity_type}
                                </td>
                                <td class="flex gap-2 justify-center">
                                    <a
                                        href="/compliance/legal-entities/{$page.params[
                                            'id'
                                        ]}/related-parties/{relatedParty.id}"
                                        class="btn btn-xs btn-neutral"
                                    >
                                        View
                                    </a>
                                    <a
                                        href="/compliance/legal-entities/{$page.params[
                                            'id'
                                        ]}/related-parties/form/{relatedParty.id}"
                                        class="btn btn-xs btn-neutral"
                                    >
                                        Edit
                                    </a>
                                    <form
                                        action="/compliance/legal-entities/{$page.params[
                                            'id'
                                        ]}/related-parties?/delete"
                                        method="POST"
                                        use:enhance
                                    >
                                        <input type="hidden" name="id" value={relatedParty.id} />
                                        <button type="submit" class="btn btn-xs btn-neutral">
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        {/each}{/if}
                </tbody>
            </table>
        </div>
    </div>
</div>
