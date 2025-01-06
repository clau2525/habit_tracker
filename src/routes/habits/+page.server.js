import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() { 
    const habits = await db.getHabits(); // Fetch all habits from the database
    return { habits };  // Ensure habits are correctly returned to the frontend
}

// Actions for Creating and Deleting
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const newHabit = {
            name: data.get("name") || "Unnamed Habit",
            streak: 0,
            note: data.get("note") || "",  // Default note
        };

        await db.createHabit(newHabit);  // Save to MongoDB
        // Redirect back to refresh the habits page
        throw redirect(303, "/habits");  
    },

    incrementStreak: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");

        // Call the db function to increment the streak
        await db.updateHabitStreak(id);
        throw redirect(303, "/habits");
    }
};
