import { types, schema } from 'papr';

import { papr } from '../infrastructure';

const schemaOptions = {
  timestamps: true,
};

const userSchema = schema(
  {
    name: types.string({ required: true }),
    email: types.string({ required: true }),
    avatarUrl: types.string(),
    accessToken: types.string({ required: true }),
  },
  schemaOptions
);

const User = papr.model('user', userSchema);

type UserDocument = typeof userSchema[0];
type UserDocumentInput = Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>;

export async function create(doc: UserDocumentInput): Promise<UserDocument> {
  // todo: handle schema validation errors
  return User.insertOne(doc);
}

export async function update(updatedUser: UserDocumentInput): Promise<UserDocument | null> {
  // todo: handle schema validation errors
  return User.findOneAndUpdate(
    { email: updatedUser.email },
    { $set: updatedUser },
    {
      returnDocument: 'after',
    }
  );
}
