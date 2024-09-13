<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { CountryCode2 } from '$lib/openapi/types';
    import type { PageData } from './$types';

    export let data: PageData;

    const { errors, enhance, message } = superForm(data.form);
    const countries = Object.entries(CountryCode2);
</script>

<div class="container mx-auto">
    <h1 class="m-2">Create Sepa EUR Account - Corporate</h1>
    <hr class="mb-2" />

    {#if $message}
        <div role="alert" class="alert alert-error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{$message}</span>
        </div>
    {/if}

    <div>
        <form class="w-full max-w-lg" method="POST" use:enhance>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="company_name">Company Name</label>
                    <input
                        name="company_name"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder="Triple-A"
                        aria-invalid={$errors.company_name ? 'true' : undefined}
                    />
                    {#if $errors.company_name}
                        <span class="invalid text-xs text-red-400">
                            {$errors.company_name}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="email">Email</label>
                    <input
                        name="email"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        aria-invalid={$errors.email ? 'true' : undefined}
                    />
                    {#if $errors.email}
                        <span class="invalid text-xs text-red-400">
                            {$errors.email}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="registration_country">
                        Registration Country
                    </label>
                    <select
                        name="registration_country"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.registration_country ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each countries as [key, country]}"
                            <option value={country}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.registration_country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.registration_country}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="label-text" for="incorporation_date">Incorporation Date</label>
                    <input
                        name="incorporation_date"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="date"
                        placeholder="2015-12-30"
                        aria-invalid={$errors.incorporation_date ? 'true' : undefined}
                    />
                    {#if $errors.incorporation_date}
                        <span class="invalid text-xs text-red-400">
                            {$errors.incorporation_date}
                        </span>
                    {/if}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="street">Street</label>
                    <input
                        name="street"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder=""
                        aria-invalid={$errors.street ? 'true' : undefined}
                    />
                    {#if $errors.street}
                        <span class="invalid text-xs text-red-400">
                            {$errors.street}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="label-text" for="city">City</label>
                    <input
                        name="city"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder=""
                        aria-invalid={$errors.city ? 'true' : undefined}
                    />
                    {#if $errors.city}
                        <span class="invalid text-xs text-red-400">
                            {$errors.city}
                        </span>
                    {/if}
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="postal_code">Postal Code</label>
                    <input
                        name="postal_code"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder=""
                        aria-invalid={$errors.postal_code ? 'true' : undefined}
                    />
                    {#if $errors.postal_code}
                        <span class="invalid text-xs text-red-400">
                            {$errors.postal_code}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="label-text" for="country">Country</label>
                    <select
                        name="country"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.country ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each countries as [key, country]}"
                            <option value={country}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.country}
                        </span>
                    {/if}
                </div>
                <div>
                    <input type="hidden" name="entity_type" value="corporate" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <button class="btn btn-accent text-white" type="submit">Create</button>
                </div>
            </div>
        </form>
    </div>
</div>
