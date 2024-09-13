<script>
    import { ArrowLeft } from 'lucide-svelte';
</script>

<button onclick={() => history.back()} class="btn flex items-center">
    <ArrowLeft strokeWidth={1.5} />
    Back
</button>
