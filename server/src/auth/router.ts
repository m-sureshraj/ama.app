import { Router, Request, Response, CookieOptions } from 'express';

import { getAuthorizationUrl, signInOrSignUp } from './service';
import { asyncHandler, logger } from '../infrastructure';

const isDevelopment = process.env.NODE_ENV === 'development';
const APP_DOMAIN = process.env.APP_DOMAIN as string;
const redirectAfterSignup = `${APP_DOMAIN}/app`;

const cookieName = 'id';
const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 10, // expires in 10 days
  domain: isDevelopment ? 'localhost' : APP_DOMAIN,
  secure: !isDevelopment,
  sameSite: 'lax',
  signed: true, // res.cookie() will use the secret passed to cookieParser(secret) to sign the value.
};

const router = Router();

router.get('/signup', (req: Request, res: Response) => {
  const redirectUrl = getAuthorizationUrl();

  res.redirect(redirectUrl);
});

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie(cookieName, cookieOptions).send({ message: 'Logged out' });
});

router.get(
  '/callback',
  asyncHandler(async (req: Request, res: Response) => {
    const { code, error, error_description: errorDescription } = req.query;

    if (error) {
      logger.info({ error, errorDescription }, 'user denied the application access');
      res.redirect(APP_DOMAIN);
      return;
    }

    try {
      const userId = await signInOrSignUp(code as string);
      logger.info({ userId }, 'authentication flow finished successfully');

      res.cookie(cookieName, userId, cookieOptions);
      res.redirect(redirectAfterSignup);
    } catch (error) {
      logger.error({ error, req }, 'An error occurred while processing the auth callback');
      res.redirect(`${APP_DOMAIN}?error=auth_failed`);
    }
  })
);

export default router;
