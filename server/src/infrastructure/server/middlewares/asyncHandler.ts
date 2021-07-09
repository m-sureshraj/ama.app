import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
export function asyncHandler(callback: Function) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
}
