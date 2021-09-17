import { body, query } from 'express-validator';

import { supportedRepositoryNames } from './domain';

export const addPopularRepoSchema = [
  body('repoName')
    .isIn(supportedRepositoryNames)
    .withMessage(`must be one of [${supportedRepositoryNames.join(', ')}]`),
  body('ownerName').trim().notEmpty().escape(),
];

export const getPopularReposSchema = [
  query('limit').optional().isInt({ gt: -1 }).toInt(10).withMessage('Must be a positive number'),
  query('skip').optional().isInt({ gt: -1 }).toInt(10).withMessage('Must be a positive number'),
];
