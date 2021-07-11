import type { Request, Response, NextFunction } from 'express';

import { NotFoundError, AppError, HttpError } from '../../error';
import { ResponseCodes } from '../../consts';

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

    res.status(statusCode).send({
      message,
    });
    return;
  }

  // todo: log.fatal
  // todo: terminate
};
