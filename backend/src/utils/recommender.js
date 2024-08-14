import fs from 'fs';
import pg from 'pg';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const config = {
    user: process.env.PG_NAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
};

export const getTopRecommendations = async (text) => {
    try {
        const model = await use.load();
        const embeddings = await model.embed(text);
        const embeddingArray = embeddings.arraySync()[0];

        const client = new pg.Client(config);

        await client.connect();

        const pgResponse = await client.query(
            `SELECT * FROM home_and_kitchen 
            ORDER BY embedding <-> $1
            LIMIT 5;`, 
            [JSON.stringify(embeddingArray)]
        );

        await client.end();

        return pgResponse.rows;
    } catch (error) {
        console.error("Error processing request:", error);
        throw new Error("Failed to fetch recommendations");
    }
};
