import './App.css';
import AuthenticationButton from './AuthenticationButton';
import Profile from './Profile';
import ExternalApi from './ExternalApi';

import React from 'react';

function App() {
  return (
    <div className="App">
      <br></br>
      <Profile />
      <AuthenticationButton />
      <hr></hr>
      <ExternalApi />
    </div>
  );
}

export default App;
