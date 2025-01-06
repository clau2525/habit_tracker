import db from "$lib/db.js";

export async function load() {
    const yearData = await db.getYearInPixels("12345");  // Static User ID
    return { yearData };  // Return the year data object
}

export const actions = {
    async updateDayMood({ request }) {
        const data = await request.formData();
        const index = parseInt(data.get("index"));
        const mood = parseInt(data.get("mood"));
        const userId = "12345";

        if (!isNaN(index) && !isNaN(mood)) {
            await db.updateDayMood(userId, index, mood);
        } else {
            console.error("Invalid input received");
        }
    }
};