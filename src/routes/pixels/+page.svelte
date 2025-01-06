<script>
    export let data;
    let days = data.yearData.year_data; // Corrected days initialization
    let moods = [
        { label: "No data", color: "#E0E0E0" },
        { label: "Neutral", color: "#F5E1A4" },
        { label: "Happy", color: "#A7D7A6" },
        { label: "Sad", color: "#8AB6D6" },
        { label: "Excited", color: "#F6A68E" },
        { label: "Angry", color: "#E57373" },
    ];

    // Update mood locally and in server
    async function updateDayColor(index) {
        days[index] = (days[index] + 1) % moods.length; // Rotate through moods
        const formData = new FormData();
        formData.append("index", index);
        formData.append("mood", days[index]); // Send the updated mood to the server

        try {
            const response = await fetch("?/updateDayMood", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                console.error("Failed to update mood in DB");
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

    let showInfo = false;

</script>

<h1 class="text-center">Year in Pixels</h1>
<p class="text-center">Click on a day to set your mood! </p>

<!-- Mood Legend -->
<div class="legend">
    {#each moods as mood}
        <span style="background-color: {mood.color};">{mood.label}</span>
    {/each}
    
        <!-- Tooltip Icon with Hover Effect -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<p class="text-center"
style="position: relative; display: inline-block; cursor: pointer;"
on:mouseover={() => showInfo = true} 
on:mouseleave={() => showInfo = false}>ℹ️
</p>
</div>

<!--Grid Layout -->
<div class="grid">
    {#each days as mood, index}
        <button
            type="button"
            class="pixel {index === new Date().getDate() - 1 ? 'today-marker' : ''}"
            style="background-color: {moods[mood].color};"
            on:click={() => updateDayColor(index)}
            on:keydown={(e) =>
                (e.key === "Enter" || e.key === " ") && updateDayColor(index)}
            aria-label={`Set mood for day ${index + 1}`}
        ></button>
    {/each}
</div>

<!-- Grid -->
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(20px, 1fr)
        ); /* Adapts to screen size */
        grid-auto-rows: 20px;
        gap: 2px;
        justify-content: center;
        margin-top: 20px;
        max-width: 700px; /* Limits grid width for better structure */
        margin: 0 auto;
    }

    .pixel {
        width: 100%; /* Flexible size based on column setup */
        height: 20px;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    .pixel:hover {
        border-color: transparent;
    }

    .pixel.today-marker {
        /* border: 2px solid #ff4500; Soft orange border for today */
        box-shadow: 0 0 5px rgb(93, 93, 93); /* Gentle glow effect */
    }

    .legend {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .legend span {
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.9rem;
        border: 1px solid #ddd;
    }
</style>

<!-- Floating Tooltip -->
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
            max-width: 250px;
        "
    >
    📅 <strong>How to use:</strong><br>
    - Click once on a day to mark your mood. The mood will cycle through the options above.<br>
    - The colors represent different moods, from neutral to intense feelings.<br>
    - The pixel highlighted represents the current day. Try to keep track of your moods daily!<br>
    - Missing a day? Simply leave the box grey or click to set your mood retroactively.<br>
    <br>
    <i>Start capturing your emotions one pixel at a time!</i>
    </div>
{/if}