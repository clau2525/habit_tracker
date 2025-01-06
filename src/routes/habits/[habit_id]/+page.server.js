import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
    const habit = await db.getHabitById(params.habit_id);
    return { habit };
}

export const actions = {

    resetStreak: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        const comment = data.get("comment");  // Capture the comment input
        await db.resetHabitStreak(id, comment);
        throw redirect(303, `/habits/${id}`);
    },
    
    delete: async ({ request }) => {
            const data = await request.formData();
            const id = data.get("id");
    
            await db.deleteHabit(id);  // Delete from MongoDB
    
            // Redirect back to refresh the habits page
            throw redirect(303, "/habits");  
        }
};