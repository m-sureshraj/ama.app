import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { logger } from '../logger';
import { checkAuth } from './middlewares/checkAuth';
import { notFoundErrorHandler, errorHandler } from './middlewares/errorHandler';

const corsOption = {
  origin: process.env.APP_DOMAIN,
  // this tells browsers to attach cookies to the cross-origin requests
  credentials: true,
};

const publicRoutes = ['/signup', '/auth-callback'];

export function createExpressApp(router: express.Router): express.Application {
  const app: express.Application = express();

  // app.use(helmet());

  // todo: is it necessary? what about tracing tools ie dd-trace
  app.use((req, res, next) => {
    logger.info(req.originalUrl);
    next();
  });

  app.use(cors(corsOption));

  app.use(cookieParser());

  app.use(express.json());

  app.all(publicRoutes, (req, res, next) => {
    res.locals.skipAuthCheck = true;
    next();
  });

  app.use(checkAuth);

  app.use(router);

  app.use(notFoundErrorHandler);

  app.use(errorHandler);

  return app;
}
