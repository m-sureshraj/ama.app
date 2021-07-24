// to register db models
import './user/repository';

import { Router } from 'express';

import { authRouter } from './auth';
import { userRouter } from './user';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
