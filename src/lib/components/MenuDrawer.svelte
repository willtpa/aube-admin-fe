<script lang="ts">
    import { EllipsisVertical } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    const { children }: Props = $props();
</script>

<div class="drawer drawer-end">
    <input id="action-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="flex justify-end">
            <label for="action-drawer" class="btn btn-circle drawer-button">
                <EllipsisVertical />
            </label>
        </div>
    </div>
    <div class="drawer-side z-10">
        <label for="action-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 py-10 px-4 m-0">
            {@render children()}
        </ul>
    </div>
</div>
