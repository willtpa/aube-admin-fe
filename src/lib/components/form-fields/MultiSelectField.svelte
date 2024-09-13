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
        options: { label: string; value: string }[];
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
    }

    const { form, name, options, class: classname, label, description }: Props = $props();

    const { values } = arrayProxy(form, name) as ArrayProxy<string>;

    function handleChange({ detail }: { detail: { value: string }[] }) {
        $values = detail.map((item: { value: string }) => item.value);
    }

    function handleClear({ detail }: { detail: { value: string } }) {
        $values = $values.filter((value) => value !== detail.value).map((value) => value);
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
                clearable={false}
                multiple
                items={options}
                value={options.filter((option) => $values.includes(option.value))}
                placeholder={`Select ${label}`}
                on:change={handleChange}
                on:clear={handleClear}
            >
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
