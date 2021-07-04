import { MongoClient } from 'mongodb';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;

export const dbClient: MongoClient = new MongoClient(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToMongo() {
  console.debug('Connecting to the mongo db');

  if (dbClient.isConnected()) {
    console.debug('Connection to the mongo db already exist');
    return;
  }

  await dbClient.connect();
  console.info('Successfully connected to the db');
}

export async function disconnectFromMongo(force = false) {
  console.info('Closing the DB connection');
  await dbClient.close(force);
}
