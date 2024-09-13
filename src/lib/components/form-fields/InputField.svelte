<script lang="ts" context="module">
    // @ts-expect-error - Maybe superforms will fixed in the future with Svelte 5
    type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import {
        formFieldProxy,
        type FormFieldProxy,
        type FormPathLeaves,
        type SuperForm,
    } from 'sveltekit-superforms';
    import { Control, Description, Field, FieldErrors, Label } from 'formsnap';

    interface Props {
        form: SuperForm<T>;
        name: FormPathLeaves<T, string>;
        class?: string;
        type?: HTMLInputAttributes['type'];
        label?: string | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
    }

    const {
        form,
        name,
        class: classname,
        type = 'text',
        label,
        description,
        placeholder,
    }: Props = $props();

    const { value } = formFieldProxy(form, name) satisfies FormFieldProxy<string>;
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
            <input
                {...attrs}
                {type}
                {placeholder}
                class="input input-bordered w-full"
                bind:value={$value}
            />
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" />
    </Field>
</div>
