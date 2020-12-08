const { MongoClient } = require('mongodb');
const DB_NAME = 'health';
const DB_COLLECTION_NAME = "trainings";
const uri = "mongodb+srv://admin:Yc9uIMpei9Dalwop@healthpwacluster.j1te5.mongodb.net/health?retryWrites=true&w=majority";

async function getDBClient(){

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        return client;
    } catch (e) {
        console.error(e);
    } finally {
        // await client.close();
    }
}

async function createResult(newTraining) {
    const client = await getDBClient();
    let id = null;
    if (client) {
        const result = await client.db(DB_NAME).collection(DB_COLLECTION_NAME).insertOne(newTraining);
        id = result.insertedId;
    }
    client.close();
    return id;
}
async function getResults() {
    const client = await getDBClient();
    let results = [];
    if (client) {
        results = await client.db(DB_NAME).collection(DB_COLLECTION_NAME).find().toArray();
    }
    client.close();
    return results;
}

// exports.getDBClient = getDBClient;
exports.getResults = getResults;
exports.createResult = createResult;
