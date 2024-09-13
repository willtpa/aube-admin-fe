<script lang="ts">
    import type { components } from '$lib/openapi/adminapi.schema';

    interface Props {
        corporate:
            | components['schemas']['LegalEntityCorporate']
            | components['schemas']['LegalEntityRelatedPartyCorporate'];
    }

    const { corporate }: Props = $props();
</script>

<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Main information</h2>
        <div class="grid grid-cols-4">
            <div>
                <p class="mb-0 font-light text-sm">Name</p>
                <h4 class="mt-0">{corporate.company_name}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Alias</p>
                <h4 class="mt-0">{corporate.alias_names}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Former Registered Name</p>
                <h4 class="mt-0">{corporate.former_registered_names}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Trade Name</p>
                <h4 class="mt-0">{corporate.trade_names}</h4>
            </div>
        </div>
        <div class="grid grid-cols-4">
            <div>
                <p class="mb-0 font-light text-sm">Incorporation Date</p>
                <h4 class="mt-0">{corporate.incorporation_date}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Incorporation Number</p>
                <h4 class="mt-0">{corporate.incorporation_number}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Incorporation Country</p>
                <h4 class="mt-0">{corporate.incorporation_country}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Operation Country</p>
                <h4 class="mt-0">{corporate.operation_countries}</h4>
            </div>
        </div>
        <div class="grid grid-cols-4">
            <div>
                <p class="mb-0 font-light text-sm">Industry</p>
                <h4 class="mt-0">{corporate.industry}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">Business Activity</p>
                <h4 class="mt-0">{corporate.business_activities}</h4>
            </div>
            <div>
                <p class="mb-0 font-light text-sm">MCC Code</p>
                <h4 class="mt-0">{corporate.mcc_codes}</h4>
            </div>
            {#if 'sources_of_fund' in corporate}
                <div>
                    <p class="mb-0 font-light text-sm">Source of Fund</p>
                    <h4 class="mt-0">{corporate.sources_of_fund}</h4>
                </div>
            {/if}
        </div>
        <div class="grid grid-cols-1">
            <div>
                <p class="mb-0 font-light text-sm">Website</p>
                <h4 class="mt-0">{corporate.websites}</h4>
            </div>
        </div>
        <div class="grid grid-cols-4">
            {#if 'onboarding_mode' in corporate}
                <div>
                    <p class="mb-0 font-light text-sm">Onboarding Mode</p>
                    <h4 class="mt-0">{corporate.onboarding_mode}</h4>
                </div>
            {/if}
            {#if 'roles' in corporate}
                <div>
                    <p class="mb-0 font-light text-sm">Roles</p>
                    <h4 class="mt-0">{corporate.roles}</h4>
                </div>
            {/if}
            {#if 'ownership_structure' in corporate}
                <div>
                    <p class="mb-0 font-light text-sm">Ownership Structure</p>
                    <h4 class="mt-0">{corporate.ownership_structure}</h4>
                </div>
            {/if}
        </div>
    </div>
</div>
