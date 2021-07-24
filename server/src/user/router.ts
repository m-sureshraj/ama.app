import { Router, Request, Response } from 'express';

import { asyncHandler, ResponseCodes } from '../infrastructure';
import { getUser } from './service';
import { mapPublicFields } from './domain';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    const user = await getUser(userId);

    res.status(ResponseCodes.ok).json(mapPublicFields(user));
  })
);

export default router;
