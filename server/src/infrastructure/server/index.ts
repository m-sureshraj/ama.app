import http, { Server } from 'http';

import type { Router } from 'express';

import { createExpressApp } from './express';
import { logger } from '../logger';
import { terminate } from '../terminate';

export * from './middlewares/asyncHandler';

let server: Server;

export function createServer(router: Router): void {
  const expressApp = createExpressApp(router);

  const port = process.env.PORT;
  server = http.createServer(expressApp);

  server.on('error', (error: Error) => {
    logger.fatal(error, 'An error was caught while starting the server');
    terminate({ gracefully: false });
  });

  server.listen(port, () => {
    logger.info(`Server is ready to accept requests on port ${port}`);
  });
}

export function closeServer(cb: () => void): void {
  if (server) {
    logger.info('closing the server');
    server.close(cb);
  }
}
