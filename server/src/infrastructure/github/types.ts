import type { User, Repository } from '@octokit/graphql-schema';

export interface AccessToken {
  token: string;
  type: string;
  scope: string;
}

export type AuthorizedUser = Pick<User, 'login' | 'email' | 'avatarUrl'>;

export interface RepositoryWithOwner {
  repository: Pick<Repository, 'id' | 'name'> | null;
  owner: Pick<User, 'id' | 'name' | 'login' | 'avatarUrl' | 'bio'>;
}
