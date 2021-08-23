import { RepoDocument } from './repository';

// Only the following names will be considered valid repo names
export const supportedRepositoryNames = ['ama', 'AMA', 'amas', 'feedback'];

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
