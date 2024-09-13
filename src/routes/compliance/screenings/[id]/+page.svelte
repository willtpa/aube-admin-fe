<script lang="ts">
    import type { PageData } from './$types.js';
    import ScreeningMenu from './ScreeningMenu.svelte';
    import BackButton from '$components/BackButton.svelte';
    import ScreeningResults from './ScreeningResults.svelte';
    import ScreeningConclusion from './ScreeningConclusion.svelte';
    import ScreeningComments from './ScreeningComments.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

{#if data.screening}
    <div class="space-y-8">
        <div class="flex justify-between items-center">
            <BackButton />
            <ScreeningMenu />
        </div>

        <ScreeningResults />
        <ScreeningConclusion />
        <ScreeningComments />
    </div>
{/if}
