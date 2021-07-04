import {
  getAccessToken,
  getAuthorizationUrl as getAuthUrl,
  getUserProfile,
} from '../infrastructure';

// let's start with the empty scope
const scopes: string[] = [];

export function getAuthorizationUrl(): string {
  return getAuthUrl(scopes);
}

export async function signInOrSignUp(code: string): Promise<string> {
  const { token } = await getAccessToken(code);
  const profile = await getUserProfile(token);

  console.log(profile);

  // todo:
  // create/update user in db
  // return the created user id
  return 'xxx';
}
