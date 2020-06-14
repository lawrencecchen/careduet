import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { Redirect, Link } from 'react-router-dom';

const SignInSuccess = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        return <Redirect path="/login" />;
      }
    });
  }, []);

  return (
    <div>
      <h1>Welcome, {user && user.displayName}</h1>
      <h3>
        You have successfully signed in. Head to <Link to="/">Home</Link> and
        send a CareDuet!
      </h3>
    </div>
  );
};

export default SignInSuccess;
