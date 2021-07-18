import { MongoClient } from 'mongodb';

import { papr } from './papr';
import { logger } from '../logger';
import { terminate } from '../terminate';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;

export const dbClient: MongoClient = new MongoClient(DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

export async function connectToMongo(): Promise<void> {
  logger.info('Connecting to the db');

  if (dbClient.isConnected()) {
    logger.info('Connection to the db already exist');
    return;
  }

  try {
    await dbClient.connect();
    logger.info('Successfully connected to the db');

    logger.info('Adding schema validation to the db');
    papr.initialize(dbClient.db());
    await papr.updateSchemas();
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to connect to the db');
    terminate({ gracefully: false });
  }
}

export async function disconnectFromMongo(force = false): Promise<void> {
  logger.info({ force }, 'Closing the DB connection');
  await dbClient.close(force);
}
