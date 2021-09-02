import { useEffect, ReactElement } from 'react';
import { Router } from '@reach/router';

import { Landing } from './pages/Landing';
import { AMA } from './pages/AMA';
import { userStore, User } from './user';

const selector = (state: User) => ({ isLoading: state.isLoading, fetchUser: state.fetchUser });

function App(): ReactElement {
    const { fetchUser, isLoading } = userStore(selector);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (isLoading) return <div>Loading...</div>;

    // https://reach.tech/router/nesting
    return (
        <Router>
            <Landing path="/" />
            <AMA path="app/*" />
        </Router>
    );
}

export default App;
