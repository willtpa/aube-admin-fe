<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
    const entities = data.entities.data;
</script>

<div class="container mx-auto">
    <h1 class="m-2">Entities</h1>
    <hr class="mb-2" />

    <div>
        <a class="btn btn-success text-white no-underline" href="/entities/create-individual">
            Create new individual entity
        </a>
        <a class="btn btn-success text-white no-underline" href="/entities/create-corporate">
            Create new corporate entity
        </a>
    </div>

    <table class="border-collapse border border-slate-400">
        <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each entities as entity}
                <tr>
                    <td>{entity.id}</td>
                    <td>{entity.entity_type}</td>
                    <td>{entity.name}</td>
                    <td>{entity.email}</td>
                    <td>{entity.created_at}</td>
                    <td>
                        <a class="btn btn-secondary text-white" href="/entities/{entity.id}">
                            See details
                        </a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
