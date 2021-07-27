import { useEffect } from 'react';
import { Switch } from 'wouter';

import './App.css';
import Landing from './pages/Landing';
import { AMA } from './pages/AMA';
import { userStore, User } from './store';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';

const selector = (state: User) => ({ isLoading: state.isLoading, fetchUser: state.fetchUser });

function App() {
    const { fetchUser, isLoading } = userStore(selector);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Switch>
                <PublicRoute path="/" component={Landing} />
                <PrivateRoute path="/app" component={AMA} />
            </Switch>
        </div>
    );
}

export default App;
