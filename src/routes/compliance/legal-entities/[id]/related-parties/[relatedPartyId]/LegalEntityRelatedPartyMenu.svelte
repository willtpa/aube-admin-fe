<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { UserRoundPen, UserRoundSearch, UserRoundX } from 'lucide-svelte';
    import type { components } from '$lib/openapi/adminapi.schema';
    import MenuDrawer from '$components/MenuDrawer.svelte';

    interface Props {
        relatedParty:
            | components['schemas']['LegalEntityRelatedPartyIndividual']
            | components['schemas']['LegalEntityRelatedPartyCorporate'];
    }

    const { relatedParty }: Props = $props();
</script>

<MenuDrawer>
    <li>
        <a
            href="/compliance/legal-entities/{$page.params[
                'id'
            ]}/related-parties/form/{relatedParty.id}"
        >
            <UserRoundPen />
            Edit
        </a>
    </li>
    <li>
        <form
            action="/compliance/legal-entities/{$page.params['id']}/related-parties?/delete"
            method="POST"
            use:enhance
        >
            <input type="hidden" name="id" value={relatedParty.id} />
            <input
                type="hidden"
                name="redirectPath"
                value="/compliance/legal-entities/{$page.params['id']}"
            />
            <button type="submit" class="flex items-center gap-2">
                <UserRoundX />
                <span class="underline font-medium">Delete</span>
            </button>
        </form>
    </li>
    <li>
        <form
            action="/compliance/legal-entities/{$page.params['id']}/related-parties?/screen"
            method="POST"
            use:enhance
        >
            <input type="hidden" name="id" value={relatedParty.id} />
            <button type="submit" class="flex items-center gap-2">
                <UserRoundSearch />
                <span class="underline font-medium">Run screening process</span>
            </button>
        </form>
    </li>
</MenuDrawer>
