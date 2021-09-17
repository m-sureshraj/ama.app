import { Router, Request, Response } from 'express';

import { asyncHandler, ResponseCodes, validateInput } from '../infrastructure';
import { getRepos, addRepo } from './service';
import { mapPublicFields } from './domain';
import { addPopularRepoSchema, getPopularReposSchema } from './validator';

const router = Router();

type numberOrUndefined = number | undefined;

router.get(
  '/',
  getPopularReposSchema,
  validateInput(),
  asyncHandler(async (req: Request, res: Response) => {
    const { skip, limit } = req.query;
    const { total, repos } = await getRepos(skip as numberOrUndefined, limit as numberOrUndefined);

    res.status(ResponseCodes.ok).json({
      total,
      repos: repos.map(mapPublicFields),
    });
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
