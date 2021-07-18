import { UserDocument } from './repository';

export interface User extends Omit<UserDocument, '_id'> {
  id: string;
}

export function mapUserDocument({ _id, ...rest }: UserDocument): User {
  return {
    id: _id.toHexString(),
    ...rest,
  };
}

export function mapPublicFields(
  user: User
): Omit<User, 'accessToken' | 'scopes' | 'createdAt' | 'updatedAt'> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}
