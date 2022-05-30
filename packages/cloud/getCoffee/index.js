// The function's dependencies.
const MongoClient = require('mongodb').MongoClient;

// Function starts here.
async function main() {

// MongoDB client configuration.
    const DATABASE_URL = process.env['DATABASE_URL'];
    let client = new MongoClient(DATABASE_URL);

// Instantiates a connection to the database and retrieves data from the `available-coffee` collection
    try {
        await client.connect();
        const inventory = await client.db("do-coffee").collection("available-coffees").find().toArray();
        console.log(inventory);
        return {
            "body": inventory
        }
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem retrieving data." },
            "statusCode": 400
        }
    } finally {
        await client.close();
    }
}

// IMPORTANT: Makes the function available as a module in the project. This is required for any functions that require external dependencies.

module.exports.main = main;
