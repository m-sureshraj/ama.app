import { Router, Request, Response } from 'express';

import { asyncHandler, ResponseCodes, validateInput } from '../infrastructure';
import { getRepos, addRepo } from './service';
import { mapPublicFields } from './domain';
import { addPopularRepoSchema } from './validator';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const repos = await getRepos();

    res.status(ResponseCodes.ok).json(repos.map(mapPublicFields));
  })
);

router.post(
  '/',
  addPopularRepoSchema,
  validateInput(),
  asyncHandler(async (req: Request, res: Response) => {
    const { repoName, ownerName, userId } = req.body;

    await addRepo(userId, repoName, ownerName);
    res.sendStatus(ResponseCodes.ok);
  })
);

export default router;
