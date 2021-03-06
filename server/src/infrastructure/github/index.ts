import fetch from 'node-fetch';

import type { AccessToken, UserProfile } from './types';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const githubAuthBase = 'https://github.com/login/oauth';
const githubApiBase = 'https://api.github.com';

export function getAuthorizationUrl(scopes: string[]): string {
  const url = `${githubAuthBase}/authorize`;

  return `${url}?client_id=${GITHUB_CLIENT_ID}&scope${scopes.join(',')}`;
}

export async function getAccessToken(code: string): Promise<AccessToken> {
  const qs = [
    `client_id=${GITHUB_CLIENT_ID}`,
    `client_secret=${GITHUB_CLIENT_SECRET}`,
    `code=${code}`,
  ];
  const url = `${githubAuthBase}/access_token?${qs.join('&')}`;

  // fixme: Write a wrapper for `fetch` to handle exception separately
  const res = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
  });
  const token = await res.json();

  return {
    token: token.access_token,
    type: token.token_type,
    scope: token.scope,
  };
}

export async function getUserProfile(accessToken: string): Promise<UserProfile> {
  const url = `${githubApiBase}/user`;

  // fixme: Write a wrapper for `fetch` to handle exception separately
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const profile = await res.json();

  return {
    name: profile.name,
    email: profile.email,
    avatarUrl: profile.avatar_url,
  };
}
