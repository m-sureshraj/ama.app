import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { notFoundErrorHandler } from './middlewares/errorHandler';

const corsOption = {
  origin: process.env.APP_DOMAIN,
  // this tells browsers to attach cookies to the cross-origin requests
  credentials: true,
};

export function createExpressApp(router: express.Router): express.Application {
  const app: express.Application = express();

  // app.use(helmet());

  app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
  });

  app.use(cors(corsOption));

  app.use(cookieParser());

  // parses incoming request's json body
  app.use(express.json());

  app.use(router);

  app.use(notFoundErrorHandler);

  // app.use(expressErrorHandler);

  return app;
}
