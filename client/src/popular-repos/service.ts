import { apiHost } from '../utils/constants';
import { Repo } from './domain';

export async function getPopularRepos(): Promise<Repo[]> {
    const res = await fetch(`${apiHost}/repos`, { credentials: 'include' });
    if (res.ok) return res.json();

    const { message } = await res.json();
    throw Error(message);
}
