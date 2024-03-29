import type { FC } from 'react';
import { Redirect, RouteComponentProps, Router } from '@reach/router';

import { userStore, User, Profile } from '../user';
import { Sidebar, Avatar } from '../components';
import { WatchList } from './WatchList';
import { Search } from './Search';
import { PopularRepos } from '../popular-repos';
import { Settings } from './Settings';
import style from './ama.module.scss';

interface Selector {
    logout: User['logout'];
    profile: Profile;
    isLoggedIn: User['isLoggedIn'];
}

const userSelector = (state: User) =>
    ({
        logout: state.logout,
        profile: state.profile,
        isLoggedIn: state.isLoggedIn,
    } as Selector);

export const AMA: FC<RouteComponentProps> = () => {
    const { profile, logout, isLoggedIn } = userStore(userSelector);

    if (!isLoggedIn) return <Redirect to="/" noThrow />;

    const handleLogout = async () => {
        await logout();
    };

    // fixme: The avatar components re-renders for each route change
    return (
        <div className={style.wrapper}>
            <aside className={style.sideBar}>
                <Sidebar
                    header={<Avatar name={profile.name} url={profile.avatarUrl} />}
                    onLogout={handleLogout}
                />
            </aside>

            <main className={style.main}>
                <Router>
                    <WatchList path="/" />
                    <Search path="search" />
                    <Settings path="settings" />
                    <PopularRepos path="popular-ama-repos" />
                </Router>
            </main>
        </div>
    );
};
