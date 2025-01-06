import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
    const journalEntries = await db.getJournalEntries();
    return { journalEntries };
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const newEntry = {
            title: data.get("title"),
            date: data.get("date"),
            mood: data.get("mood"),
            text: data.get("text")
        };

        // Call the database function to create the entry
        await db.createJournalEntry(newEntry);
        throw redirect(303, "/journal");
    }
};