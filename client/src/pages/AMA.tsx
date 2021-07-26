import { useRoute } from 'wouter';

import { userStore, User, Profile } from '../store';

interface Selector {
    logout: User['logout'];
    profile: Profile;
}

const userSelector = (state: User) =>
    ({
        logout: state.logout,
        profile: state.profile,
    } as Selector);

export function AMA() {
    const [match] = useRoute('/app');
    if (!match) return null;

    const { profile, logout } = userStore(userSelector);

    const handleCallback = async () => {
        await logout();
    };

    return (
        <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <br />
            <button onClick={handleCallback}>Logout</button>
        </div>
    );
}
