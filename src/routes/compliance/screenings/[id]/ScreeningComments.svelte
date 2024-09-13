<script>
    import SubmitButton from '$components/form-fields/SubmitButton.svelte';
</script>

<div class="card bg-base-200 shadow-xl">
    <div class="card-body">
        <h2 class="card-title">Comments</h2>
        <div class="grid grid-cols-4 gap-4">
            <div class="card bg-base-300">
                <div class="card-body">Comment 1</div>
            </div>
            <div class="card bg-base-300">
                <div class="card-body">Comment 2</div>
            </div>
            <div class="card bg-base-300">
                <div class="card-body">Comment 3</div>
            </div>
            <div class="card bg-base-300">
                <div class="card-body">Comment 4</div>
            </div>
            <div class="card bg-base-300">
                <div class="card-body">Comment 5</div>
            </div>
            <div class="card bg-base-300">
                <div class="card-body">Comment 6</div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="flex flex-col space-y-4">
            <span class="font-bold">Add a new comment</span>
            <textarea class="textarea h-24 textarea-bordered" placeholder="Type your comment here"
            ></textarea>
            <SubmitButton />
        </div>
    </div>
</div>
