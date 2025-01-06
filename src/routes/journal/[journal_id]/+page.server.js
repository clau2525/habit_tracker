import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
    try {
        const journalEntry = await db.getJournalEntryById(params.journal_id);
        
        // Check if entry is returned
        if (!journalEntry) {
            console.error("No journal entry found with that ID.");
            return {
                status: 404,
                error: new Error("Journal entry not found.")
            };
        }
        return {
            journalEntry
        };
    } catch (error) {
        console.error("Error fetching journal entry:", error.message);
        return {
            status: 500,
            error: new Error("Failed to load journal entry.")
        };
    }
}

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");

        // Call the database function to delete the entry
        await db.deleteJournalEntry(id);
        throw redirect(303, "/journal");
    }
};