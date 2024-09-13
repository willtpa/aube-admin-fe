<script lang="ts">
    import '../app.css';
    import type { Snippet } from 'svelte';
    import Header from '$components/Header.svelte';
    import Footer from '$components/Footer.svelte';

    interface Props {
        children: Snippet;
    }

    const { children }: Props = $props();
</script>

<svelte:head>
    <title>Triple-A Backoffice</title>
</svelte:head>

<Header />
<main class="min-h-screen container my-10">
    {@render children()}
</main>
<Footer />
