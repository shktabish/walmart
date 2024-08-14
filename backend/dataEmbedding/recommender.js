import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import fs from 'fs'
import pg from 'pg'

//models    
import * as tf from '@tensorflow/tfjs'
import * as use from '@tensorflow-models/universal-sentence-encoder'

const config = {
    user: "avnadmin",
    password: "AVNS_RFEmJuXRP9v7DvMIwpD",
    host: "pg-walmart-bot-walmart.k.aivencloud.com",
    port: 28810,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString(),
    },
}

use.load().then(async model => {
    const embeddings = await model.embed("Illuminate your space with this sleek and compact table lamp. Designed to fit perfectly in small spaces, its modern and minimalist style complements any decor. The lamp features a space-saving design with an adjustable light intensity, providing just the right amount of light for reading, working, or creating a cozy ambiance. Ideal for desks, nightstands, or side tables, this lamp combines functionality with elegance in a small footprint.");
    const embeddingArray = embeddings.arraySync()[0];

    const client = new pg.Client(config);
    try {
        await client.connect();
    } catch (error) {
        console.error("error connecting to db", error);
    }

    try {
        const pgResponse = await client.query(
            `SELECT * FROM home_and_kitchen 
            ORDER BY embedding <-> '${JSON.stringify(embeddingArray)}' 
            LIMIT 5;`
        );
        console.log(pgResponse.rows);
    } catch (err) {
        console.error(err, "error here");
    } finally {
        await client.end()
    }
});