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
