import { useEffect } from 'react';
import { Router } from '@reach/router';

import './App.css';
import { Landing } from './pages/Landing';
import { AMA } from './pages/AMA';
import { userStore, User } from './store';

const selector = (state: User) => ({ isLoading: state.isLoading, fetchUser: state.fetchUser });

function App() {
    const { fetchUser, isLoading } = userStore(selector);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <Router>
            <Landing path="/" />
            <AMA path="app/*" />
        </Router>
    );
}

export default App;
