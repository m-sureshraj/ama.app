import type { Request, Response, NextFunction } from 'express';

import { NotFoundError } from '../../error';

export const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(new NotFoundError('Not Found'));
};
