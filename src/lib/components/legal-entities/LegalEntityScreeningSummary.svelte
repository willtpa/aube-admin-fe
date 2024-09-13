<script lang="ts">
    import type { components } from '$lib/openapi/adminapi.schema';

    interface Props {
        legalEntity:
            | components['schemas']['LegalEntityIndividual']
            | components['schemas']['LegalEntityCorporate']
            | components['schemas']['LegalEntityRelatedPartyIndividual']
            | components['schemas']['LegalEntityRelatedPartyCorporate'];
    }

    const { legalEntity }: Props = $props();
</script>

<!-- Todo : To remove -->
{#if legalEntity}{/if}
<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Screening Summary</h2>
        <div class="overflow-x-auto">
            <table class="table table-sm table-zebra mt-5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Screening</th>
                        <th>Remarks</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!--{#if relatedParties.length === 0}-->
                    <!--    <tr>-->
                    <!--        <td colspan="3" class="text-center">No related party</td>-->
                    <!--    </tr>-->
                    <!--{:else}-->
                    <!--    {#each relatedParties as relatedParty}-->
                    <tr class="hover">
                        <td>Test</td>
                        <td>Test</td>
                        <td>Test</td>
                        <td class="text-center">
                            <a href="/compliance/screenings/1" class="btn btn-xs btn-neutral">
                                View
                            </a>
                        </td>
                    </tr>
                    <tr class="hover">
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td>Test 2</td>
                        <td class="text-center">
                            <a href="/compliance/screenings/2" class="btn btn-xs btn-neutral">
                                View
                            </a>
                        </td>
                    </tr>
                    <tr class="hover">
                        <td>Test 3</td>
                        <td>Test 3</td>
                        <td>Test 3</td>
                        <td class="text-center">
                            <a href="/compliance/screenings/3" class="btn btn-xs btn-neutral">
                                View
                            </a>
                        </td>
                    </tr>
                    <!--{/each}-->
                    <!--{/if}-->
                </tbody>
            </table>
        </div>
    </div>
</div>
