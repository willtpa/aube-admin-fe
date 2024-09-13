<script>
    import SubmitButton from '$components/form-fields/SubmitButton.svelte';
</script>

<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Screening conclusion</h2>

        <div class="grid grid-cols-5 gap-4">
            <label class="card bg-base-300 cursor-pointer" for="1">
                <span class="card-body">
                    <span class="flex flex-col items-center space-y-2">
                        <span>Adverse news</span>
                        <input type="radio" name="1" id="1" class="radio" />
                    </span>
                </span>
            </label>

            <label class="card bg-base-300 cursor-pointer" for="2">
                <span class="card-body">
                    <span class="flex flex-col items-center space-y-2">
                        <span>Own restricted list</span>
                        <input type="radio" name="1" id="2" class="radio" />
                    </span>
                </span>
            </label>

            <label class="card bg-base-300 cursor-pointer" for="3">
                <span class="card-body">
                    <span class="flex flex-col items-center space-y-2">
                        <span>PEP</span>
                        <input type="radio" name="1" id="3" class="radio" />
                    </span>
                </span>
            </label>

            <label class="card bg-base-300 cursor-pointer" for="4">
                <span class="card-body">
                    <span class="flex flex-col items-center space-y-2">
                        <span>Sanction</span>
                        <input type="radio" name="1" id="4" class="radio" />
                    </span>
                </span>
            </label>

            <label class="card bg-base-300 cursor-pointer" for="5">
                <span class="card-body">
                    <span class="flex flex-col items-center space-y-2">
                        <span>No hit</span>
                        <input type="radio" name="1" id="5" class="radio" />
                    </span>
                </span>
            </label>

            <SubmitButton class="mt-4 col-span-full" />
        </div>
    </div>
</div>
