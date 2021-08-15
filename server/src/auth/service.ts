import {
  getAccessToken,
  getAuthorizationUrl as getAuthUrl,
  getAuthorizedUser,
  logger,
} from '../infrastructure';
import { createUser } from '../user';

export function getAuthorizationUrl(): string {
  return getAuthUrl();
}

export async function signInOrSignUp(code: string): Promise<string> {
  const { token, scope } = await getAccessToken(code);
  const profile = await getAuthorizedUser(token);

  const acceptedScopes = scope.split(',');
  const user = await createUser({
    name: profile.login,
    email: profile.email,
    avatarUrl: profile.avatarUrl,
    accessToken: token,
    scopes: acceptedScopes,
  });

  logger.info(
    { id: user.id, scopes: acceptedScopes },
    'user successfully created/updated with the following scopes'
  );

  return user.id;
}
