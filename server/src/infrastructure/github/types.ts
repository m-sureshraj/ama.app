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
  repository: {
    id: string;
    name: string;
  } | null;
  owner: {
    id: string;
    name: string;
    avatarUrl: string;
    bio: string;
  };
}
