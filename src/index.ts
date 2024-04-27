import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";

// Initialize ElevenLabs API client
const elevenLabsClient = new ElevenLabsClient({
    apiKey: "YOUR_API_KEY"
});

async function managePronunciationDictionary() {
    try {
        // Step 1: Add a Pronunciation Dictionary from a PLS File
        const fileStream = fs.createReadStream("/path/to/your/tomato-pronunciation.pls");
        const dictionaryDetails = {
            name: "Tomato Pronunciations",
            description: "Contains different pronunciations for the word tomato."
        };

        const addedDictionary = await elevenLabsClient.pronunciationDictionary.addFromFile(
            fileStream,
            dictionaryDetails,
        );
        console.log("Dictionary added:", addedDictionary);

        // Step 2: View the Pronunciation Dictionary
        const pronunciationDictionaryId = addedDictionary.id; // Use the ID from the added dictionary
        const dictionaryMetadata = await elevenLabsClient.pronunciationDictionary.get(pronunciationDictionaryId);
        console.log("Dictionary details:", dictionaryMetadata);

        // Step 3: Remove the Pronunciation Dictionary
        await elevenLabsClient.pronunciationDictionary.delete(pronunciationDictionaryId);
        console.log("Pronunciation dictionary was successfully deleted.");

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Run the function
managePronunciationDictionary();
