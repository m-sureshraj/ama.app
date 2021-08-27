import type { Request, Response, NextFunction } from 'express';

import { ResponseCodes } from '../../consts';

export function checkAuth(req: Request, res: Response, next: NextFunction): void {
  if (res.locals.skipAuthCheck) {
    next();
    return;
  }

  // Signed cookies that fail signature validation will
  // have the value false instead of the tampered value.
  const userId = req.signedCookies.id;
  if (!userId) {
    res.status(ResponseCodes.unauthorized).json({ message: 'Not authorized' });
    return;
  }

  req.body.userId = userId;
  next();
}
