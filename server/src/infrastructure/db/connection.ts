import { MongoClient } from 'mongodb';

import { papr } from './papr';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;

export const dbClient: MongoClient = new MongoClient(DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
});

export async function connectToMongo(): Promise<void> {
  console.debug('Connecting to the mongo db');

  if (dbClient.isConnected()) {
    console.debug('Connection to the mongo db already exist');
    return;
  }

  await dbClient.connect();
  console.info('Successfully connected to the db');

  console.info('Adding schema validation to the mongo db');
  papr.initialize(dbClient.db());
  await papr.updateSchemas();
}

export async function disconnectFromMongo(force = false): Promise<void> {
  console.info('Closing the DB connection');
  await dbClient.close(force);
}
