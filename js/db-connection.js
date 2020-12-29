const { MongoClient } = require('mongodb');
const env = require('../.env.json');
const DB_NAME = 'health';
const TRAININGS_COLL_NAME = "trainings";
const uri = "mongodb+srv://admin:"+env.mongoDB_PWD+"@healthpwacluster.j1te5.mongodb.net/health?retryWrites=true&w=majority&poolSize=20";

async function getDBClient(){
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        return client;
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        // await client.close();
    }
}

async function createResult(newTraining) {
    const client = await getDBClient();
    let id = null;
    if (client) {
        const result = await client.db(DB_NAME).collection(TRAININGS_COLL_NAME).insertOne(newTraining);
        id = result.insertedId;
        client.close();
    }
    return id;
}
async function getResults() {
    const client = await getDBClient();
    let results = [];
    if (client) {
        results = await client.db(DB_NAME).collection(TRAININGS_COLL_NAME).find().toArray();
        client.close();
    }
    return results;
}

exports.getResults = getResults;
exports.createResult = createResult;
