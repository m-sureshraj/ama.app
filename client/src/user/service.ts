import { apiHost } from '../utils/constants';
import { Profile } from './domain';

export async function getUserProfile(): Promise<Profile> {
    const res = await fetch(`${apiHost}/user`, { credentials: 'include' });
    if (res.ok) return res.json(); // status 200-299 range

    const { message } = await res.json();
    throw Error(message);
}

export async function logout(): Promise<void> {
    const res = await fetch(`${apiHost}/auth/logout`, { credentials: 'include' });
    if (res.ok) return res.json();

    const { message } = await res.json();
    throw Error(message);
}
