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

    interface Props {
        form: SuperForm<T>;
        name: FormPathLeaves<T, boolean>;
        label: string | undefined;
        class?: string;
        description?: string | undefined;
    }

    const { form, name, label, class: classname, description }: Props = $props();

    const { value } = formFieldProxy(form, name) satisfies FormFieldProxy<boolean>;
</script>

<div class={classname}>
    <Field {form} {name}>
        <Control let:attrs>
            <input
                {...attrs}
                type="checkbox"
                class="checkbox checkbox-info"
                bind:checked={$value}
            />
            <div class="label">
                <Label class="label-text">
                    {label}
                </Label>
            </div>
        </Control>
        {#if description}
            <Description>{description}</Description>
        {/if}
        <FieldErrors class="invalid mt-2 text-xs text-red-400" />
    </Field>
</div>
