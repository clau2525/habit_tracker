<script>
    export let data;
    let comment = ""; // New input for comment
    const habit = data.habit;
    let showInfo = false;
</script>

<!-- Main Grid Layout Container -->
<div class="grid-container">
    <!-- Title and Tooltip Aligned in Same Line -->
    <div class="title-container">
        <h1 class="habit-title">{habit.name}</h1>
        <!-- Tooltip Icon with Hover Effect -->
        <!-- svelte-ignore a11y_mouse_events_have_key_events -->
        <p
            class="tooltip-icon"
            on:mouseover={() => (showInfo = true)}
            on:mouseleave={() => (showInfo = false)}
        >
            ℹ️
        </p>
    </div>
    <p>
        <strong>Days Accomplished:</strong>
        <span class="days-accomplished">{habit.streak} days</span>
    </p>

    {#if habit.note}
        <p>
            <strong>Note:</strong> <span class="habit-note">{habit.note}</span>
        </p>
    {:else}
        <p><strong>Note:</strong> No notes</p>
    {/if}

    <!-- Reset Streak Form -->
    <form method="POST" action="?/resetStreak" class="form-inline">
        <div class="input-container">
            <input
                type="text"
                name="comment"
                bind:value={comment}
                placeholder="Add a comment"
                class="input-field"
            />
            <input type="hidden" name="id" value={habit._id} />
            <button type="submit" class="btn-reset">Reset </button>
        </div>
    </form>

    <!-- Display Streak History -->
    <h3 class="streak-history-title">Streak History</h3>
    {#if habit.history.length > 0}
        <ul class="streak-history-list">
            {#each habit.history as record}
                <li class="streak-item">{record.date}: {record.streak} day(s)</li>
            {/each}
        </ul>
    {:else}
        <p>No streak history</p>
    {/if}

    <!-- DELETE HABIT FORM -->
    <form method="POST" action="?/delete" class="delete-form">
        <input type="hidden" name="id" value={habit._id} />
        <button type="submit" class="btn-delete">Delete Habit</button>
    </form>
</div>

<!-- Floating Tooltip -->
{#if showInfo}
    <div
        style="
            position: fixed; 
            background: lightgray; 
            color: black; 
            padding: 15px; 
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);  
            top: 50%; 
            left: 50%;  
            transform: translate(-50%, -50%);
            max-width: 250px;
        "
    >
        <strong>How to Use This Habit Tracker:</strong><br />
        - The <strong>Days Accomplished</strong> section shows your current
        active streak.<br />
        - Enter a comment like <em>"February Month"</em> and click the
        <strong>Reset</strong>
        button.<br />
        - This will save your current streak, today's date, and the comment in the
        <strong>Streak History</strong>.<br />
        - The <strong>Streak History</strong> below displays all past resets.<br />
        - You can also delete the habit completely using the
        <span style="color: #b52b27 ;"><strong>Delete Habit</strong></span> button at
        the bottom.
    </div>
{/if}

<!-- CSS Styling -->
<style>
    /* Main Grid Layout and center*/
    .grid-container {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        background: #f9f9f9;
        border-radius: 20px; /* Rounded corners */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .title-container {
        display: flex;
        align-items: center; /* Align vertically */
        gap: 20px; /* Space between title and icon */
        justify-content: flex-start;
        flex-wrap: nowrap;
        margin-bottom: 20px;
    }

    .habit-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
        padding: 0;
        color: #2a6ebb;
    }

    .days-accomplished {
        font-size: 1.2rem;
        color: #28a745;
        font-weight: bold;
    }

    .habit-note {
        font-size: 1.1rem;
        font-style: italic;
        color: #555;
    }

    /* Input and Button Styling */
    .input-container {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 8px;
        margin-top: 20px;
    }

    .input-field {
        padding: 5px;
        width: 150px;
        border: 1px solid #ccc;
        border-radius: 8px;
        flex: 1;
    }

    .btn-reset {
        background-color: orange;
        border: none;
        padding: 5px 7px;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-reset:hover {
        transform: scale(1.05);
    }

    /* Streak History Styling */
    .streak-history-title {
        margin-top: 30px;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .streak-history-list {
        list-style-type: none;
        padding: 0;
    }

    .streak-item {
        font-size: 1.1rem;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
    }

    /* Delete Button Styling */
    .btn-delete {
        background: none;
        border: none;
        color: #d9534f;
        text-decoration: underline;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 20px;
    }

    .btn-delete:hover {
        font-weight: bold;
        color: #b52b27;
    }
</style>
