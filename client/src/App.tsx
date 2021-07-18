import {useEffect, useState} from 'react';

import './App.css';
import Landing from './pages/Landing';
import { Private } from './pages/Private';

const apiHost = 'http://localhost:5000';

async function getUserProfile() {
  const res = await fetch(`${apiHost}/me`, { credentials: 'include' });
  return res.json();
}

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then((user) => {
      setUser(user);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  console.log(user);

  return (
      <div className="App">
        <Landing />
        <Private />
      </div>
  );
}

export default App;
