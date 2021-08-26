import create from 'zustand';

import { getUserProfile, logout } from './service';
import { Profile } from './domain';

export interface User {
    isLoading: boolean;
    isLoggedIn: boolean;
    profile: null | Profile;
    error: null | string;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const userStore = create<User>(set => ({
    isLoading: true,
    isLoggedIn: false,
    profile: null,
    error: null,
    fetchUser: async () => {
        try {
            const response = await getUserProfile();
            set({ isLoggedIn: true, profile: response });
        } catch (error) {
            console.error(error);
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        try {
            await logout();
            set({ isLoggedIn: false, profile: null });
        } catch (error) {
            console.error(error);
            set({ error: error.message });
        }
    },
}));
