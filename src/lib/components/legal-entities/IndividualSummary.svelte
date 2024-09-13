<script lang="ts">
    import type { components } from '$lib/openapi/adminapi.schema';

    interface Props {
        individual:
            | components['schemas']['LegalEntityIndividual']
            | components['schemas']['LegalEntityRelatedPartyIndividual'];
    }

    const { individual }: Props = $props();
</script>

<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Main information</h2>
        <div class="grid grid-cols-4">
            <div>
                <p class="mb-0 font-light text-sm">First Name</p>
                <h4 class="mt-0">{individual.first_name}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Last Name</p>
                <h4 class="mt-0">{individual.last_name}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Alias Name</p>
                <h4 class="mt-0">{individual.alias_names}</h4>
            </div>
        </div>
        <div class="grid grid-cols-4">
            <div>
                <p class="mb-0 font-light text-sm">Country of Residence</p>
                <h4 class="mt-0">{individual.residence_country}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Country of Birth</p>
                <h4 class="mt-0">{individual.birth_country}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Date of Birth</p>
                <h4 class="mt-0">{individual.birth_date}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Nationality</p>
                <h4 class="mt-0">{individual.nationalities}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Gender</p>
                <h4 class="mt-0">{individual.gender}</h4>
            </div>
        </div>
        <div class="grid grid-cols-4">
            <div>
                <p class="mb-0 font-light text-sm">Identity Document Type</p>
                <h4 class="mt-0">{individual.identity_document_type}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Identity Document Number</p>
                <h4 class="mt-0">{individual.identity_document_number}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Identity Document Issue Date</p>
                <h4 class="mt-0">{individual.identity_document_issue_date}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Identity Document Expiry Date</p>
                <h4 class="mt-0">{individual.identity_document_expiry_date}</h4>
            </div>
        </div>
        <div class="grid grid-cols-4">
            {#if 'sources_of_fund' in individual}
                <div>
                    <p class="mb-0 font-light text-sm">Source of Fund</p>
                    <h4 class="mt-0">{individual.sources_of_fund}</h4>
                </div>
            {/if}
            {#if 'onboarding_mode' in individual}
                <div>
                    <p class="mb-0 font-light text-sm">Onboarding Mode</p>
                    <h4 class="mt-0">{individual.onboarding_mode}</h4>
                </div>
            {/if}
            {#if 'roles' in individual}
                <div>
                    <p class="mb-0 font-light text-sm">Roles</p>
                    <h4 class="mt-0">{individual.roles}</h4>
                </div>
            {/if}
        </div>
    </div>
</div>
