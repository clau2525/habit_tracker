import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("Prototyping_Einzelarbeit"); // select database

// Collections for habits and journal entries
const habitsCollection = db.collection("habits");
const yearInPixelsCollection = db.collection("year_in_pixels");
const journalCollection = db.collection("journal");

/////////////////////////////////////
// HABITS COLLECTION FUNCTIONS
/////////////////////////////////////

// Get all habits
async function getHabits() {
  let habits = [];
  try {
    const collection = db.collection("habits");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    habits = await collection.find(query).toArray();
    habits.forEach((habit) => {
      habit._id = habit._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return habits;
}

// Get habit by id
async function getHabitById(id) {
  let habit = null;
  try {
    const collection = db.collection("habits");
    const query = { _id: new ObjectId(id) }; // filter by id
    habit = await collection.findOne(query);

    if (!habit) {
      console.log("No habit with id " + id);
      // TODO: errorhandling
    } else {
      habit._id = habit._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return habit;
}

// create habit
async function createHabit(habit) {
    habit.name = habit.name || "Unnamed Habit";
    habit.note = habit.note || "";  // Prevent overwriting submitted notes
    habit.streak = 0;

    try {
        const collection = db.collection("habits");
        const result = await collection.insertOne(habit);
        return result.insertedId.toString();
    } catch (error) {
        console.log(error.message);
    }
    return null;
}


// Increment the streak of a habit by 1 using MongoDB's $inc operator
async function updateHabitStreak(id) {
  try {
    const collection = db.collection("habits");
    const query = { _id: new ObjectId(id) };

    // Increment the streak by +1 using $inc
    const result = await collection.updateOne(query, {
      $inc: { streak: 1 }
    });

    if (result.matchedCount === 0) {
      console.log("No habit found with the given ID.");
    } else {
      console.log(`Habit with ID ${id} updated successfully!`);
      return id;
    }
  } catch (error) {
    console.error("Error updating habit streak:", error);
  }
  return null;
}


// delete habit by id
// returns: id of the deleted habit or null, if habit could not be deleted
async function deleteHabit(id) {
  try {
    const collection = db.collection("habits");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No habit with id " + id);
    } else {
      console.log("Habit with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// reset the streak of a habit
async function resetHabitStreak(id, comment) {
  try {
      const collection = db.collection("habits");
      const habit = await collection.findOne({ _id: new ObjectId(id) });

      if (habit) {
          const currentDate = new Date().toLocaleDateString('en-GB'); // Date in DD/MM/YYYY format
          const historyEntry = {
              date: `${comment} (${currentDate})`, // Comment first, then date
              streak: habit.streak
          };

          // Push the history entry and reset the streak
          await collection.updateOne(
              { _id: new ObjectId(id) },
              {
                  $push: { history: historyEntry },
                  $set: { streak: 0 }
              }
          );
      }
  } catch (error) {
      console.error("Error resetting streak:", error);
  }
}
/////////////////////////////////////
// JOURNAL COLLECTION FUNCTIONS
/////////////////////////////////////

export async function getJournalEntries() {
  const entries = await journalCollection.find().toArray();
  entries.forEach((entry) => {
      entry._id = entry._id.toString(); // Convert ObjectId to String for Svelte compatibility
  });
  return entries;
}

// Create a new journal entry
// Takes whatever entry is passed and inserts it directly into the database without modifications.
export async function createJournalEntry(entry) {
  await journalCollection.insertOne(entry); 
}
/* Explicitly defines what fields should be stored (title, date, mood, text) and handles errors and feedback.
export async function createJournalEntry(entry) {
  try {
      const journalEntry = {
          title: entry.title,  // Make sure title is included here
          date: entry.date,
          mood: entry.mood,
          text: entry.text
      };

      const result = await journalCollection.insertOne(journalEntry);
      console.log("Saved Journal Entry:", journalEntry);  // Debugging log
      return result.insertedId.toString();
  } catch (error) {
      console.error("Error saving journal entry:", error);
  }
}*/


// Delete a journal entry by ID
export async function deleteJournalEntry(id) {
  await journalCollection.deleteOne({ _id: new ObjectId(id) });
}

// Fetch a single journal entry by ID
export async function getJournalEntryById(id) {
  try {
      // Ensure it's converted to a valid ObjectId
      const entry = await journalCollection.findOne({ _id: new ObjectId(id) });
      if (entry) {
          entry._id = entry._id.toString(); // Convert for Svelte compatibility
      }
      return entry;
  } catch (error) {
      console.error("Error fetching journal entry by ID:", error.message);
      return null;
  }
}


/////////////////////////////////////
// YEAR IN PIXELS COLLECTION FUNCTIONS
/////////////////////////////////////

// Fetch year data for a specific user
export async function getYearInPixels(userId) {
  let data = await yearInPixelsCollection.findOne({ user_id: userId });
  if (data && data._id) {
      data._id = data._id.toString();  // Convert ObjectId to a string
  }
  if (!data) {
      data = { user_id: userId, year_data: Array(365).fill(0) }; 
      const result = await yearInPixelsCollection.insertOne(data);
      data._id = result.insertedId.toString(); // Convert the inserted ID to a string
  }
  return data;
}

// Update a specific day's mood in the database
export async function updateDayMood(userId, index, mood) {
  try {
      const result = await yearInPixelsCollection.updateOne(
          { user_id: userId },
          { $set: { [`year_data.${index}`]: mood } }
      );
      if (result.modifiedCount > 0) {
          console.log(`Day ${index} updated successfully!`);
      } else {
          console.log("No document updated.");
      }
  } catch (error) {
      console.error("Error updating day mood:", error);
  }
}

// export all functions so that they can be used in other files
export default {
  getHabits,
  getHabitById,
  createHabit,
  deleteHabit,
  updateHabitStreak,
  resetHabitStreak,
  getJournalEntries,
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntryById,
  getYearInPixels,
  updateDayMood
};