<script lang="ts" context="module">
    // @ts-expect-error - Maybe superforms will fixed in the future with Svelte 5
    type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
    import Select from 'svelte-select';

    interface Props {
        form: SuperForm<T>;
        name: FormPathLeaves<T, string>;
        options: { label: string; value: string }[];
        class?: string;
        label?: string | undefined;
        description?: string | undefined;
    }

    const { form, name, options, class: classname, label, description }: Props = $props();

    const { value } = formFieldProxy(form, name) satisfies FormFieldProxy<string>;

    function handleChange({ detail }: { detail: { value: string } }) {
        $value = detail.value;
    }

    function handleClear() {
        $value = '';
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
                items={options}
                value={options.find((option) => $value.toString() === option.value)}
                placeholder={`Select ${label}`}
                on:change={handleChange}
                on:clear={handleClear}
            >
                <div slot="input-hidden">
                    <input {name} type="hidden" value={$value} />
                </div>
            </Select>
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" />
    </Field>
</div>
