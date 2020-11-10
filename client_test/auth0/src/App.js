import { React, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import AuthenticationButton from './AuthenticationButton';
import Profile from './Profile';
import GraphiQL from './GraphiQL';
import SchemaPoster from './SchemaPoster';

function App() {
  const [token, setToken] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
      } catch (err) {
        return;
      }
    };

    getToken();
  }, [getAccessTokenSilently]);

  return (
    <div className="App">
      <div style={{ padding: 10 }}>
        <Profile />
        <AuthenticationButton />
      </div>
      <GraphiQL token={token} />
      <SchemaPoster token={token} />
    </div>
  );
}

export default App;
