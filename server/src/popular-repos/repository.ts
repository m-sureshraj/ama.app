import { types, schema } from 'papr';

import { papr } from '../infrastructure';
import { mapRepositoryDocument, Repository } from './domain';

const schemaOptions = {
  timestamps: true,
};

const repoSchema = schema(
  {
    addedBy: types.objectId({ required: true }),
    // isVerified: types.boolean(),
    repository: types.object(
      {
        id: types.number(),
        name: types.string(),
      },
      { required: true }
    ),
    owner: types.object(
      {
        id: types.number(),
        login: types.string(),
        name: types.string(),
        avatarUrl: types.string(),
        bio: types.string(),
      },
      { required: true }
    ),
  },
  schemaOptions
);

const Repo = papr.model('popular-repo', repoSchema);

export type RepoDocument = typeof repoSchema[0];
// export type RepoDocumentInput = Omit<RepoDocument, '_id' | 'createdAt' | 'updatedAt'>;

// todo: add paging support
export async function findAllRepos(): Promise<Repository[]> {
  const repos = await Repo.find({});

  return repos.map(mapRepositoryDocument);
}
