import { Router, Request, Response, CookieOptions } from 'express';

import { getAuthorizationUrl, signInOrSignUp } from './service';
import { asyncHandler, logger } from '../infrastructure';

const isDevelopment = process.env.NODE_ENV === 'development';
const APP_DOMAIN = process.env.APP_DOMAIN as string;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 2, // expires in 2 minutes
  domain: isDevelopment ? 'localhost' : APP_DOMAIN,
  secure: !isDevelopment,
  sameSite: 'lax',
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

    if (error) {
      logger.info({ error, errorDescription }, 'User denied the application access');
      res.redirect(APP_DOMAIN);
      return;
    }

    const userId = await signInOrSignUp(code as string);
    logger.info({ userId }, 'authentication flow finished successfully');

    // didn't sign it because the cookie transmitted over a secure connection in prod.
    res.cookie('id', userId, cookieOptions);
    res.redirect(APP_DOMAIN);
  })
);

export default router;
