<script lang="ts">
    import { CircleHelp } from 'lucide-svelte';
    import MenuDrawer from '$components/MenuDrawer.svelte';
</script>

<MenuDrawer>
    <li>
        <a href="?">
            <CircleHelp />
            Test
        </a>
    </li>
</MenuDrawer>
