import { RepoDocument } from './repository';

export interface Repository extends Omit<RepoDocument, '_id'> {
  id: string;
}

export function mapRepositoryDocument({ _id, ...rest }: RepoDocument): Repository {
  return {
    id: _id.toHexString(),
    ...rest,
  };
}

export function mapPublicFields(
  repo: Repository
): Omit<Repository, 'createdAt' | 'updatedAt' | 'addedBy'> {
  return {
    id: repo.id,
    owner: repo.owner,
    repository: repo.repository,
  };
}
