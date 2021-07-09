import { Router, Request, Response } from 'express';

import { asyncHandler } from '../infrastructure';

const router = Router();

router.get(
  '/me',
  asyncHandler(async (req: Request, res: Response) => {
    res.send('hello');
  })
);

export default router;
