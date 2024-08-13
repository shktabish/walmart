import fs from 'fs';
import csv from 'csv-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeToPath } from 'fast-csv';

// Set up your API key
const API_KEY = 'AIzaSyCYhBGsWPGwEaq58Nu7ot04oYNTSD1IY44';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a description using Google Gemini
const generateDescription = async (text) => {
  try {
    const prompt = `Write a description based on the following: "${text}". Do not use any markup language and write in 1 paragraph only.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating description:', error);
    return null;
  }
};

// Function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to process the CSV file with start and end indexes
const processCSV = async (startIndex = 0, endIndex = Infinity) => {
  const rows = [];
  const results = [];

  fs.createReadStream('home.csv')
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', async () => {
      // Ensure endIndex does not exceed the number of rows
      endIndex = Math.min(endIndex, rows.length);

      for (let index = startIndex; index < endIndex; index++) {
        const row = rows[index];
        const text = row['name']; // Replace 'name' with the actual column name
        const description = await generateDescription(text);

        if (description) {
          row['GeneratedDescription'] = description; // Add the description as a new column
        } else {
          row['GeneratedDescription'] = 'Error generating description';
        }

        results.push(row); // Collect results

        // Log completion of each row
        console.log(`Completed processing row ${index + 1}`);

        // Delay the next request to stay within the rate limit
        await delay(5000); // 5 seconds delay
      }

      // Write all results to a new CSV file at once
      writeToPath('output.csv', results, { headers: true })
        .on('finish', () => {
          console.log('CSV processing completed. Check output.csv for results.');
        });
    });
};

// Example usage with start and end indexes
const startIndex = 800; // Change this as needed
const endIndex = 1000; // Change this as needed

processCSV(startIndex, endIndex);
