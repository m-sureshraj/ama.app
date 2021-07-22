import { useEffect, useState } from 'react';
import { Switch } from 'wouter';

import './App.css';
import Landing from './pages/Landing';
import { Private } from './pages/Private';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const apiHost = process.env.REACT_APP_API_HOST;

async function getUserProfile() {
    const res = await fetch(`${apiHost}/me`, { credentials: 'include' });
    return res.json();
}

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserProfile()
            .then(user => {
                setUser(user);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            <Switch>
                <PublicRoute path="/" component={Landing} />
                <PrivateRoute path="/app" component={Private} />
            </Switch>
            <Private />
        </div>
    );
}

export default App;
