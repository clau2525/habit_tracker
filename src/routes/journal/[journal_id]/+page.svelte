<script>
    export let data;
</script>

{#if data.journalEntry}
    <div class="container mt-5 journal-entry-card">
        <h1 class="title">{data.journalEntry.title}</h1>
        
        <!-- Date and Mood Section -->
        <p class="entry-content"><strong>Date:</strong> {data.journalEntry.date}</p>
        <p class="entry-content"><strong>Mood:</strong> {data.journalEntry.mood}</p>
        
        <!-- Journal Entry Content -->
        <div class="entry-content">
            <p><strong>Journal Entry:</strong></p>
            <p>{data.journalEntry.text}</p>
        </div>

        <!-- Delete Button Section -->
        <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={data.journalEntry._id} />
            <button type="submit" class="delete-btn">
                Delete Entry
            </button>
        </form>
    </div>
{:else}
    <div class="alert alert-danger text-center">
        <p>Error loading the journal entry. Please try again.</p>
    </div>
{/if}

<!-- Enhanced CSS for Cleaner Look -->
<style>
    .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 30px;
        border-radius: 12px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-size: 2.2rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 25px;
        color: #ce5b31;
    }

    .entry-content {
        margin-top: 20px;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #444;
    }

    .delete-btn {
        margin-top: 20px;
        background: none;
        border: none;
        color: #d9534f;
        cursor: pointer;
        font-size: 16px;
    }

    .delete-btn:hover {
        font-weight: bold;
    }

</style>