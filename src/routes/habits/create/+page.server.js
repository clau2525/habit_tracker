import db from "$lib/db.js";

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const newHabit = {
            name: data.get("name"),
            note: data.get("note")
        };
        
        await db.createHabit(newHabit); // Call the database function
        return { success: true };
    }
}; 