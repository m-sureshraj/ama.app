import { Router, Request, Response } from 'express';

import { getAuthorizationUrl, signInOrSignUp } from './service';
import { asyncHandler } from '../infrastructure';

const isDevelopment = process.env.NODE_ENV === 'development';
const APP_DOMAIN = process.env.APP_DOMAIN;

const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 2, // expires in 2 minutes
  domain: isDevelopment ? 'localhost' : APP_DOMAIN,
  secure: !isDevelopment,
};

const router = Router();

router.get('/signup', (req: Request, res: Response) => {
  const redirectUrl = getAuthorizationUrl();

  res.redirect(redirectUrl);
});

router.get(
  '/auth-callback',
  asyncHandler(async (req: Request, res: Response) => {
    const { code, error, error_description: errorDescription } = req.query;

    // user didn't authorize the application.
    if (error) {
      // fixme: use proper logging
      console.info('user denied the application access', { error, errorDescription });
      res.redirect(APP_DOMAIN as string);
      return;
    }

    const userId = await signInOrSignUp(code as string);

    // didn't sign it because the cookie.secure option is enabled in prod
    res.cookie('token', userId, cookieOptions);
    res.redirect(APP_DOMAIN as string);
  })
);

export default router;
