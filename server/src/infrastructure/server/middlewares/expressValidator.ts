import { Request, Response, NextFunction, Handler } from 'express';
import { validationResult } from 'express-validator';

import { ResponseCodes } from '../../consts';

export function validateInput(): Handler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      next();
    } else {
      res.status(ResponseCodes.badRequest).json({ errors: validationErrors.array() });
    }
  };
}
