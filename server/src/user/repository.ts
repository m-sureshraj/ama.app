import { types, schema } from 'papr';

import { papr } from '../infrastructure';
import { mapUserDocument, User } from './domain';

const schemaOptions = {
  timestamps: true,
  defaults: {
    isAdmin: false,
  },
};

const userSchema = schema(
  {
    name: types.string({ required: true }),
    isAdmin: types.boolean(),
    email: types.string({ required: true }),
    accessToken: types.string({ required: true }),
    avatarUrl: types.string({ required: true }),
    scopes: types.array(types.string({ required: true }), {
      uniqueItems: true,
      required: true,
    }),
  },
  schemaOptions
);

const User = papr.model('user', userSchema);

export type UserDocument = typeof userSchema[0];
export type UserDocumentInput = Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>;

export async function create(doc: UserDocumentInput): Promise<User> {
  const user = await User.upsert({ email: doc.email }, { $set: doc });

  return mapUserDocument(user);
}

export async function findByUserId(id: string): Promise<User | null> {
  const user = await User.findById(id);
  if (!user) return null;

  return mapUserDocument(user);
}
