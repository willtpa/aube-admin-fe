<script lang="ts">
    import { enhance } from '$app/forms';
    import { UserRoundPen, UserRoundSearch, UserRoundX } from 'lucide-svelte';
    import type { components } from '$lib/openapi/adminapi.schema';
    import MenuDrawer from '$components/MenuDrawer.svelte';

    interface Props {
        legalEntity:
            | components['schemas']['LegalEntityIndividual']
            | components['schemas']['LegalEntityCorporate'];
    }

    const { legalEntity }: Props = $props();
</script>

<MenuDrawer>
    <li>
        <a href="/compliance/legal-entities/form/{legalEntity.id}">
            <UserRoundPen />
            Edit
        </a>
    </li>
    <li>
        <form action="/compliance/legal-entities?/delete" method="POST" use:enhance>
            <input type="hidden" name="id" value={legalEntity.id} />
            <input type="hidden" name="redirectPath" value="/compliance/legal-entities" />
            <button type="submit" class="flex items-center gap-2">
                <UserRoundX />
                <span class="underline font-medium">Delete</span>
            </button>
        </form>
    </li>
    <li>
        <form action="/compliance/legal-entities?/screen" method="POST" use:enhance>
            <input type="hidden" name="id" value={legalEntity.id} />
            <button type="submit" class="flex items-center gap-2">
                <UserRoundSearch />
                <span class="underline font-medium">Run screening process</span>
            </button>
        </form>
    </li>
</MenuDrawer>
