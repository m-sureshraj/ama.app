import { types, schema } from 'papr';

import { papr } from '../infrastructure';
import { mapRepositoryDocument, Repository } from './domain';

const schemaOptions = {
  timestamps: true,
};

// todo: unique index combining repo name and owner login
const repoSchema = schema(
  {
    addedBy: types.objectId({ required: true }),
    repository: types.object(
      {
        id: types.string({ required: true }),
        name: types.string({ required: true }),
      },
      { required: true }
    ),
    owner: types.object(
      {
        id: types.string({ required: true }),
        login: types.string({ required: true }),
        name: types.string(),
        avatarUrl: types.string({ required: true }),
        bio: types.string(),
      },
      { required: true }
    ),
  },
  schemaOptions
);

const Repo = papr.model('popular-repo', repoSchema);

export type RepoDocument = typeof repoSchema[0];
export type RepoDocumentInput = Omit<RepoDocument, '_id' | 'createdAt' | 'updatedAt'>;

// note: skip-limit isn't the best approach to implement paging.
// the query becomes slow as the offset increases. But for our app this approach is fine.
// https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3
export async function findAllRepos(
  skip: number,
  limit: number
): Promise<{ repos: Repository[]; total: number }> {
  const fetchRepos = Repo.find(
    {},
    {
      limit,
      skip,
    }
  );
  const fetchTotalDocsCount = Repo.countDocuments({});
  const [repos, total] = await Promise.all([fetchRepos, fetchTotalDocsCount]);

  return {
    repos: repos.map(mapRepositoryDocument),
    total,
  };
}

export async function saveRepo(input: RepoDocumentInput): Promise<void> {
  await Repo.insertOne(input);
}

export async function findByOwnerLoginAndRepositoryName(
  ownerLogin: string,
  repoName: string
): Promise<null | Repository> {
  const repo = await Repo.findOne({ 'repository.name': repoName, 'owner.login': ownerLogin });

  if (!repo) return null;

  return mapRepositoryDocument(repo);
}
