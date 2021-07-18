// https://blog.heroku.com/best-practices-nodejs-errors
import process from 'process';
import { inspect } from 'util';

import { logger } from './logger';
import { terminate } from './terminate';

// OS sends this signal ie - process monitor
process.on('SIGTERM', (signal: string) => {
  logger.warn(`Process (${process.pid}) was shutdown with signal: ${signal}`);
  terminate();
});

// usually generally by ctrl + c
process.on('SIGINT', (signal: string) => {
  logger.warn(`Process (${process.pid}) was shutdown with signal: ${signal}`);
  terminate();
});

process.on('uncaughtException', (err: Error, origin: string): void => {
  logger.fatal({ err, origin }, 'Uncaught Exception');
  terminate({ gracefully: false });
});

process.on('unhandledRejection', (err: Error, promise: Promise<unknown>) => {
  // logger tries to stringify the raw promise which results an empty object
  logger.fatal({ err, promise: inspect(promise) }, 'Unhandled Rejection');
  terminate({ gracefully: false });
});
