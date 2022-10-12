import React from 'react';
import firebase, { auth, db } from '../../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import './login.style.scss';
import { useNavigate } from 'react-router-dom';
import { addDocument, generateKeywords } from '../../firebase/services';

function Login(props) {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleLoginGoogle = () => {};
  const handleLoginFacebook = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1>Chat app</h1>
        <div className="login__form__social">
          <h1></h1>
          <label
            className="icon-google"
            for="login-button"
            onClick={() => {
              handleLoginGoogle();
            }}
          >
            <img src="https://colorlib.com/etc/lf/Login_v5/images/icons/icon-google.png" alt="" />
            <h3>Sign in with Google</h3>
          </label>
        </div>
        <div className="login__form__social">
          <h1></h1>
          <label
            style={{ backgroundColor: '#1877f2' }}
            className="icon-google"
            for="login-button"
            onClick={() => {
              handleLoginFacebook();
            }}
          >
            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/U7MAWJlE6hZ.png" alt="" />
            <h3 style={{ color: 'white' }}>Sign in with Facebook</h3>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
