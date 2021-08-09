import fetch from 'node-fetch';
import { graphql } from '@octokit/graphql';

import type { AccessToken, RepositoryWithOwner, UserProfile } from './types';
import { handleFetchError } from '../util';
import { AppError, BadRequestError } from '../error';

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

  const res = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
  }).then(handleFetchError('An error occurred while fetching the access token'));

  const token = await res.json();
  if (token.error) {
    throw new AppError(token.error, { description: token.error.error_description });
  }

  return {
    token: token.access_token,
    type: token.token_type,
    scope: token.scope,
  };
}

export async function getUserProfile(accessToken: string): Promise<UserProfile> {
  const url = `${githubApiBase}/user`;

  const res = await fetch(url, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  }).then(handleFetchError('An error occurred while fetching the user profile'));

  const profile = await res.json();

  return {
    name: profile.name,
    email: profile.email,
    avatarUrl: profile.avatar_url,
  };
}

export async function getRepositoryWithOwner(
  accessToken: string,
  repoOwner: string
): Promise<RepositoryWithOwner> {
  const query = `query($repoOwner: String!) {
    user(login: $repoOwner) {
      id,
      name,
      avatarUrl,
      bio,
      repository(name: "ama") {
        id,
        name
      }
    }
  }`;

  try {
    const {
      user: { repository, ...rest },
    } = await graphql(query, {
      repoOwner,
      headers: {
        authorization: `token ${accessToken}`,
      },
    });

    return {
      repository,
      owner: rest as RepositoryWithOwner['owner'],
    };
  } catch (error) {
    if (error.name === 'GraphqlError') {
      throw new BadRequestError(error.message, {
        errors: error.errors,
        request: {
          ...error.request,
          headers: {
            ...error.request.headers,
            authorization: 'NOT AVAILABLE IN LOGS',
          },
        },
      });
    }

    throw error;
  }
}
