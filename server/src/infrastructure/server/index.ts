import http from 'http';

import type { Router } from 'express';

import { createExpressApp } from './express';
import { logger } from '../logger';

export function createServer(router: Router): void {
  const expressApp = createExpressApp(router);

  const port = process.env.PORT;
  const server = http.createServer(expressApp);

  server.on('error', (error: Error) => {
    logger.fatal(error, 'An error was caught while starting the server');
    // todo: terminate the app
  });

  server.listen(port, () => {
    logger.info(`Server is ready to accept requests on port ${port}`);
  });
}

export * from './middlewares/asyncHandler';
