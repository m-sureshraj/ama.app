import { body } from 'express-validator';

import { supportedRepositoryNames } from './domain';

export const addPopularRepoSchema = [
  body('repoName')
    .isIn(supportedRepositoryNames)
    .withMessage(`must be one of [${supportedRepositoryNames.join(', ')}]`),
  body('ownerName').trim().notEmpty().escape(),
];
