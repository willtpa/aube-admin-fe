<script lang="ts">
    interface Props {
        class?: string;
    }

    const { class: classname }: Props = $props();
</script>

<button type="submit" class={'btn btn-primary ' + classname}>Submit</button>
