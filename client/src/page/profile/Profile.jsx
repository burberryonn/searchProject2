import React from'react';
import {useUser } from '../../context/userContext';
function Profile() {
  const {user} = useUser()
  
  return (
      <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
      </div>
  );
}

export default Profile;