// to register db models
import './user/repository';
import './popular-repos/repository';

import { Router } from 'express';

import { authRouter } from './auth';
import { userRouter } from './user';
import { reposRouter } from './popular-repos';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/repos', reposRouter);
