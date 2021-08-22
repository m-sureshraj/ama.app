import fetch from 'node-fetch';
import { graphql } from '@octokit/graphql';
import type { User } from '@octokit/graphql-schema';

import type { AccessToken, RepositoryWithOwner, AuthorizedUser } from './types';
import { handleFetchError } from '../util';
import { AppError, GraphqlError } from '../error';
import { getAuthorizedUserQuery, getUserWithRepositoryQuery } from './queries';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const githubAuthBase = 'https://github.com/login/oauth';
const scopes: string[] = ['read:user'];

export function getAuthorizationUrl(): string {
  const url = `${githubAuthBase}/authorize`;

  return `${url}?client_id=${GITHUB_CLIENT_ID}&scope=${scopes.join(',')}`;
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

export async function getAuthorizedUser(accessToken: string): Promise<AuthorizedUser> {
  try {
    const { viewer } = await graphql<{ viewer: AuthorizedUser }>(getAuthorizedUserQuery, {
      headers: {
        authorization: `token ${accessToken}`,
      },
    });

    return viewer;
  } catch (error) {
    if (error.name === 'GraphqlError') {
      throw new GraphqlError(error);
    }

    throw error;
  }
}

export async function getRepositoryWithOwner(
  accessToken: string,
  ownerLogin: string,
  repoName: string
): Promise<RepositoryWithOwner> {
  try {
    const {
      user: { repository, ...rest },
    } = await graphql<{ user: User }>(getUserWithRepositoryQuery, {
      repoOwner: ownerLogin,
      repoName,
      headers: {
        authorization: `token ${accessToken}`,
      },
    });

    return {
      repository: repository || null,
      owner: rest,
    };
  } catch (error) {
    if (error.name === 'GraphqlError') {
      throw new GraphqlError(error);
    }

    throw error;
  }
}
