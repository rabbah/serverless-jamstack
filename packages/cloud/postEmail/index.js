const MongoClient = require('mongodb').MongoClient;

async function main(args) {
    const DATABASE_URL = process.env['DATABASE_URL'];
    let client = new MongoClient(DATABASE_URL);

    let newEmail = args.email;
    try {
        await client.connect();
        await client.db("do-coffee").collection("email-list").insertOne({subscriber: newEmail});
        console.log(`added ${newEmail} to database.`);
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the email address to the database." },
            "statusCode": 400
        }
    } finally {
        await client.close();
    }
}

module.exports.main = main;
