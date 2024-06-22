<script lang="ts">
    import { onMount } from 'svelte';
    let mockData: { name: string; data: string }[] = [{ name: 'sample', data: 'sample data' }];
    onMount(() => {
        // fetch('abc/')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         mockData = [...data];
        //     });
        // .then(console.log);
        console.log('Page');
    });
</script>

<h1>Page</h1>
{#each mockData as data}
    <p>{data.name} {data.data}</p>
{/each}
