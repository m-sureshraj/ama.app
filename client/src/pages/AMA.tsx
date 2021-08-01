import type { FC } from 'react';
import { Redirect, RouteComponentProps, Router } from '@reach/router';

import { userStore, User, Profile } from '../store';
import { Sidebar, Avatar } from '../components';
import { WatchList } from './WatchList';
import { Search } from './Search';
import { PopularRepos } from './PopularRepos';
import { Settings } from './Settings';

interface Selector {
    logout: User['logout'];
    profile: Profile;
    isLoggedIn: User['isLoggedIn'];
}

interface Props extends RouteComponentProps {}

const userSelector = (state: User) =>
    ({
        logout: state.logout,
        profile: state.profile,
        isLoggedIn: state.isLoggedIn,
    } as Selector);

export const AMA: FC<Props> = () => {
    const { profile, logout, isLoggedIn } = userStore(userSelector);

    if (!isLoggedIn) return <Redirect to="/" noThrow />;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div>
            <Sidebar header={<Avatar name={profile.name} url={profile.avatarUrl} />} />
            <button onClick={handleLogout}>logout</button>
            <Router>
                <WatchList path="/" />
                <Search path="search" />
                <Settings path="settings" />
                <PopularRepos path="popular-ama-repos" />
            </Router>
        </div>
    );
};
