import { types, schema } from 'papr';

import { papr } from '../infrastructure';

const schemaOptions = {
  timestamps: true,
};

const userSchema = schema(
  {
    name: types.string({ required: true }),
    email: types.string({ required: true }),
    accessToken: types.string({ required: true }),
    avatarUrl: types.string(),
    scopes: types.array(types.string(), {
      uniqueItems: true,
    }),
  },
  schemaOptions
);

const User = papr.model('user', userSchema);

export type UserDocument = typeof userSchema[0];
export type UserDocumentInput = Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>;

export async function create(doc: UserDocumentInput): Promise<UserDocument> {
  return User.upsert({ email: doc.email }, { $set: doc });
}
