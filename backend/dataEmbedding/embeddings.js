import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

import fs from "fs"
import pgPromise from 'pg-promise'
const pgp = pgPromise({
    capSQL: true
})

//models
import * as tf from "@tensorflow/tfjs"
import * as use from "@tensorflow-models/universal-sentence-encoder"

//json file
import home from "./grocery.json" assert { type: 'json' }

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
}

const db = pgp(config)

const storeInPG = async (product) => {
    const columns = new pgp.helpers.ColumnSet(['product_name', 'image_link', 'product_link', 'ratings', 'discount_price', 'actual_price', 'description', 'embedding'], {table: 'grocery_and_gourmet_food'});

    const values = [];
    for (let i = 0; i < product.length; i++) {    
        values.push({
            product_name: product[i]['name'],
            image_link: product[i]['image'],
            product_link: product[i]['link'],
            ratings: product[i]['ratings'],
            discount_price: product[i]['discount_price'],
            actual_price: product[i]['actual_price'],
            description: product[i]['GeneratedDescription'],
            embedding: `[${product[i]['embedding']}]`
        });
    }
    

    const query = pgp.helpers.insert(values, columns);
    await db.none(query);
}

use.load().then(async model => {
    const batchSize = 100;
    for (let start = 0; start < home.length; start += batchSize) {
        const end = Math.min(start + batchSize, home.length);
        console.log(`Processing items from ${start} till ${end}.`);
        const productBatch = home.slice(start, end);
        const productDescription = productBatch.map(product => product['GeneratedDescription']);
        const embeddingsRequest = await model.embed(productDescription);
        const embeddings = embeddingsRequest.arraySync();

        for (let i = 0; i < productBatch.length; i++) {
            productBatch[i]['embedding'] = embeddings[i];
        }
        await storeInPG(productBatch);
    }
});