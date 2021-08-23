import { findAllRepos, findByOwnerLoginAndRepositoryName, saveRepo } from './repository';
import { Repository } from './domain';
import {
  getRepositoryWithOwner,
  logger,
  ForbiddenError,
  DuplicateEntityError,
  NotFoundError,
  convertToObjectId,
} from '../infrastructure';
import { getUser } from '../user';

export async function getRepos(): Promise<Repository[]> {
  return findAllRepos();
}

export async function addRepo(userId: string, repoName: string, ownerLogin: string): Promise<void> {
  const { accessToken, isAdmin } = await getUser(userId);

  if (!isAdmin) {
    throw new ForbiddenError(
      'Only admin users are allowed to add popular repositories to the system'
    );
  }

  const repository = await findByOwnerLoginAndRepositoryName(ownerLogin, repoName);
  if (repository) {
    throw new DuplicateEntityError(`Repository ${ownerLogin}/${repoName} already exist`);
  }

  logger.info({ repoName, ownerLogin }, 'fetching owner, repository details');
  const { owner, repository: repositoryData } = await getRepositoryWithOwner(
    accessToken,
    ownerLogin,
    repoName
  );

  if (!repositoryData) {
    throw new NotFoundError(`Can not find the repository "${repoName}"`);
  }

  await saveRepo({
    repository: repositoryData,
    addedBy: convertToObjectId(userId),
    owner: {
      ...owner,
      name: owner.name ?? '',
      bio: owner.bio ?? '',
    },
  });
  logger.info(
    `Repository "${ownerLogin}/${repoName}" successfully added to the popular repository list`
  );
}
