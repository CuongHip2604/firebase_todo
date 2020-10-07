import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
// import PropTypes from 'prop-types';

// Login.propTypes = {

// };

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  signInSuccessUrl: '/todos',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

function Login(props) {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Login;