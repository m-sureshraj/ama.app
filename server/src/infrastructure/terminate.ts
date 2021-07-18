import process from 'process';

import { disconnectFromMongo } from './db/connection';
import { closeServer } from './server';

interface Options {
  gracefully?: boolean;
  timeout?: number;
}

type DisconnectFn = (force?: boolean) => Promise<void> | void;

const disconnectFunctions: Array<DisconnectFn> = [disconnectFromMongo];

export async function terminate({ gracefully = true, timeout = 500 }: Options = {}): Promise<void> {
  try {
    const force = !gracefully;
    for (const disconnect of disconnectFunctions) {
      await disconnect(force);
    }

    // stop accepting new connections, then shut down the process
    closeServer(() => {
      process.exit(0);
    });

    // If server hasn't finished in specified timeout, shut down the process
    setTimeout(() => {
      process.exit(1);
    }, timeout).unref();
  } catch (error) {
    process.exit(1);
  }
}
