import type { User, Repository } from '@octokit/graphql-schema';

export interface AccessToken {
  token: string;
  type: string;
  scope: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface RepositoryWithOwner {
  repository: Pick<Repository, 'id' | 'name'> | null;
  owner: Pick<User, 'id' | 'name' | 'avatarUrl' | 'bio'>;
}
