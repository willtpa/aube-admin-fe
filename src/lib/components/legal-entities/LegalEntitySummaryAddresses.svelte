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

<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Addresses</h2>
        <div class="grid grid-cols-2 gap-4">
            {#if !legalEntity.addresses}
                <p class="col-span-full text-center">No address</p>
            {:else}
                {#each legalEntity.addresses as address}
                    <div class="card bg-base-300">
                        <div class="card-body">
                            <div class="grid grid-cols-2">
                                {#if address.address_line_one}
                                    <div class="col-span-full">
                                        <p class="mb-0 font-light text-sm">Address Line One</p>
                                        <h4 class="mt-0">{address.address_line_one}</h4>
                                    </div>
                                {/if}

                                {#if address.address_line_two}
                                    <div class="col-span-full">
                                        <p class="mb-0 font-light text-sm">Address Line Two</p>
                                        <h4 class="mt-0">{address.address_line_two}</h4>
                                    </div>
                                {/if}

                                <div>
                                    <p class="mb-0 font-light text-sm">Country</p>
                                    <h4 class="mt-0">{address.country}</h4>
                                </div>

                                {#if address.state_region}
                                    <div>
                                        <p class="mb-0 font-light text-sm">State Region</p>
                                        <h4 class="mt-0">{address.state_region}</h4>
                                    </div>
                                {/if}

                                {#if address.postal_code}
                                    <div>
                                        <p class="mb-0 font-light text-sm">Postal Code</p>
                                        <h4 class="mt-0">{address.postal_code}</h4>
                                    </div>
                                {/if}

                                {#if address.city}
                                    <div>
                                        <p class="mb-0 font-light text-sm">City</p>
                                        <h4 class="mt-0">{address.city}</h4>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
