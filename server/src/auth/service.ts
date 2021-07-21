import {
  getAccessToken,
  getAuthorizationUrl as getAuthUrl,
  getUserProfile,
  logger,
} from '../infrastructure';
import { createUser } from '../user';

// let's start with the empty scope
const scopes: string[] = [];

export function getAuthorizationUrl(): string {
  return getAuthUrl(scopes);
}

export async function signInOrSignUp(code: string): Promise<string> {
  const { token, scope } = await getAccessToken(code);
  const profile = await getUserProfile(token);

  const acceptedScopes = scope.split(',');
  const user = await createUser({
    name: profile.name,
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
