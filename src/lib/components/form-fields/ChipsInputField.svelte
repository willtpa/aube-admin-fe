<script lang="ts" context="module">
    // @ts-expect-error - Maybe superforms will fixed in the future with Svelte 5
    type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
    import {
        arrayProxy,
        type ArrayProxy,
        type FormPathArrays,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import Select from 'svelte-select';

    interface Props {
        form: SuperForm<T>;
        name: FormPathArrays<T>;
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
    }

    const { form, name, class: classname, label, description }: Props = $props();

    const { values } = arrayProxy(form, name) as ArrayProxy<string>;

    let filterText: string = $state('');
    let items: string[] = $state([]);

    function handleFilter({ detail }: { detail: { label: string; value: string }[] }) {
        if ($values.find((i) => i === filterText)) return; // Prevent duplicates
        if (detail.length === 0 && filterText.length > 0) {
            items = [filterText];
        }
    }

    function handleChange({ detail }: { detail: { value: string }[] }) {
        $values = detail.map((item: { value: string }) => item.value);
        items = [];
    }

    function handleClear({ detail }: { detail: { value: string } }) {
        $values = $values.filter((value) => value !== detail.value).map((value) => value);
        items = [];
    }
</script>

<div class={classname}>
    <Field {form} {name}>
        <Control let:attrs>
            {#if label}
                <div class="label">
                    <Label class="label-text">
                        {label}
                    </Label>
                </div>
            {/if}
            <Select
                {...attrs}
                class="chips"
                clearable={false}
                multiple
                items={items.map((value) => ({ label: value, value: value }))}
                value={$values.map((value) => ({ label: value, value: value }))}
                placeholder={`Add ${label}`}
                bind:filterText
                on:change={handleChange}
                on:filter={handleFilter}
                on:clear={handleClear}
                on:blur={() => (items = [])}
                on:focus={() => (items = [])}
            >
                <div slot="empty" class="p-3 text-center">
                    <div class="text-gray-400 text-sm">
                        {#if filterText.length > 0}
                            Value "{filterText}" already exists
                        {:else}
                            Start typing to add a new value
                        {/if}
                    </div>
                </div>
                <div slot="input-hidden">
                    {#each $values as value}
                        <input type="hidden" {name} {value} />
                    {/each}
                </div>
            </Select>
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" />
    </Field>
</div>
