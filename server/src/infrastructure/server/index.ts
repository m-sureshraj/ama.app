import http from 'http';

import type { Router } from 'express';

import { createExpressApp } from './express';

export function createServer(router: Router): void {
  const expressApp = createExpressApp(router);

  const port = process.env.PORT;
  const server = http.createServer(expressApp);

  server.on('error', (err: Error) => {
    console.error(err);
    // todo: terminate the app
  });

  server.listen(port, () => {
    console.info(`Server is ready to accept requests on port ${port}`);
  });
}

export * from './middlewares/asyncHandler';
