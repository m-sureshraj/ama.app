import create from 'zustand';

import { getPopularRepos } from './service';
import { Repo } from './domain';

export interface RepoStore {
    repos: Repo[];
    isLoading: boolean;
    error: null | string;
    fetchRepos: () => void;
}

export const popularReposStore = create<RepoStore>(set => ({
    repos: [],
    isLoading: true,
    error: null,
    fetchRepos: async () => {
        try {
            const { repos } = await getPopularRepos();
            set({ isLoading: false, repos });
        } catch (error) {
            console.error(error);
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
