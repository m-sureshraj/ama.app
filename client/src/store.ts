import create from 'zustand';

const API_HOST = process.env.REACT_APP_API_HOST;

// todo: move these function into a separate service
async function getUserProfile() {
    const res = await fetch(`${API_HOST}/user`, { credentials: 'include' });

    // 3xx-5xx responses are NOT exceptions, and should be handled in then()
    if (res.ok) return res.json();

    const { message } = await res.json();
    throw Error(message);
}

async function logout() {
    const res = await fetch(`${API_HOST}/auth/logout`, { credentials: 'include' });
    if (res.ok) return res.json();

    const { message } = await res.json();
    throw Error(message);
}

export interface Profile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
}

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
