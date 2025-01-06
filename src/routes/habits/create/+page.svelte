<script>
    let { form } = $props();
</script>

<h1>Add a New Habit</h1>

<form method="POST" action="?/create">
    <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input name="name" class="form-control" type="text" placeholder="Enter Habit Name"/>
    </div>
    <div class="mb-3">
        <label for="" class="form-label">Note</label>
        <input name="note" class="form-control" type="text" placeholder="Write any specific notes"/>
    </div>
    <button type="submit" class="btn btn-primary">Add Habit</button>
</form>

<!-- Redirect back to the habits page -->
<a href="/habits" class="btn btn-secondary mt-3">Back to All Habits</a>

<!-- Success Message -->
{#if form?.success}
    <p class="text-success">Habit Created Successfully!</p>
{/if}

