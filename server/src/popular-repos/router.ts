import { Router, Request, Response } from 'express';

import { asyncHandler, ResponseCodes } from '../infrastructure';
import { getRepos } from './service';
import { mapPublicFields } from './domain';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const repos = await getRepos();

    res.status(ResponseCodes.ok).json(repos.map(mapPublicFields));
  })
);

export default router;
