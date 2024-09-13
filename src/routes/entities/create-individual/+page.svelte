<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import { CountryCode2, Gender } from '$lib/openapi/types';
    import type { PageData } from './$types';

    export let data: PageData;

    const { errors, enhance, message } = superForm(data.form);
</script>

<div class="container mx-auto">
    <h1 class="m-2">Create Sepa EUR Account - Individual</h1>
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
                <div class="w-full md:w-1/2 px-3">
                    <label class="label-text" for="gender">Gender</label>
                    <select
                        name="gender"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.gender ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each Object.entries(Gender) as [key, gender]}"
                            <option value={gender}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.gender}
                        <span class="invalid text-xs text-red-400">
                            {$errors.gender}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="first_name">First Name</label>
                    <input
                        name="fist_name"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder="John"
                        aria-invalid={$errors.first_name ? 'true' : undefined}
                    />
                    {#if $errors.first_name}
                        <span class="invalid text-xs text-red-400">
                            {$errors.first_name}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="last_name">Last Name</label>
                    <input
                        name="last_name"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder="Doe"
                        aria-invalid={$errors.last_name ? 'true' : undefined}
                    />
                    {#if $errors.last_name}
                        <span class="invalid text-xs text-red-400">
                            {$errors.last_name}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="email">Email</label>
                    <input
                        name="email"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="email"
                        placeholder="john@email.com"
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
                    <label class="label-text" for="nationality">Nationality</label>
                    <select
                        name="nationality"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.nationality ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each Object.entries(CountryCode2) as [key, country]}"
                            <option value={country}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.nationality}
                        <span class="invalid text-xs text-red-400">
                            {$errors.nationality}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="birth_date">Birth Date</label>
                    <input
                        name="birth_date"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="date"
                        placeholder="Triple-A"
                        aria-invalid={$errors.birth_date ? 'true' : undefined}
                    />
                    {#if $errors.birth_date}
                        <span class="invalid text-xs text-red-400">
                            {$errors.birth_date}
                        </span>
                    {/if}
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="birth_country">Birth Country</label>
                    <select
                        name="birth_country"
                        class="select select-sm select-bordered rounded w-full max-w-xs"
                        aria-invalid={$errors.birth_country ? 'true' : undefined}
                    >
                        <option value=""></option>
                        {#each Object.entries(CountryCode2) as [key, country]}"
                            <option value={country}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.birth_country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.birth_country}
                        </span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label-text" for="birth_place">Birth Place</label>
                    <input
                        name="birth_place"
                        class="input input-sm input-bordered rounded w-full max-w-xs"
                        type="text"
                        placeholder="Paris"
                        aria-invalid={$errors.birth_place ? 'true' : undefined}
                    />
                    {#if $errors.birth_place}
                        <span class="invalid text-xs text-red-400">
                            {$errors.birth_place}
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
                        placeholder="5 rue de paix"
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
                        placeholder="Paris"
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
                        placeholder="75016"
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
                        {#each Object.entries(CountryCode2) as [key, country]}"
                            <option value={country}>{key}</option>
                        {/each}
                    </select>
                    {#if $errors.country}
                        <span class="invalid text-xs text-red-400">
                            {$errors.country}
                        </span>
                    {/if}
                </div>
            </div>

            <div>
                <input type="hidden" name="entity_type" value="corporate" />
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
