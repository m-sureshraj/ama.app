import { findAllRepos } from './repository';
import { Repository } from './domain';

export async function getRepos(): Promise<Repository[]> {
  return findAllRepos();
}
