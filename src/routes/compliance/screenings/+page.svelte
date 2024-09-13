<script lang="ts">
    import type { PageData } from './$types.js';
    import BackButton from '$components/BackButton.svelte';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

{#if data.screenings}
    <BackButton />
{/if}
