import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import LoadingOverlay from 'react-loading-overlay';

const SignOut = () => {
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    auth
      .signOut()
      .then(setSignedOut(true))
      .catch((err) => console.log(err));
  }, []);

  return (
    <LoadingOverlay active={!signedOut} spinner text="Signing you out...">
      <div>
        <h1>You are now signed out.</h1>
      </div>
    </LoadingOverlay>
  );
};

export default SignOut;
