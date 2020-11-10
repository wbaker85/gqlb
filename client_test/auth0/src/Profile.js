import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  return (
    isAuthenticated && (
      <span style={{ marginRight: 20 }}>Logged in as: {user.email}</span>
    )
  );
};

export default Profile;
