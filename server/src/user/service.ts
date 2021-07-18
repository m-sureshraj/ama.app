import type { UserDocumentInput } from './repository';
import { create, findByUserId } from './repository';
import { NotFoundError } from '../infrastructure';
import { User } from './domain';

export async function createUser(user: UserDocumentInput): Promise<User> {
  return create(user);
}

export async function getUser(id: string): Promise<User> {
  const user = await findByUserId(id);
  if (!user) {
    throw new NotFoundError('could not find the user by id', { id });
  }

  return user;
}
