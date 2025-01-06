<script>
    export let data;
    let habits = data.habits;
</script>

<!-- Header Section -->
<div class="container mt-4">
    <div class="row justify-content-between align-items-center my-4">
        <div class="col">
            <h1 class="title">🌿 My Habits</h1>
        </div>
        <div class="col-auto">
            <!-- Soft Blue Button with Rounded Corners -->
            <a
                href="/habits/create"
                class="btn btn-lightblue btn-lg rounded-pill shadow-sm"
                >➕ Add New Habit</a
            >
        </div>
    </div>
</div>

<!-- Container with Bootstrap Grid Layout -->
<div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <!-- Loop through habits -->
        {#each habits as habit (habit._id)}
            <div class="col">
                <!-- Card with Shadow and Padding -->
                <div class="card p-4 custom-card fixed-height shadow-sm">
                    <h3 class="habit-title">
                        <a href={`/habits/${habit._id}`}
                            >{habit.name || "Unnamed Habit"}</a
                        >
                    </h3>
                    <p class="text-muted">
                        <strong>Days Accomplished:</strong>
                        {habit.streak}
                    </p>
                    {#if habit.note}
                        <p><strong>Note:</strong> {habit.note}</p>
                    {/if}

                    <!-- Softer Green Button Section -->
                    <form method="POST" action="?/incrementStreak">
                        <input type="hidden" name="id" value={habit._id} />
                        <button
                            type="submit"
                            class="btn-icon"
                            aria-label="Mark as accomplished"
                        >
                            ✔
                        </button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- CSS Styling -->
<style>
    .title {
        font-size: 2.3rem;
        font-weight: bold;
        color: #2a2a2a;
    }

    .fixed-height {
        height: 230px; /* Fixed height for all cards */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .custom-card {
        border: 1px solid #ddd;
        border-radius: 16px;
        background: #fafafa;
        padding: 20px;
        transition:
            box-shadow 0.3s ease-in-out,
            transform 0.2s ease-in-out;
    }

    .custom-card:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-5px);
    }

    .habit-title a {
        text-decoration: none;
        color: #0077b6; /* Softer Blue */
        font-weight: bold;
    }

    .habit-title a:hover {
        text-decoration: underline;
    }

    /* Soft Blue Button */
    .btn-lightblue {
        background-color: #85c1e9;
        border: none;
        color: #fff;
    }

    .btn-lightblue:hover {
        background-color: #5dade2;
    }

    /* Softer Green Button and button */
    /* Unified Icon Button Styling */
    .btn-icon {
        background-color: #a8d5ba; /* Soft green */
        border: none;
        padding: 8px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        transition:
            background-color 0.3s ease,
            transform 0.2s ease;
        margin-left: auto; /* Right alignment */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Hover Effect */
    .btn-icon:hover {
        background-color: #7bbf8d;
        transform: scale(1.1);
    }

    /* Active Click Effect */
    .btn-icon:active {
        transform: scale(0.9);
    }
    .text-muted {
        font-size: 1.1rem;
    }
</style>
