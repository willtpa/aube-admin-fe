<script lang="ts">
    import Account from '$components/bank-account.svelte';
    import type { PageData } from './$types';
    import type { components } from '$lib/openapi/adminapi.schema';

    type IndividualEntity = components['schemas']['IndividualEntity'];
    type CorporateEntity = components['schemas']['CorporateEntity'];

    export let data: PageData;
    const entity = data.entity;
    const accounts = data.accounts.data;

    function isIndividualEntity(entity: unknown): entity is IndividualEntity {
        return (entity as IndividualEntity).entity_type === 'individual';
    }
    function isCorporateEntity(entity: unknown): entity is CorporateEntity {
        return (entity as CorporateEntity).entity_type === 'corporate';
    }
</script>

<div class="container mx-auto">
    <h1 class="m-2">Entity</h1>
    <hr class="mb-2" />

    <div class="card bg-base-100 shadow-xl mb-5">
        <div class="card-body">
            <h2 class="card-title">General Informations</h2>
            <ul>
                <li>ID: {entity.id}</li>
                <li>Type: {entity.entity_type}</li>
                <li>Name: {entity.name}</li>
                <li>Email: {entity.email}</li>
                <li>Created At: {entity.created_at}</li>
            </ul>
        </div>
    </div>

    <div class="card bg-base-100 shadow-xl mb-5">
        <div class="card-body">
            <h2 class="card-title">Identity</h2>
            {#if isIndividualEntity(entity)}
                <ul>
                    <li>Gender: {entity.gender}</li>
                    <li>Firstname: {entity.first_name}</li>
                    <li>Lastname: {entity.last_name}</li>
                    <li>Birthdate: {entity.birth_date}</li>
                    <li>Birth place: {entity.birth_place}</li>
                    <li>Birth country: {entity.birth_country}</li>
                    <li>Nationality: {entity.nationality}</li>
                </ul>
            {/if}

            {#if isCorporateEntity(entity)}
                <ul>
                    <li>Company Name: {entity.company_name}</li>
                    <li>Incorporation Date: {entity.incorporation_date}</li>
                    <li>Registration Country: {entity.registration_country}</li>
                </ul>
            {/if}
        </div>
    </div>

    <div class="card bg-base-100 shadow-xl mb-5">
        <div class="card-body">
            <h2 class="card-title">Address</h2>
            <ul>
                <li>Street: {entity.street}</li>
                <li>City: {entity.city}</li>
                <li>Postal Code: {entity.postal_code}</li>
                <li>Country: {entity.country}</li>
            </ul>
        </div>
    </div>

    <div class="card bg-base-100 shadow-xl mb-5">
        <div class="card-body">
            <h2 class="card-title">Accounts</h2>
            {#each accounts as account}
                <Account {account} />
            {/each}
            <div class="card-actions justify-end">
                <a
                    href="/entities/{entity.id}/accounts/new"
                    type="button"
                    class="btn btn-primary text-white"
                >
                    Add Account
                </a>
            </div>
        </div>
    </div>
</div>
