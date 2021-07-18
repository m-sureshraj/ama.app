import type { UserDocumentInput, UserDocument } from './repository';
import { create } from './repository';

export async function createUser(user: UserDocumentInput): Promise<UserDocument> {
  return create(user);
}
