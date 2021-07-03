import { getAccessToken, getAuthorizationUrl as getAuthUrl } from '../infrastructure';

// let's start with the empty scope
const scopes: string[] = [];

export function getAuthorizationUrl(): string {
  return getAuthUrl(scopes);
}

export async function signInOrSignUp(code: string): Promise<string> {
  const token = await getAccessToken(code);

  // todo:
  // fetch the user profile data with access token
  // signup or sign-in the user
  // return the user id
  return '100';
}
