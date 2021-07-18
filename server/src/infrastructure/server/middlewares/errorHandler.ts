import type { Request, Response, NextFunction } from 'express';

import { NotFoundError, AppError, HttpError } from '../../error';
import { ResponseCodes } from '../../consts';
import { logger } from '../../logger';
import { terminate } from '../../terminate';

export const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(new NotFoundError('Not Found'));
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    const statusCode = (error as HttpError).httpStatus || ResponseCodes.error;
    const message = error.message || 'Not provided';

    logger.info({ message, err: error, req }, 'App error was caught by error handler middleware');

    res.status(statusCode).send({
      message,
    });
    return;
  }

  logger.fatal(
    { message: error.message, err: error, req },
    'Unknown Error was caught by error handler middleware'
  );
  terminate({ gracefully: false });
};
