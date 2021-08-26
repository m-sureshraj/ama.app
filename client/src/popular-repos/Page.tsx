import type { FC } from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { popularReposStore, RepoStore } from './store';
import { Avatar } from '../components';

const selector = (store: RepoStore) => ({
    repos: store.repos,
    error: store.error,
    isLoading: store.isLoading,
    fetchRepos: store.fetchRepos,
});

export const PopularRepos: FC<RouteComponentProps> = () => {
    const { isLoading, fetchRepos, repos, error } = popularReposStore(selector);

    useEffect(() => {
        fetchRepos();
    }, [fetchRepos]);

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        // todo: handle error
    }

    return (
        <div>
            {repos.map(repo => (
                <div key={repo.id}>
                    <h3>{repo.owner.name}</h3>
                    <Avatar url={repo.owner.avatarUrl} name={repo.owner.name || repo.owner.login} />
                    <p>{repo.owner.bio}</p>
                </div>
            ))}
        </div>
    );
};
