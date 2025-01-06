<script>
    export let data;
    let journalEntries = data.journalEntries;

    let showInfo = false;
</script>

<div class="container mt-5">
    <h1 class="text-center mb-4">📝 My Journal</h1>

    <!-- Text and Tooltip Aligned -->
    <div
        class="text-center d-flex justify-content-center align-items-center"
        style="gap: 10px;"
    >
        <p class="text-muted mb-0">
            Reflect on your habits and progress. Write down your thoughts,
            achievements, and goals!
        </p>

        <!-- Tooltip Icon with Hover Effect -->
        <!-- svelte-ignore a11y_mouse_events_have_key_events -->
        <p
            style="cursor: pointer; font-size: 1.2rem; margin: 0;"
            on:mouseover={() => (showInfo = true)}
            on:mouseleave={() => (showInfo = false)}
        >
            ℹ️
        </p>
    </div>

    <!-- Tooltip Text (Hidden Until Hover) -->
    {#if showInfo}
        <div
            style="
            position: fixed; 
            background: lightgray; 
            color: black; 
            padding: 10px; 
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);  
            top: 50%; 
            left: 50%;  
            transform: translate(-50%, -50%);
            max-width: 400px;
        "
        >
            <p><strong>How to use this page:</strong></p>
            <ul>
                <li>
                    <strong>Create a New Entry:</strong> Fill out the form above
                    with the title, date, mood and your thoughts for the day.
                    Click <strong>"Save Entry"</strong> to add it to your journal.
                </li>
                <li>
                    <strong>Mood Selection:</strong> Choose from the available moods
                    to describe your day. Your mood will be displayed alongside each
                    entry.
                </li>
                <li>
                    <strong>View Entries:</strong> Scroll down to see all your past
                    entries, displayed in chronological order. Click on a title to
                    view the full details of a journal entry.
                </li>
                <li>
                    <strong>Delete Entries:</strong> If needed, you can delete
                    an entry using the <strong>"Delete Entry"</strong> button under
                    each card.
                </li>
            </ul>
        </div>
    {/if}
</div>

<!-- New Entry Form -->
<form method="POST" action="?/create" class="my-4">
    <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="title" name="title" class="form-control" required />
    </div>
    <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="date" name="date" class="form-control" required />
    </div>
    <div class="mb-3">
        <label for="mood" class="form-label">Mood</label>
        <select id="mood" name="mood" class="form-select">
            <option value="Happy">Happy 😊</option>
            <option value="Sad">Sad 😢</option>
            <option value="Excited">Excited 🎉</option>
            <option value="Angry">Angry 😠</option>
            <option value="Motivated">Motivated 💪</option>
            <option value="Calm">Calm 🌿</option>
            <option value="Reflective">Reflective 🤔</option>
            <option value="Tired">Tired 😴</option>
            <option value="Grateful">Grateful 🙏</option>
            <option value="Anxious">Anxious 😟</option>
            <option value="Loved">Loved ❤️</option>
            <option value="Confident">Confident 🦁</option>
            <option value="Peaceful">Peaceful ☮️</option>
            <option value="Overwhelmed">Overwhelmed 😵</option>
            <option value="Hopeful">Hopeful 🌟</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="text" class="form-label">Journal Entry</label>
        <textarea
            name="text"
            class="form-control"
            rows="7"
            required
            placeholder="How was your day? What was the highlight of your day?"
        ></textarea>
    </div>
    <button type="submit" class="btn btn-success">Save Entry</button>
</form>

<h3 class="text-center mb-4">📖 My Journal Entries</h3>

<!-- Journal Entries Display -->
<div class="row">
    {#each journalEntries as entry}
        <div class="col-md-4 mb-4">
            <div class="card fixed-height">
                <div class="card-body">
                    <!-- Title as link to full entry page -->
                    <h5 class="card-title">
                        <a href={`/journal/${entry._id}`}>{entry.title}</a>
                    </h5>
                    <p class="card-text">
                        <strong>Date:</strong>
                        {entry.date}
                    </p>
                    <p class="card-text">
                        <strong>Mood:</strong>
                        {entry.mood}
                    </p>
                    <!-- Truncated preview -->
                    <p class="card-text text-truncate" title={entry.text}>
                        {entry.text}
                    </p>
                </div>
            </div>
        </div>
    {/each}
</div>

<!-- CSS to make all cards equal height -->
<style>
    .fixed-height {
        height: 230px; /* Fixed height for all cards */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .text-truncate {
        -webkit-line-clamp: 3;
        line-clamp: 3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* 3 lines and cut off if it exceeds */
    .text-truncate {
        display: -webkit-box;
        -webkit-line-clamp: 3; /* Show up to 3 lines */
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.4em; /* Adjust the line spacing */
        max-height: calc(
            1.4em * 3
        ); /* 3 lines with the specified line height */
        white-space: normal;
    }

    .card-title {
        margin-bottom: 18px;
    }

    .card-title a {
        text-decoration: none;
        color: #ce5b31;
    }

    .card-title a:hover {
        text-decoration: underline;
    }
</style>
